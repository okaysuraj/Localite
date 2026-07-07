package com.localite.backend.controller;

import com.localite.backend.model.Event;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.UserRepository;
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

    public MatchmakingController(UserRepository userRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
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
}
