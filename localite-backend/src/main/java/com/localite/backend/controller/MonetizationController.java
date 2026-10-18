package com.localite.backend.controller;

import com.localite.backend.model.Event;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.UserRepository;
import com.localite.backend.service.StripePaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/monetization")
@CrossOrigin(origins = "*")
public class MonetizationController {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final StripePaymentService stripePaymentService;
    private final com.localite.backend.repository.RsvpRepository rsvpRepository;

    public MonetizationController(UserRepository userRepository, EventRepository eventRepository, StripePaymentService stripePaymentService, com.localite.backend.repository.RsvpRepository rsvpRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.stripePaymentService = stripePaymentService;
        this.rsvpRepository = rsvpRepository;
    }

    @PostMapping("/boost-profile")
    public ResponseEntity<?> boostProfile(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Mocking payment success. Boost for 30 days.
            user.setProfileBoostedUntil(LocalDateTime.now().plusDays(30));
            userRepository.save(user);
            return ResponseEntity.ok("Profile boosted successfully!");
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/highlight-event/{eventId}")
    public ResponseEntity<?> highlightEvent(@PathVariable Long eventId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (eventOpt.isPresent()) {
            Event event = eventOpt.get();
            // Optional: verify the principal is the host
            // Mocking payment success.
            event.setHighlighted(true);
            eventRepository.save(event);
            return ResponseEntity.ok("Event highlighted successfully!");
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/buy-ticket/{eventId}")
    public ResponseEntity<?> buyTicket(@PathVariable Long eventId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        if (!userOpt.isPresent()) return ResponseEntity.status(401).body("User not found");

        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (eventOpt.isPresent()) {
            Event event = eventOpt.get();
            User user = userOpt.get();

            double amount = event.getCost() != null ? event.getCost() : 0.0;
            if (amount > 0) {
                boolean success = stripePaymentService.processPayment(amount, "USD", "tok_visa");
                if (!success) {
                    return ResponseEntity.badRequest().body("Payment failed");
                }
            }

            Optional<com.localite.backend.model.Rsvp> existingRsvp = rsvpRepository.findByEventIdAndUserId(eventId, user.getId());
            com.localite.backend.model.Rsvp rsvp;
            if (existingRsvp.isPresent()) {
                rsvp = existingRsvp.get();
                rsvp.setStatus(com.localite.backend.model.RsvpStatus.GOING);
            } else {
                rsvp = new com.localite.backend.model.Rsvp(event, user, com.localite.backend.model.RsvpStatus.GOING);
                event.setAttendees(event.getAttendees() + 1);
                eventRepository.save(event);
            }

            rsvpRepository.save(rsvp);

            return ResponseEntity.ok(java.util.Map.of(
                "message", "Ticket purchased successfully!",
                "ticketId", rsvp.getTicketId(),
                "status", rsvp.getStatus().toString()
            ));
        }
        return ResponseEntity.notFound().build();
    }
}
