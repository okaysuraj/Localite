package com.localite.backend.controller;

import com.localite.backend.model.Event;
import com.localite.backend.model.User;
import com.localite.backend.model.MatchResult;
import com.localite.backend.model.Rsvp;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.UserRepository;
import com.localite.backend.repository.RsvpRepository;
import com.localite.backend.repository.MatchResultRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "*")
public class MatchmakingController {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final RsvpRepository rsvpRepository;
    private final MatchResultRepository matchResultRepository;

    public MatchmakingController(UserRepository userRepository, EventRepository eventRepository, RsvpRepository rsvpRepository, MatchResultRepository matchResultRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.rsvpRepository = rsvpRepository;
        this.matchResultRepository = matchResultRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<?> getSuggestedPartners(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");

        Optional<User> currentUserOpt = userRepository.findByFirebaseUid(principal.getName());
        if (!currentUserOpt.isPresent()) return ResponseEntity.status(401).body("User not found");

        User current = currentUserOpt.get();
        List<User> allUsers = userRepository.findAll();

        List<Map<String, Object>> scoredUsers = new ArrayList<>();

        for (User user : allUsers) {
            if (user.getId().equals(current.getId())) continue;

            int score = calculateUserMatchScore(current, user);
            
            // Only suggest users with a score > 0
            if (score > 0) {
                scoredUsers.add(Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "profilePhotoUrl", user.getProfilePhotoUrl() != null ? user.getProfilePhotoUrl() : "",
                    "bio", user.getBio() != null ? user.getBio() : "",
                    "sportsInterests", user.getSportsInterests() != null ? user.getSportsInterests() : "",
                    "neighborhood", user.getNeighborhood() != null ? user.getNeighborhood() : "",
                    "matchScore", score
                ));
            }
        }

        // Sort by match score descending
        scoredUsers.sort((a, b) -> Integer.compare((int) b.get("matchScore"), (int) a.get("matchScore")));
        
        // Return top 10 matches
        return ResponseEntity.ok(scoredUsers.stream().limit(10).collect(Collectors.toList()));
    }

    @GetMapping("/events")
    public ResponseEntity<?> getSuggestedEvents(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");

        Optional<User> currentUserOpt = userRepository.findByFirebaseUid(principal.getName());
        if (!currentUserOpt.isPresent()) return ResponseEntity.status(401).body("User not found");

        User current = currentUserOpt.get();
        List<Event> allEvents = eventRepository.findAll();

        List<Map<String, Object>> scoredEvents = new ArrayList<>();

        for (Event event : allEvents) {
            int score = calculateEventMatchScore(current, event);
            
            // Add a score attribute to event response
            Map<String, Object> eventMap = new HashMap<>();
            eventMap.put("id", event.getId());
            eventMap.put("title", event.getTitle());
            eventMap.put("category", event.getCategory());
            eventMap.put("location", event.getLocation());
            eventMap.put("date", event.getDate() != null ? event.getDate().toString() : null);
            eventMap.put("imageUrl", event.getImageUrl());
            eventMap.put("cost", event.getCost());
            eventMap.put("attendees", event.getAttendees());
            eventMap.put("maxAttendees", event.getMaxAttendees());
            eventMap.put("skillLevel", event.getSkillLevel());
            eventMap.put("matchScore", score);
            eventMap.put("host", Map.of("username", event.getHost().getUsername(), "id", event.getHost().getId()));
            
            scoredEvents.add(eventMap);
        }

        // Sort by score descending
        scoredEvents.sort((a, b) -> Integer.compare((int) b.get("matchScore"), (int) a.get("matchScore")));

        return ResponseEntity.ok(scoredEvents);
    }

    private int calculateUserMatchScore(User current, User other) {
        int score = 0;
        
        // Match sports interests
        if (current.getSportsInterests() != null && other.getSportsInterests() != null) {
            List<String> mySports = Arrays.asList(current.getSportsInterests().toLowerCase().split("\\s*,\\s*"));
            List<String> theirSports = Arrays.asList(other.getSportsInterests().toLowerCase().split("\\s*,\\s*"));
            for (String sport : mySports) {
                if (theirSports.contains(sport)) score += 30; // 30 points per matching sport
            }
        }
        
        // Match neighborhood
        if (current.getNeighborhood() != null && other.getNeighborhood() != null 
            && current.getNeighborhood().equalsIgnoreCase(other.getNeighborhood())) {
            score += 20;
        }

        // Match general interests
        if (current.getInterests() != null && other.getInterests() != null) {
            List<String> myInterests = Arrays.asList(current.getInterests().toLowerCase().split("\\s*,\\s*"));
            List<String> theirInterests = Arrays.asList(other.getInterests().toLowerCase().split("\\s*,\\s*"));
            for (String interest : myInterests) {
                if (theirInterests.contains(interest)) score += 10;
            }
        }

        return score;
    }

    private int calculateEventMatchScore(User current, Event event) {
        int score = 0;

        // Base score for all events
        score += 10;

        // Match category with user's sports interests
        if (current.getSportsInterests() != null && event.getCategory() != null) {
            List<String> mySports = Arrays.asList(current.getSportsInterests().toLowerCase().split("\\s*,\\s*"));
            if (mySports.contains(event.getCategory().toLowerCase())) {
                score += 50;
            }
        }

        // Location matching (rough neighborhood check for MVP)
        if (current.getNeighborhood() != null && event.getLocation() != null) {
            if (event.getLocation().toLowerCase().contains(current.getNeighborhood().toLowerCase())) {
                score += 30;
            }
        }

        return score;
    }

    // Phase 7: Team Assignment
    @PostMapping("/events/{eventId}/teams")
    public ResponseEntity<?> assignTeam(Principal principal, @PathVariable Long eventId, @RequestBody Map<String, Object> payload) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        String targetUserIdStr = (String) payload.get("userId");
        String teamName = (String) payload.get("team");
        
        if (targetUserIdStr == null || teamName == null) return ResponseEntity.badRequest().body("Missing userId or team");
        
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (!eventOpt.isPresent()) return ResponseEntity.notFound().build();
        
        // Find RSVP
        Optional<Rsvp> rsvpOpt = rsvpRepository.findAll().stream()
            .filter(r -> r.getEvent().getId().equals(eventId) && r.getUser().getId().toString().equals(targetUserIdStr))
            .findFirst();
            
        if (!rsvpOpt.isPresent()) return ResponseEntity.badRequest().body("User has not RSVPed to this event");
        
        Rsvp rsvp = rsvpOpt.get();
        rsvp.setTeam(teamName);
        rsvpRepository.save(rsvp);
        
        return ResponseEntity.ok(Map.of("message", "Team assigned successfully", "team", teamName));
    }

    // Phase 7: Submit Match Result
    @PostMapping("/events/{eventId}/result")
    public ResponseEntity<?> submitMatchResult(Principal principal, @PathVariable Long eventId, @RequestBody Map<String, Object> payload) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (!eventOpt.isPresent()) return ResponseEntity.notFound().build();
        Event event = eventOpt.get();
        
        // Only host can submit results for now
        if (!event.getHost().getFirebaseUid().equals(principal.getName())) {
            return ResponseEntity.status(403).body("Only the host can submit match results");
        }
        
        String winnerIdStr = (String) payload.get("winnerId");
        String loserIdStr = (String) payload.get("loserId");
        String score = (String) payload.get("score");
        
        Optional<User> winner = userRepository.findById(Long.parseLong(winnerIdStr));
        Optional<User> loser = userRepository.findById(Long.parseLong(loserIdStr));
        
        if (!winner.isPresent() || !loser.isPresent()) return ResponseEntity.badRequest().body("Winner or loser not found");
        
        MatchResult result = new MatchResult(event, winner.get(), loser.get(), score);
        matchResultRepository.save(result);
        
        return ResponseEntity.ok(result);
    }
    
    // Phase 7: Match History
    @GetMapping("/history/{userId}")
    public ResponseEntity<?> getMatchHistory(@PathVariable Long userId) {
        List<MatchResult> history = matchResultRepository.findByWinnerIdOrLoserId(userId, userId);
        
        List<Map<String, Object>> response = new ArrayList<>();
        for (MatchResult res : history) {
            response.add(Map.of(
                "id", res.getId(),
                "eventTitle", res.getEvent().getTitle(),
                "category", res.getEvent().getCategory(),
                "winner", res.getWinner().getUsername(),
                "loser", res.getLoser().getUsername(),
                "score", res.getScore(),
                "date", res.getEvent().getDate().toString()
            ));
        }
        
        // Sort by date descending
        response.sort((a, b) -> ((String) b.get("date")).compareTo((String) a.get("date")));
        
        return ResponseEntity.ok(response);
    }
}
