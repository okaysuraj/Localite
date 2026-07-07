package com.localite.backend.controller;

import com.localite.backend.model.Event;
import com.localite.backend.model.Message;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.MessageRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*") // Allow requests from our React apps
public class ChatController {

    private final MessageRepository messageRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(MessageRepository messageRepository, EventRepository eventRepository, UserRepository userRepository, SimpMessagingTemplate messagingTemplate) {
        this.messageRepository = messageRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping("/{eventId}/messages")
    public ResponseEntity<?> getMessages(@PathVariable Long eventId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        List<Message> messages = messageRepository.findByEventIdOrderBySentAtAsc(eventId);
        
        List<Map<String, Object>> response = messages.stream().map(msg -> {
            Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", msg.getId());
            map.put("content", msg.getContent());
            map.put("sentAt", msg.getSentAt());
            map.put("sender", msg.getSender().getUsername());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{eventId}/messages")
    public ResponseEntity<?> sendMessage(@PathVariable Long eventId, @RequestBody Map<String, String> payload, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Optional<Event> eventOpt = eventRepository.findById(eventId);
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        String content = payload.get("content");

        if (eventOpt.isPresent() && userOpt.isPresent() && content != null && !content.trim().isEmpty()) {
            Message message = new Message(eventOpt.get(), userOpt.get(), content);
            messageRepository.save(message);
            
            Map<String, Object> responseMap = new java.util.HashMap<>();
            responseMap.put("id", message.getId());
            responseMap.put("content", message.getContent());
            responseMap.put("sentAt", message.getSentAt());
            responseMap.put("sender", message.getSender().getUsername());
            
            // Broadcast over STOMP
            messagingTemplate.convertAndSend("/topic/events/" + eventId, responseMap);
            
            return ResponseEntity.ok(responseMap);
        }

        return ResponseEntity.badRequest().body("Invalid request");
    }

    // WebSocket Endpoint for Chat
    @MessageMapping("/events/{eventId}/sendMessage")
    public void handleWebSocketMessage(@DestinationVariable Long eventId, @Payload Map<String, String> payload, Principal principal) {
        if (principal == null) return;
        
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
        String content = payload.get("content");
        
        if (eventOpt.isPresent() && userOpt.isPresent() && content != null && !content.trim().isEmpty()) {
            Message message = new Message(eventOpt.get(), userOpt.get(), content);
            messageRepository.save(message);
            
            Map<String, Object> responseMap = new java.util.HashMap<>();
            responseMap.put("id", message.getId());
            responseMap.put("content", message.getContent());
            responseMap.put("sentAt", message.getSentAt());
            responseMap.put("sender", message.getSender().getUsername());
            
            messagingTemplate.convertAndSend("/topic/events/" + eventId, responseMap);
        }
    }
}
