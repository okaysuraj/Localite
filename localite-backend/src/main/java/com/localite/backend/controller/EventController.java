package com.localite.backend.controller;

import com.localite.backend.model.Event;
import com.localite.backend.model.Rsvp;
import com.localite.backend.model.RsvpStatus;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.RsvpRepository;
import com.localite.backend.repository.UserRepository;
import com.localite.backend.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*") // Allow requests from our React apps
public class EventController {
    
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final RsvpRepository rsvpRepository;
    private final EmailService emailService;

    public EventController(EventRepository eventRepository, UserRepository userRepository, RsvpRepository rsvpRepository, EmailService emailService) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.rsvpRepository = rsvpRepository;
        this.emailService = emailService;
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
        
        List<Event> events;
        if (lat != null && lng != null) {
            events = eventRepository.findWithinRadius(lat, lng, radius);
        } else {
            events = eventRepository.findAll();
        }
        
        return events.stream()
            .filter(e -> category == null || category.isEmpty() || category.equalsIgnoreCase("All") || category.equalsIgnoreCase(e.getCategory()))
            .filter(e -> eventType == null || eventType.isEmpty() || eventType.equalsIgnoreCase(e.getEventType()))
            .filter(e -> {
                if (priceFilter == null || priceFilter.isEmpty()) return true;
                double cost = e.getCost() != null ? e.getCost() : 0.0;
                if (priceFilter.equalsIgnoreCase("Free")) return cost == 0.0;
                if (priceFilter.equalsIgnoreCase("Paid")) return cost > 0.0;
                return true;
            })
            .filter(e -> {
                if (timeFilter == null || timeFilter.isEmpty() || e.getDate() == null) return true;
                java.time.LocalDate eventDate = e.getDate().toLocalDate();
                java.time.LocalDate now = java.time.LocalDate.now();
                if (timeFilter.equalsIgnoreCase("today")) {
                    return eventDate.equals(now);
                } else if (timeFilter.equalsIgnoreCase("weekend")) {
                    java.time.DayOfWeek day = eventDate.getDayOfWeek();
                    return day == java.time.DayOfWeek.SATURDAY || day == java.time.DayOfWeek.SUNDAY;
                }
                return true;
            })
            .sorted((e1, e2) -> Boolean.compare(e2.isHighlighted(), e1.isHighlighted())) // Highlighted first
            .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Event event, Principal principal) {
        if (principal != null) {
            userRepository.findByFirebaseUid(principal.getName()).ifPresent(event::setHost);
        }
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Gamification: Award points for hosting
            user.setEventsHosted(user.getEventsHosted() + 1);
            user.setTrustScore(user.getTrustScore() + 10);
            userRepository.save(user);
        }
        
        if (event.getRecurrence() != null && !event.getRecurrence().equals("NONE") && event.getRecurrenceEndDate() != null) {
            String seriesId = java.util.UUID.randomUUID().toString();
            event.setSeriesId(seriesId);
            
            java.time.LocalDateTime currentDate = event.getDate();
            java.time.LocalDateTime endDate = event.getRecurrenceEndDate();
            
            int maxOccurrences = 24; // Limit to 24 instances
            int count = 0;
            
            while (!currentDate.isAfter(endDate) && count < maxOccurrences) {
                Event newEvent = new Event();
                newEvent.setHost(event.getHost());
                newEvent.setTitle(event.getTitle());
                newEvent.setCategory(event.getCategory());
                newEvent.setLocation(event.getLocation());
                newEvent.setAttendees(0);
                newEvent.setMaxAttendees(event.getMaxAttendees());
                newEvent.setImageUrl(event.getImageUrl());
                newEvent.setLatitude(event.getLatitude());
                newEvent.setLongitude(event.getLongitude());
                newEvent.setSeriesId(seriesId);
                newEvent.setDate(currentDate);
                
                eventRepository.save(newEvent);
                
                if (event.getRecurrence().equals("DAILY")) {
                    currentDate = currentDate.plusDays(1);
                } else if (event.getRecurrence().equals("WEEKLY")) {
                    currentDate = currentDate.plusWeeks(1);
                } else if (event.getRecurrence().equals("MONTHLY")) {
                    currentDate = currentDate.plusMonths(1);
                } else {
                    break;
                }
                count++;
            }
            return ResponseEntity.ok(event); // Return the template or original event
        } else {
            return ResponseEntity.ok(eventRepository.save(event));
        }
    }

    @GetMapping("/recommended")
    public ResponseEntity<?> getRecommendedEvents(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        if (!userOpt.isPresent()) return ResponseEntity.notFound().build();
        
        User user = userOpt.get();
        List<Event> allEvents = eventRepository.findAll();
        
        // Simple Scoring Algorithm:
        // +3 points if category matches sportsInterests (string contains)
        // +2 points if location matches neighborhood
        // Sort descending by score
        
        List<Event> recommended = allEvents.stream().map(event -> {
            int score = 0;
            if (user.getSportsInterests() != null && event.getCategory() != null) {
                if (user.getSportsInterests().toLowerCase().contains(event.getCategory().toLowerCase())) {
                    score += 3;
                }
            }
            if (user.getNeighborhood() != null && event.getLocation() != null) {
                if (event.getLocation().toLowerCase().contains(user.getNeighborhood().toLowerCase())) {
                    score += 2;
                }
            }
            
            Map<String, Object> map = new HashMap<>();
            map.put("event", event);
            map.put("score", score);
            return map;
        })
        .filter(m -> (Integer)m.get("score") > 0)
        .sorted((m1, m2) -> {
            Event e1 = (Event) m1.get("event");
            Event e2 = (Event) m2.get("event");
            if (e1.isHighlighted() && !e2.isHighlighted()) return -1;
            if (!e1.isHighlighted() && e2.isHighlighted()) return 1;
            return Integer.compare((Integer)m2.get("score"), (Integer)m1.get("score"));
        })
        .map(m -> m.get("event"))
        .map(e -> {
            // Need to wrap it as Object or return the Event itself
            return (Event) e;
        })
        .collect(Collectors.toList());

        return ResponseEntity.ok(recommended);
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
            
            // Trigger email notification to host here
            if (event.getHost() != null) {
                emailService.sendRsvpNotification(
                    event.getHost().getEmail(),
                    event.getTitle(),
                    user.getUsername() + " (Status: " + rsvp.getStatus() + ")"
                );
            }
            
            return ResponseEntity.ok("Successfully RSVP'd with status: " + rsvp.getStatus());
        }
        
        return ResponseEntity.badRequest().body("Event or User not found");
    }

    @GetMapping("/{eventId}/ticket")
    public ResponseEntity<?> getTicket(@PathVariable Long eventId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        if (!userOpt.isPresent()) return ResponseEntity.notFound().build();

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
            if (!rsvpOpt.isPresent() || !rsvpOpt.get().getEvent().getId().equals(eventId)) {
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
                    rsvp.setStatus(RsvpStatus.NOT_GOING);
                }
                rsvpRepository.save(rsvp);
                return ResponseEntity.ok("User " + (approve ? "approved" : "rejected") + " from waitlist");
            }
            return ResponseEntity.badRequest().body("RSVP not found");
        }
        return ResponseEntity.badRequest().body("Event or Host not found");
    }
}
