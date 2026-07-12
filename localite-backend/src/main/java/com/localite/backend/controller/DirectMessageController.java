package com.localite.backend.controller;

import com.localite.backend.model.DirectMessage;
import com.localite.backend.model.User;
import com.localite.backend.repository.DirectMessageRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    private final SimpMessagingTemplate messagingTemplate;

    public DirectMessageController(DirectMessageRepository directMessageRepository, UserRepository userRepository, SimpMessagingTemplate messagingTemplate) {
        this.directMessageRepository = directMessageRepository;
        this.userRepository = userRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping("/conversations")
    public ResponseEntity<?> getConversations(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> currentUserOpt = userRepository.findByFirebaseUid(principal.getName());
        if (!currentUserOpt.isPresent()) return ResponseEntity.status(401).body("User not found");
        
        Long currentUserId = currentUserOpt.get().getId();
        List<DirectMessage> allMessages = directMessageRepository.findBySenderIdOrReceiverIdOrderBySentAtDesc(currentUserId, currentUserId);
        
        // Group by the 'other' user ID and keep only the latest message
        java.util.Map<Long, DirectMessage> latestMessages = new java.util.HashMap<>();
        for (DirectMessage msg : allMessages) {
            Long otherUserId = msg.getSender().getId().equals(currentUserId) ? msg.getReceiver().getId() : msg.getSender().getId();
            if (!latestMessages.containsKey(otherUserId)) {
                latestMessages.put(otherUserId, msg);
            }
        }
        
        // Return sorted list
        List<DirectMessage> conversations = new java.util.ArrayList<>(latestMessages.values());
        conversations.sort((m1, m2) -> m2.getSentAt().compareTo(m1.getSentAt()));
        
        return ResponseEntity.ok(conversations);
    }

    @GetMapping("/{otherUserId}")
    public ResponseEntity<?> getConversation(@PathVariable Long otherUserId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> currentUserOpt = userRepository.findByFirebaseUid(principal.getName());
        if (!currentUserOpt.isPresent()) return ResponseEntity.status(401).body("User not found");

        List<DirectMessage> messages = directMessageRepository.findConversation(currentUserOpt.get().getId(), otherUserId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/{otherUserId}")
    public ResponseEntity<?> sendMessage(@PathVariable Long otherUserId, @RequestBody DirectMessage messagePayload, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<User> senderOpt = userRepository.findByFirebaseUid(principal.getName());
        Optional<User> receiverOpt = userRepository.findById(otherUserId);
        
        if (senderOpt.isPresent() && receiverOpt.isPresent()) {
            DirectMessage dm = new DirectMessage(senderOpt.get(), receiverOpt.get(), messagePayload.getContent());
            if (messagePayload.getMessageType() != null) dm.setMessageType(messagePayload.getMessageType());
            if (messagePayload.getMetadata() != null) dm.setMetadata(messagePayload.getMetadata());
            directMessageRepository.save(dm);
            
            // Broadcast to both users
            messagingTemplate.convertAndSend("/topic/user/" + otherUserId + "/messages", dm);
            messagingTemplate.convertAndSend("/topic/user/" + senderOpt.get().getId() + "/messages", dm);
            
            return ResponseEntity.ok(dm);
        }
        
        return ResponseEntity.badRequest().body("Sender or Receiver not found");
    }

    // WebSocket Endpoint for Direct Messages
    @MessageMapping("/user/{otherUserId}/sendMessage")
    public void handleWebSocketDirectMessage(@DestinationVariable Long otherUserId, @Payload DirectMessage messagePayload, Principal principal) {
        if (principal == null) return;
        
        Optional<User> senderOpt = userRepository.findByFirebaseUid(principal.getName());
        Optional<User> receiverOpt = userRepository.findById(otherUserId);
        
        if (senderOpt.isPresent() && receiverOpt.isPresent()) {
            DirectMessage dm = new DirectMessage(senderOpt.get(), receiverOpt.get(), messagePayload.getContent());
            if (messagePayload.getMessageType() != null) dm.setMessageType(messagePayload.getMessageType());
            if (messagePayload.getMetadata() != null) dm.setMetadata(messagePayload.getMetadata());
            directMessageRepository.save(dm);
            
            messagingTemplate.convertAndSend("/topic/user/" + otherUserId + "/messages", dm);
            messagingTemplate.convertAndSend("/topic/user/" + senderOpt.get().getId() + "/messages", dm);
        }
    }
}
