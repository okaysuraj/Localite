package com.localite.backend.controller;

import com.localite.backend.model.Event;
import com.localite.backend.model.MatchResult;
import com.localite.backend.model.SportProfile;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.MatchResultRepository;
import com.localite.backend.repository.SportProfileRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/leaderboard")
@CrossOrigin(origins = "*")
public class LeaderboardController {

    private final SportProfileRepository sportProfileRepository;
    private final MatchResultRepository matchResultRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public LeaderboardController(SportProfileRepository sportProfileRepository, MatchResultRepository matchResultRepository, EventRepository eventRepository, UserRepository userRepository) {
        this.sportProfileRepository = sportProfileRepository;
        this.matchResultRepository = matchResultRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{sport}")
    public ResponseEntity<?> getLeaderboard(@PathVariable String sport) {
        List<SportProfile> profiles = sportProfileRepository.findBySportNameOrderByPointsDesc(sport);
        
        // Map to a cleaner response
        List<Map<String, Object>> response = profiles.stream().map(p -> {
            Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", p.getId());
            map.put("userId", p.getUser().getId());
            map.put("username", p.getUser().getUsername());
            map.put("profilePhotoUrl", p.getUser().getProfilePhotoUrl() != null ? p.getUser().getProfilePhotoUrl() : "");
            map.put("sportName", p.getSportName());
            map.put("skillLevel", p.getSkillLevel() != null ? p.getSkillLevel() : "Unranked");
            map.put("points", p.getPoints());
            map.put("wins", p.getWins());
            map.put("losses", p.getLosses());
            return map;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/submit-result")
    public ResponseEntity<?> submitMatchResult(@RequestBody Map<String, Object> payload, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> currentUserOpt = userRepository.findByFirebaseUid(principal.getName());
        if (!currentUserOpt.isPresent()) return ResponseEntity.status(401).body("User not found");
        
        Long eventId = Long.valueOf(payload.get("eventId").toString());
        Long winnerId = Long.valueOf(payload.get("winnerId").toString());
        Long loserId = Long.valueOf(payload.get("loserId").toString());
        String score = (String) payload.get("score");
        
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (!eventOpt.isPresent()) return ResponseEntity.badRequest().body("Event not found");
        
        Event event = eventOpt.get();
        // Only host can submit results for MVP
        if (!event.getHost().getId().equals(currentUserOpt.get().getId())) {
            return ResponseEntity.status(403).body("Only event host can submit results");
        }
        
        Optional<User> winnerOpt = userRepository.findById(winnerId);
        Optional<User> loserOpt = userRepository.findById(loserId);
        
        if (!winnerOpt.isPresent() || !loserOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Winner or Loser not found");
        }
        
        // Save Match Result
        MatchResult matchResult = new MatchResult(event, winnerOpt.get(), loserOpt.get(), score);
        matchResultRepository.save(matchResult);
        
        // Update Leaderboards
        String sport = event.getCategory(); // Assuming category is the sport
        
        SportProfile winnerProfile = sportProfileRepository.findByUserAndSportName(winnerOpt.get(), sport)
                .orElse(new SportProfile(winnerOpt.get(), sport, "Beginner"));
        
        SportProfile loserProfile = sportProfileRepository.findByUserAndSportName(loserOpt.get(), sport)
                .orElse(new SportProfile(loserOpt.get(), sport, "Beginner"));
        
        // Simple ELO-like MVP: +15 points for win, -5 for loss
        winnerProfile.setPoints(winnerProfile.getPoints() + 15);
        winnerProfile.setWins(winnerProfile.getWins() + 1);
        
        loserProfile.setPoints(loserProfile.getPoints() - 5);
        loserProfile.setLosses(loserProfile.getLosses() + 1);
        
        sportProfileRepository.save(winnerProfile);
        sportProfileRepository.save(loserProfile);
        
        return ResponseEntity.ok(Map.of("message", "Match result submitted successfully", "matchId", matchResult.getId()));
    }
}
