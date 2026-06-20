package com.localite.backend.controller;

import com.localite.backend.model.DirectMessage;
import com.localite.backend.model.User;
import com.localite.backend.repository.DirectMessageRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/messages/direct")
@CrossOrigin(origins = "*")
public class DirectMessageController {

    private final DirectMessageRepository directMessageRepository;
    private final UserRepository userRepository;

    public DirectMessageController(DirectMessageRepository directMessageRepository, UserRepository userRepository) {
        this.directMessageRepository = directMessageRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{otherUserId}")
    public ResponseEntity<?> getConversation(@PathVariable Long otherUserId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> currentUserOpt = userRepository.findByUsername(principal.getName());
        if (!currentUserOpt.isPresent()) return ResponseEntity.status(401).body("User not found");

        List<DirectMessage> messages = directMessageRepository.findConversation(currentUserOpt.get().getId(), otherUserId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/{otherUserId}")
    public ResponseEntity<?> sendMessage(@PathVariable Long otherUserId, @RequestBody DirectMessage messagePayload, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> senderOpt = userRepository.findByUsername(principal.getName());
        Optional<User> receiverOpt = userRepository.findById(otherUserId);
        
        if (senderOpt.isPresent() && receiverOpt.isPresent()) {
            DirectMessage dm = new DirectMessage(senderOpt.get(), receiverOpt.get(), messagePayload.getContent());
            directMessageRepository.save(dm);
            return ResponseEntity.ok(dm);
        }
        
        return ResponseEntity.badRequest().body("Sender or Receiver not found");
    }
}
