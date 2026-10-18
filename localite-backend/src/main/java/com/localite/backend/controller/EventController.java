package com.localite.backend.controller;

import com.localite.backend.model.Event;
import com.localite.backend.model.Rsvp;
import com.localite.backend.model.RsvpStatus;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.RsvpRepository;
import com.localite.backend.repository.UserRepository;
import com.localite.backend.service.EventDiscoveryService;
import com.localite.backend.service.EventScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*") // Allow requests from our React apps
public class EventController {
    
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final RsvpRepository rsvpRepository;
    private final EventDiscoveryService eventDiscoveryService;
    private final EventScheduleService eventScheduleService;

    public EventController(EventRepository eventRepository, UserRepository userRepository, RsvpRepository rsvpRepository,
                           EventDiscoveryService eventDiscoveryService, EventScheduleService eventScheduleService) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.rsvpRepository = rsvpRepository;
        this.eventDiscoveryService = eventDiscoveryService;
        this.eventScheduleService = eventScheduleService;
    }

    @GetMapping
    public List<Event> getAllEvents(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lng,
            @RequestParam(required = false, defaultValue = "10.0") Double radius,
            @RequestParam(required = false) String timeFilter,
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) String priceFilter) {
        
        return eventDiscoveryService.findEvents(category, lat, lng, radius, timeFilter, eventType, priceFilter);
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<?> getEventById(@PathVariable Long eventId) {
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (eventOpt.isPresent()) {
            return ResponseEntity.ok(eventOpt.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/my-events")
    public ResponseEntity<?> getMyEvents(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        if (userOpt.isPresent()) {
            List<Event> myEvents = eventRepository.findByHostId(userOpt.get().getId());
            return ResponseEntity.ok(myEvents);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{eventId}/rsvps")
    public ResponseEntity<?> getEventRsvps(@PathVariable Long eventId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        // Find all RSVPs for this event
        List<Rsvp> rsvps = rsvpRepository.findByEventId(eventId);
        return ResponseEntity.ok(rsvps);
    }


    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Event event, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        userRepository.findByFirebaseUid(principal.getName()).ifPresent(event::setHost);
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Gamification: Award points for hosting
            user.setEventsHosted(user.getEventsHosted() + 1);
            user.setTrustScore(user.getTrustScore() + 10);
            userRepository.save(user);
        }
        
        return ResponseEntity.ok(eventScheduleService.saveEvent(event));
    }

    @GetMapping("/recommended")
    public ResponseEntity<?> getRecommendedEvents(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        
        return ResponseEntity.ok(eventDiscoveryService.recommendEvents(userOpt.get()));
    }

    @PostMapping("/{eventId}/rsvp")
    public ResponseEntity<?> rsvpToEvent(@PathVariable Long eventId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Optional<Event> eventOpt = eventRepository.findById(eventId);
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());

        if (eventOpt.isPresent() && userOpt.isPresent()) {
            Event event = eventOpt.get();
            User user = userOpt.get();
            
            // Check if already RSVP'd
            Optional<Rsvp> existingRsvp = rsvpRepository.findByEventIdAndUserId(event.getId(), user.getId());
            if (existingRsvp.isPresent()) {
                return ResponseEntity.badRequest().body("Already RSVP'd to this event");
            }

            // Determine status based on capacity
            RsvpStatus status = RsvpStatus.GOING;
            if (event.getMaxAttendees() > 0 && event.getAttendees() >= event.getMaxAttendees()) {
                status = RsvpStatus.WAITLIST;
            }

            Rsvp rsvp = new Rsvp(event, user, status);
            
            if (status == RsvpStatus.GOING) {
                event.setAttendees(event.getAttendees() + 1);
                eventRepository.save(event);
            }
            
            // Save RSVP
            rsvpRepository.save(rsvp);
            
            return ResponseEntity.ok("Successfully RSVP'd with status: " + rsvp.getStatus());
        }
        
        return ResponseEntity.badRequest().body("Event or User not found");
    }

    @GetMapping("/{eventId}/ticket")
    public ResponseEntity<?> getTicket(@PathVariable Long eventId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

        Optional<Rsvp> rsvpOpt = rsvpRepository.findByEventIdAndUserId(eventId, userOpt.get().getId());
        if (rsvpOpt.isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("ticketId", rsvpOpt.get().getTicketId());
            response.put("status", rsvpOpt.get().getStatus().name());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{eventId}/checkin/{ticketId}")
    public ResponseEntity<?> checkInAttendee(@PathVariable Long eventId, @PathVariable String ticketId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");

        Optional<Event> eventOpt = eventRepository.findById(eventId);
        Optional<User> hostOpt = userRepository.findByFirebaseUid(principal.getName());

        if (eventOpt.isPresent() && hostOpt.isPresent()) {
            Event event = eventOpt.get();
            if (!event.getHost().getId().equals(hostOpt.get().getId())) {
                return ResponseEntity.status(403).body("Only the host can check in attendees");
            }

            Optional<Rsvp> rsvpOpt = rsvpRepository.findByTicketId(ticketId);
            if (rsvpOpt.isEmpty() || !rsvpOpt.get().getEvent().getId().equals(eventId)) {
                return ResponseEntity.badRequest().body("Invalid ticket for this event");
            }

            Rsvp rsvp = rsvpOpt.get();
            if (rsvp.getStatus() == RsvpStatus.ATTENDED) {
                return ResponseEntity.badRequest().body("Attendee already checked in");
            }
            if (rsvp.getStatus() != RsvpStatus.GOING) {
                return ResponseEntity.badRequest().body("Ticket is not valid (Status: " + rsvp.getStatus() + ")");
            }

            // Mark as attended and award points
            rsvp.setStatus(RsvpStatus.ATTENDED);
            rsvp.setCheckedIn(true);
            rsvpRepository.save(rsvp);

            User attendee = rsvp.getUser();
            attendee.setEventsAttended(attendee.getEventsAttended() + 1);
            attendee.setTrustScore(attendee.getTrustScore() + 5);
            userRepository.save(attendee);

            return ResponseEntity.ok("Successfully checked in " + attendee.getUsername());
        }

        return ResponseEntity.badRequest().body("Event or Host not found");
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<?> updateEvent(@PathVariable Long eventId, @RequestBody Event updatedEvent, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        
        if (eventOpt.isPresent() && userOpt.isPresent()) {
            Event event = eventOpt.get();
            if (!event.getHost().getId().equals(userOpt.get().getId())) {
                return ResponseEntity.status(403).body("Only host can edit this event");
            }
            
            if (updatedEvent.getTitle() != null) event.setTitle(updatedEvent.getTitle());
            if (updatedEvent.getDescription() != null) event.setDescription(updatedEvent.getDescription());
            if (updatedEvent.getCategory() != null) event.setCategory(updatedEvent.getCategory());
            if (updatedEvent.getLocation() != null) event.setLocation(updatedEvent.getLocation());
            if (updatedEvent.getCost() != null) event.setCost(updatedEvent.getCost());
            if (updatedEvent.getDate() != null) event.setDate(updatedEvent.getDate());
            
            return ResponseEntity.ok(eventRepository.save(event));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long eventId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        
        if (eventOpt.isPresent() && userOpt.isPresent()) {
            Event event = eventOpt.get();
            if (!event.getHost().getId().equals(userOpt.get().getId())) {
                return ResponseEntity.status(403).body("Only host can delete this event");
            }
            eventRepository.delete(event);
            return ResponseEntity.ok("Event deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{eventId}/rsvp/{userId}/approve")
    public ResponseEntity<?> approveWaitlist(@PathVariable Long eventId, @PathVariable Long userId, Principal principal) {
        return handleWaitlistApproval(eventId, userId, principal, true);
    }

    @PostMapping("/{eventId}/rsvp/{userId}/reject")
    public ResponseEntity<?> rejectWaitlist(@PathVariable Long eventId, @PathVariable Long userId, Principal principal) {
        return handleWaitlistApproval(eventId, userId, principal, false);
    }

    private ResponseEntity<?> handleWaitlistApproval(Long eventId, Long userId, Principal principal, boolean approve) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");

        Optional<Event> eventOpt = eventRepository.findById(eventId);
        Optional<User> hostOpt = userRepository.findByFirebaseUid(principal.getName());

        if (eventOpt.isPresent() && hostOpt.isPresent()) {
            Event event = eventOpt.get();
            if (!event.getHost().getId().equals(hostOpt.get().getId())) {
                return ResponseEntity.status(403).body("Only host can manage waitlist");
            }

            Optional<Rsvp> rsvpOpt = rsvpRepository.findByEventIdAndUserId(eventId, userId);
            if (rsvpOpt.isPresent()) {
                Rsvp rsvp = rsvpOpt.get();
                if (rsvp.getStatus() != RsvpStatus.WAITLIST) {
                    return ResponseEntity.badRequest().body("User is not on waitlist");
                }
                
                if (approve) {
                    rsvp.setStatus(RsvpStatus.GOING);
                    event.setAttendees(event.getAttendees() + 1);
                    eventRepository.save(event);
                } else {
                    rsvp.setStatus(RsvpStatus.DECLINED);
                }
                rsvpRepository.save(rsvp);
                return ResponseEntity.ok("User " + (approve ? "approved" : "rejected") + " from waitlist");
            }
            return ResponseEntity.badRequest().body("RSVP not found");
        }
        return ResponseEntity.badRequest().body("Event or Host not found");
    }
}
