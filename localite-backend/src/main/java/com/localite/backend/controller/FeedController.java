package com.localite.backend.controller;

import com.localite.backend.model.Event;
import com.localite.backend.model.Follow;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.FollowRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/feed")
@CrossOrigin(origins = "*")
public class FeedController {

    private final FollowRepository followRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public FeedController(FollowRepository followRepository, EventRepository eventRepository, UserRepository userRepository) {
        this.followRepository = followRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<FeedItem>> getFeed(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).build();

        Optional<User> currentUserOpt = userRepository.findByFirebaseUid(principal.getName());
        if (currentUserOpt.isEmpty()) return ResponseEntity.badRequest().build();

        User currentUser = currentUserOpt.get();

        // Get all users current user is following
        List<User> following = followRepository.findByFollowerId(currentUser.getId()).stream()
                .map(Follow::getFollowing)
                .collect(Collectors.toList());

        if (following.isEmpty()) {
            return ResponseEntity.ok(new ArrayList<>());
        }

        List<Long> followingIds = following.stream().map(User::getId).collect(Collectors.toList());

        // For MVP, just get all events and filter them in memory (not scalable, but works for prototype)
        List<Event> allEvents = eventRepository.findAll();
        
        List<FeedItem> feedItems = new ArrayList<>();

        for (Event event : allEvents) {
            // If a followed user is the host
            if (event.getHost() != null && followingIds.contains(event.getHost().getId())) {
                feedItems.add(new FeedItem(event, "HOSTED", event.getHost()));
            }
            // Wait, we could also check rsvps but Event entity doesn't have direct access to Rsvps without querying
            // For MVP, just showing hosted events is a great start for a feed.
        }

        // Sort by event date descending
        feedItems.sort(Comparator.comparing((FeedItem item) -> item.getEvent().getDate()).reversed());

        return ResponseEntity.ok(feedItems);
    }
}

class FeedItem {
    private Event event;
    private String action; // "HOSTED"
    private User actor;

    public FeedItem(Event event, String action, User actor) {
        this.event = event;
        this.action = action;
        this.actor = actor;
    }

    public Event getEvent() { return event; }
    public String getAction() { return action; }
    public User getActor() { return actor; }
}
