package com.localite.backend.controller;

import com.localite.backend.model.Event;
import com.localite.backend.model.Review;
import com.localite.backend.model.Rsvp;
import com.localite.backend.model.RsvpStatus;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.ReviewRepository;
import com.localite.backend.repository.RsvpRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final RsvpRepository rsvpRepository;

    public ReviewController(ReviewRepository reviewRepository, EventRepository eventRepository, UserRepository userRepository, RsvpRepository rsvpRepository) {
        this.reviewRepository = reviewRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.rsvpRepository = rsvpRepository;
    }

    @PostMapping("/events/{eventId}/reviews")
    public ResponseEntity<?> submitReview(@PathVariable Long eventId, @RequestBody ReviewRequest request, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");

        Optional<User> reviewerOpt = userRepository.findByUsername(principal.getName());
        Optional<Event> eventOpt = eventRepository.findById(eventId);

        if (reviewerOpt.isPresent() && eventOpt.isPresent()) {
            User reviewer = reviewerOpt.get();
            Event event = eventOpt.get();
            User host = event.getHost();

            if (reviewer.getId().equals(host.getId())) {
                return ResponseEntity.badRequest().body("Hosts cannot review their own events");
            }

            // Verify they actually attended
            Optional<Rsvp> rsvpOpt = rsvpRepository.findByEventIdAndUserId(eventId, reviewer.getId());
            if (!rsvpOpt.isPresent() || rsvpOpt.get().getStatus() != RsvpStatus.ATTENDED) {
                return ResponseEntity.badRequest().body("You must have attended the event to leave a review.");
            }

            // Check if already reviewed
            Optional<Review> existingReview = reviewRepository.findByEventIdAndReviewerId(eventId, reviewer.getId());
            if (existingReview.isPresent()) {
                return ResponseEntity.badRequest().body("You have already reviewed this event.");
            }

            Review review = new Review(event, reviewer, host, request.getRating(), request.getComment());
            reviewRepository.save(review);

            // Update host's average rating
            int newCount = host.getReviewCount() + 1;
            double newAvg = ((host.getAverageRating() * host.getReviewCount()) + request.getRating()) / newCount;
            
            host.setReviewCount(newCount);
            host.setAverageRating(newAvg);
            userRepository.save(host);

            return ResponseEntity.ok(review);
        }

        return ResponseEntity.badRequest().body("Event or User not found");
    }

    @GetMapping("/users/{userId}/reviews")
    public ResponseEntity<List<Review>> getUserReviews(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewRepository.findByHostId(userId));
    }
}

class ReviewRequest {
    private int rating;
    private String comment;

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
