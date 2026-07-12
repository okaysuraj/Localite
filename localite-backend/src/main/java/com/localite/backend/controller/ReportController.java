package com.localite.backend.controller;

import com.localite.backend.model.Report;
import com.localite.backend.model.User;
import com.localite.backend.repository.ReportRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    public ReportController(ReportRepository reportRepository, UserRepository userRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> submitReport(@RequestBody Map<String, Object> payload, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> reporterOpt = userRepository.findByFirebaseUid(principal.getName());
        if (reporterOpt.isEmpty()) return ResponseEntity.notFound().build();
        User reporter = reporterOpt.get();

        String targetType = (String) payload.get("targetType");
        Object targetIdObj = payload.get("targetId");
        Long targetId = null;
        if (targetIdObj instanceof Number) {
            targetId = ((Number) targetIdObj).longValue();
        } else if (targetIdObj instanceof String) {
            targetId = Long.parseLong((String) targetIdObj);
        }

        String reason = (String) payload.get("reason");
        String details = (String) payload.get("details");

        Report report = new Report(reporter, targetType, targetId, reason, details);
        reportRepository.save(report);

        return ResponseEntity.ok(Map.of("message", "Report submitted successfully"));
    }

    @GetMapping
    public ResponseEntity<?> getReportsForUser(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> reporterOpt = userRepository.findByFirebaseUid(principal.getName());
        if (reporterOpt.isEmpty()) return ResponseEntity.notFound().build();

        List<Report> reports = reportRepository.findByReporterId(reporterOpt.get().getId());
        return ResponseEntity.ok(reports);
    }
}
