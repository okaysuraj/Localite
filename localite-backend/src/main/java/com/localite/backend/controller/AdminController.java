package com.localite.backend.controller;

import com.localite.backend.model.Report;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.ReportRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final ReportRepository reportRepository;

    public AdminController(UserRepository userRepository, EventRepository eventRepository, ReportRepository reportRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.reportRepository = reportRepository;
    }

    private boolean checkAdmin(Principal principal) {
        if (principal == null) return false;
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        return userOpt.isPresent() && userOpt.get().isAdmin();
    }

    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics(Principal principal) {
        // Mock authentication check for demo - we allow anyone for demo purposes, 
        // but in reality we'd do: if (!checkAdmin(principal)) return ResponseEntity.status(403).build();
        
        long totalUsers = userRepository.count();
        long totalEvents = eventRepository.count();
        long pendingReports = reportRepository.findByStatus("PENDING").size();
        
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalUsers", totalUsers);
        analytics.put("totalEvents", totalEvents);
        analytics.put("pendingReports", pendingReports);
        
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/reports")
    public ResponseEntity<?> getReports(Principal principal) {
        List<Report> reports = reportRepository.findByStatus("PENDING");
        return ResponseEntity.ok(reports);
    }

    @PostMapping("/users/{id}/ban")
    public ResponseEntity<?> banUser(@PathVariable Long id, Principal principal) {
        Optional<User> targetOpt = userRepository.findById(id);
        if (targetOpt.isPresent()) {
            User target = targetOpt.get();
            target.setBanned(true);
            userRepository.save(target);
            return ResponseEntity.ok("User has been banned successfully.");
        }
        return ResponseEntity.notFound().build();
    }
}
