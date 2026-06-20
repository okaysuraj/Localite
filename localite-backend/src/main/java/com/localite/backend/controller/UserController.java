package com.localite.backend.controller;

import com.localite.backend.model.Notification;
import com.localite.backend.model.Connection;
import com.localite.backend.model.ConnectionStatus;
import com.localite.backend.model.User;
import com.localite.backend.repository.ConnectionRepository;
import com.localite.backend.repository.NotificationRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Allow requests from our React apps
public class UserController {

    private final UserRepository userRepository;
    private final ConnectionRepository connectionRepository;
    private final NotificationRepository notificationRepository;

    public UserController(UserRepository userRepository, ConnectionRepository connectionRepository, NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.connectionRepository = connectionRepository;
        this.notificationRepository = notificationRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Optional<User> userOpt = userRepository.findByUsername(principal.getName());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(null);
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(null);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Optional<User> userOpt = userRepository.findByUsername(principal.getName());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (updatedUser.getBio() != null) user.setBio(updatedUser.getBio());
            if (updatedUser.getNeighborhood() != null) user.setNeighborhood(updatedUser.getNeighborhood());
            if (updatedUser.getSportsInterests() != null) user.setSportsInterests(updatedUser.getSportsInterests());
            userRepository.save(user);
            user.setPassword(null);
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.notFound().build();
    }

    // Phase 2: Social Graph Endpoints
    @GetMapping
    public ResponseEntity<?> getAllUsers(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        List<User> users = userRepository.findAll();
        // Return stripped down user objects
        List<Map<String, Object>> response = users.stream()
            .filter(u -> !u.getUsername().equals(principal.getName()))
            .map(u -> Map.<String, Object>of(
                "id", u.getId(),
                "username", u.getUsername(),
                "bio", u.getBio() != null ? u.getBio() : "",
                "sportsInterests", u.getSportsInterests() != null ? u.getSportsInterests() : "",
                "neighborhood", u.getNeighborhood() != null ? u.getNeighborhood() : ""
            )).collect(Collectors.toList());
            
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/connect")
    public ResponseEntity<?> sendConnectionRequest(@PathVariable Long id, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> requesterOpt = userRepository.findByUsername(principal.getName());
        Optional<User> receiverOpt = userRepository.findById(id);
        
        if (requesterOpt.isPresent() && receiverOpt.isPresent()) {
            User requester = requesterOpt.get();
            User receiver = receiverOpt.get();
            
            if (requester.getId().equals(receiver.getId())) {
                return ResponseEntity.badRequest().body("Cannot connect with yourself");
            }
            
            Optional<Connection> existing1 = connectionRepository.findByRequesterIdAndReceiverId(requester.getId(), receiver.getId());
            Optional<Connection> existing2 = connectionRepository.findByRequesterIdAndReceiverId(receiver.getId(), requester.getId());
            
            if (existing1.isPresent() || existing2.isPresent()) {
                return ResponseEntity.badRequest().body("Connection request already exists");
            }
            
            Connection connection = new Connection(requester, receiver, ConnectionStatus.PENDING);
            connectionRepository.save(connection);
            
            // Create notification for receiver
            Notification notif = new Notification(receiver, requester.getUsername() + " sent you a connection request.", "CONNECTION");
            notificationRepository.save(notif);
            
            return ResponseEntity.ok("Connection request sent");
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/connections/pending")
    public ResponseEntity<?> getPendingRequests(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> userOpt = userRepository.findByUsername(principal.getName());
        if (userOpt.isPresent()) {
            List<Connection> requests = connectionRepository.findByReceiverIdAndStatus(userOpt.get().getId(), ConnectionStatus.PENDING);
            List<Map<String, Object>> response = requests.stream()
                .map(req -> Map.<String, Object>of(
                    "connectionId", req.getId(),
                    "requesterId", req.getRequester().getId(),
                    "requesterName", req.getRequester().getUsername()
                )).collect(Collectors.toList());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/connections/{connectionId}/accept")
    public ResponseEntity<?> acceptConnection(@PathVariable Long connectionId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> userOpt = userRepository.findByUsername(principal.getName());
        Optional<Connection> connOpt = connectionRepository.findById(connectionId);
        
        if (userOpt.isPresent() && connOpt.isPresent()) {
            Connection connection = connOpt.get();
            if (connection.getReceiver().getId().equals(userOpt.get().getId())) {
                connection.setStatus(ConnectionStatus.ACCEPTED);
                connectionRepository.save(connection);
                
                // Notify requester
                Notification notif = new Notification(connection.getRequester(), userOpt.get().getUsername() + " accepted your connection request.", "CONNECTION");
                notificationRepository.save(notif);
                
                return ResponseEntity.ok("Connection accepted");
            }
        }
        return ResponseEntity.badRequest().body("Invalid request");
    }
}
