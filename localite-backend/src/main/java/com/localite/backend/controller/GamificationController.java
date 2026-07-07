package com.localite.backend.controller;

import com.localite.backend.model.User;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/gamification")
@CrossOrigin(origins = "*")
public class GamificationController {

    private final UserRepository userRepository;

    public GamificationController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/award")
    public ResponseEntity<?> awardXp(@RequestBody Map<String, String> payload, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        if (!userOpt.isPresent()) return ResponseEntity.status(401).body("User not found");
        
        User user = userOpt.get();
        String action = payload.get("action");
        int xpGained = 0;
        
        if ("HOST_EVENT".equals(action)) {
            xpGained = 150;
        } else if ("ATTEND_EVENT".equals(action)) {
            xpGained = 50;
        } else if ("PROFILE_COMPLETE".equals(action)) {
            xpGained = 100;
        }
        
        user.setXp(user.getXp() + xpGained);
        
        // Check for badges
        List<String> badges = user.getBadges();
        
        // Auto-assign "Super Host" if they reach 500 XP from hosting (approx logic for MVP)
        if (user.getXp() >= 500 && !badges.contains("Super Host")) {
            badges.add("Super Host");
        }
        
        if (user.getXp() >= 1000 && !badges.contains("Local Legend")) {
            badges.add("Local Legend");
        }
        
        user.setBadges(badges);
        userRepository.save(user);
        
        return ResponseEntity.ok(Map.of(
            "message", "XP Awarded", 
            "xpGained", xpGained, 
            "totalXp", user.getXp(),
            "badges", user.getBadges()
        ));
    }
}
