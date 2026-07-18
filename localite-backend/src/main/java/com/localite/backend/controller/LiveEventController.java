package com.localite.backend.controller;

import com.localite.backend.model.LocationUpdate;
import com.localite.backend.model.User;
import com.localite.backend.repository.UserRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.Optional;

@Controller
public class LiveEventController {

    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository userRepository;

    public LiveEventController(SimpMessagingTemplate messagingTemplate, UserRepository userRepository) {
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
    }

    // WebSocket Endpoint for Live Map Tracking
    @MessageMapping("/event/{eventId}/location")
    public void handleLocationUpdate(@DestinationVariable Long eventId, @Payload LocationUpdate update, Principal principal) {
        if (principal != null) {
            Optional<User> userOpt = userRepository.findByFirebaseUid(principal.getName());
            userOpt.ifPresent(user -> {
                // Attach the verified user ID to the update
                update.setUserId(user.getId());
                
                // Broadcast to all subscribers of this event's location topic
                messagingTemplate.convertAndSend("/topic/event/" + eventId + "/location", update);
            });
        }
    }
}
