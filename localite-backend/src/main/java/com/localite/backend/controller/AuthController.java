package com.localite.backend.controller;

import com.localite.backend.model.User;
import com.localite.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/sync-user")
    public ResponseEntity<?> syncUser(@RequestBody SyncUserRequest request) {
        String firebaseUid = SecurityContextHolder.getContext().getAuthentication().getName();
        
        User user = userRepository.findByFirebaseUid(firebaseUid).orElseGet(() -> {
            User newUser = new User(request.username(), request.email(), firebaseUid);
            return userRepository.save(newUser);
        });
        
        return ResponseEntity.ok(user);
    }

    public record SyncUserRequest(String username, String email) {}
}
