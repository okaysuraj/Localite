package com.localite.backend.controller;

import com.localite.backend.model.Notification;
import com.localite.backend.model.User;
import com.localite.backend.repository.NotificationRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationController(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<?> getNotifications(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> userOpt = userRepository.findByUsername(principal.getName());
        if (userOpt.isPresent()) {
            List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userOpt.get().getId());
            return ResponseEntity.ok(notifications);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<Notification> notifOpt = notificationRepository.findById(id);
        if (notifOpt.isPresent()) {
            Notification notification = notifOpt.get();
            // Verify ownership
            if (notification.getUser().getUsername().equals(principal.getName())) {
                notification.setRead(true);
                notificationRepository.save(notification);
                return ResponseEntity.ok("Marked as read");
            }
        }
        return ResponseEntity.notFound().build();
    }
}
