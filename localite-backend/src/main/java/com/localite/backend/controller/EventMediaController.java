package com.localite.backend.controller;

import com.localite.backend.model.Event;
import com.localite.backend.model.EventMedia;
import com.localite.backend.model.Rsvp;
import com.localite.backend.model.RsvpStatus;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.EventMediaRepository;
import com.localite.backend.repository.RsvpRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventMediaController {

    private final EventMediaRepository eventMediaRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final RsvpRepository rsvpRepository;

    public EventMediaController(EventMediaRepository eventMediaRepository, EventRepository eventRepository, UserRepository userRepository, RsvpRepository rsvpRepository) {
        this.eventMediaRepository = eventMediaRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.rsvpRepository = rsvpRepository;
    }

    @PostMapping("/{eventId}/media")
    public ResponseEntity<?> uploadMedia(@PathVariable Long eventId, @RequestBody MediaRequest request, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");

        Optional<User> uploaderOpt = userRepository.findByUsername(principal.getName());
        Optional<Event> eventOpt = eventRepository.findById(eventId);

        if (uploaderOpt.isPresent() && eventOpt.isPresent()) {
            User uploader = uploaderOpt.get();
            Event event = eventOpt.get();

            // Verify they actually attended (hosts can also upload)
            boolean isHost = event.getHost().getId().equals(uploader.getId());
            boolean attended = false;
            
            if (!isHost) {
                Optional<Rsvp> rsvpOpt = rsvpRepository.findByEventIdAndUserId(eventId, uploader.getId());
                if (rsvpOpt.isPresent() && rsvpOpt.get().getStatus() == RsvpStatus.ATTENDED) {
                    attended = true;
                }
            }

            if (!isHost && !attended) {
                return ResponseEntity.status(403).body("Only the host and checked-in attendees can upload memories.");
            }

            if (request.getMediaUrl() == null || request.getMediaUrl().isEmpty()) {
                return ResponseEntity.badRequest().body("Media URL cannot be empty.");
            }

            EventMedia media = new EventMedia(event, uploader, request.getMediaUrl());
            return ResponseEntity.ok(eventMediaRepository.save(media));
        }

        return ResponseEntity.badRequest().body("Event or User not found");
    }

    @GetMapping("/{eventId}/media")
    public ResponseEntity<List<EventMedia>> getEventMedia(@PathVariable Long eventId) {
        return ResponseEntity.ok(eventMediaRepository.findByEventIdOrderByUploadedAtDesc(eventId));
    }
}

class MediaRequest {
    private String mediaUrl;

    public String getMediaUrl() { return mediaUrl; }
    public void setMediaUrl(String mediaUrl) { this.mediaUrl = mediaUrl; }
}
