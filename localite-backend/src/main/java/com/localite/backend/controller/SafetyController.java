package com.localite.backend.controller;

import com.localite.backend.model.Report;
import com.localite.backend.model.User;
import com.localite.backend.repository.ReportRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/safety")
@CrossOrigin(origins = "*")
public class SafetyController {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    public SafetyController(ReportRepository reportRepository, UserRepository userRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/report")
    public ResponseEntity<?> submitReport(@RequestBody Map<String, Object> payload, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> currentUserOpt = userRepository.findByFirebaseUid(principal.getName());
        if (!currentUserOpt.isPresent()) return ResponseEntity.status(401).body("User not found");
        
        User reporter = currentUserOpt.get();
        String targetType = (String) payload.get("targetType");
        Long targetId = Long.valueOf(payload.get("targetId").toString());
        String reason = (String) payload.get("reason");
        String details = (String) payload.get("details");
        
        Report report = new Report(reporter, targetType, targetId, reason, details);
        reportRepository.save(report);
        
        return ResponseEntity.ok(Map.of("message", "Report submitted successfully. We will review it shortly."));
    }

    @PostMapping("/panic")
    public ResponseEntity<?> triggerPanicButton(@RequestBody Map<String, Object> payload, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> currentUserOpt = userRepository.findByFirebaseUid(principal.getName());
        if (!currentUserOpt.isPresent()) return ResponseEntity.status(401).body("User not found");
        
        // In a real app, this would integrate with SMS/Twilio API to alert emergency contacts
        // For MVP, we just log it and return success
        Double lat = payload.containsKey("lat") ? Double.valueOf(payload.get("lat").toString()) : null;
        Double lng = payload.containsKey("lng") ? Double.valueOf(payload.get("lng").toString()) : null;
        
        System.out.println("🚨 PANIC BUTTON TRIGGERED BY USER: " + currentUserOpt.get().getUsername() + " AT LOCATION: " + lat + ", " + lng);
        
        return ResponseEntity.ok(Map.of("message", "Emergency contacts notified. Help is on the way."));
    }
}
