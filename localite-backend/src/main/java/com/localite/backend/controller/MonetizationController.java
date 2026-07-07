package com.localite.backend.controller;

import com.localite.backend.model.Event;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.UserRepository;
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

    public MonetizationController(UserRepository userRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
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
        
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (eventOpt.isPresent()) {
            // Mock ticket purchase logic. Usually we'd create a ticket record here.
            // But ticket logic is mostly handled in EventController via RSVP. We can just return success.
            return ResponseEntity.ok("Ticket purchased successfully!");
        }
        return ResponseEntity.notFound().build();
    }
}
