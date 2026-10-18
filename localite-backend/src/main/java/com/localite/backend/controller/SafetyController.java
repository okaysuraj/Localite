package com.localite.backend.controller;

import com.localite.backend.model.EmergencyAlert;
import com.localite.backend.model.Report;
import com.localite.backend.model.User;
import com.localite.backend.repository.EmergencyAlertRepository;
import com.localite.backend.repository.ReportRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.http.ResponseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/safety")
@CrossOrigin(origins = "*")
public class SafetyController {
    private static final Logger logger = LoggerFactory.getLogger(SafetyController.class);

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final EmergencyAlertRepository emergencyAlertRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public SafetyController(ReportRepository reportRepository, 
                            UserRepository userRepository, 
                            EmergencyAlertRepository emergencyAlertRepository,
                            SimpMessagingTemplate messagingTemplate) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
        this.emergencyAlertRepository = emergencyAlertRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/report")
    public ResponseEntity<?> submitReport(@RequestBody Map<String, Object> payload, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> currentUserOpt = userRepository.findByFirebaseUid(principal.getName());
        if (currentUserOpt.isEmpty()) return ResponseEntity.status(401).body("User not found");
        
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
        if (currentUserOpt.isEmpty()) return ResponseEntity.status(401).body("User not found");
        
        Double lat = payload.containsKey("lat") && payload.get("lat") != null ? Double.valueOf(payload.get("lat").toString()) : null;
        Double lng = payload.containsKey("lng") && payload.get("lng") != null ? Double.valueOf(payload.get("lng").toString()) : null;
        
        User user = currentUserOpt.get();
        EmergencyAlert alert = new EmergencyAlert(user, lat, lng);
        emergencyAlertRepository.save(alert);
        
        
        // Broadcast in real-time to safety and emergency listeners
        try {
            Map<String, Object> alertPayload = Map.of(
                "alertId", alert.getId(),
                "username", user.getUsername() != null ? user.getUsername() : "Anonymous",
                "lat", lat != null ? lat : 0.0,
                "lng", lng != null ? lng : 0.0,
                "timestamp", System.currentTimeMillis()
            );
            messagingTemplate.convertAndSend("/topic/safety/alerts", (Object) alertPayload);
        } catch (Exception e) {
            logger.error("Failed to broadcast safety alert {}", alert.getId(), e);
        }
        
        return ResponseEntity.ok(Map.of(
            "message", "Emergency contacts and responders notified. Help is on the way.",
            "alertId", alert.getId(),
            "status", alert.getStatus()
        ));
    }

    @GetMapping("/alerts")
    public ResponseEntity<?> getEmergencyAlerts(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).build();
        Optional<User> currentUserOpt = userRepository.findByFirebaseUid(principal.getName());
        if (currentUserOpt.isEmpty()) return ResponseEntity.status(401).build();
        User user = currentUserOpt.get();
        
        if (user.isAdmin()) {
            return ResponseEntity.ok(emergencyAlertRepository.findAllByOrderByCreatedAtDesc());
        }
        
        return ResponseEntity.ok(emergencyAlertRepository.findAllByOrderByCreatedAtDesc().stream()
                .filter(a -> a.getUser() != null && a.getUser().getId().equals(user.getId()))
                .toList());
    }
}

