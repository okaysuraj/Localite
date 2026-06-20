package com.localite.backend.controller;

import com.localite.backend.model.Follow;
import com.localite.backend.model.User;
import com.localite.backend.repository.FollowRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class FollowController {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    public FollowController(FollowRepository followRepository, UserRepository userRepository) {
        this.followRepository = followRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/{userId}/follow")
    public ResponseEntity<?> followUser(@PathVariable Long userId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");

        Optional<User> followerOpt = userRepository.findByUsername(principal.getName());
        Optional<User> followingOpt = userRepository.findById(userId);

        if (followerOpt.isPresent() && followingOpt.isPresent()) {
            User follower = followerOpt.get();
            User following = followingOpt.get();

            if (follower.getId().equals(following.getId())) {
                return ResponseEntity.badRequest().body("You cannot follow yourself.");
            }

            if (followRepository.existsByFollowerIdAndFollowingId(follower.getId(), following.getId())) {
                return ResponseEntity.badRequest().body("Already following this user.");
            }

            Follow follow = new Follow(follower, following);
            return ResponseEntity.ok(followRepository.save(follow));
        }

        return ResponseEntity.badRequest().body("User not found");
    }

    @DeleteMapping("/{userId}/unfollow")
    public ResponseEntity<?> unfollowUser(@PathVariable Long userId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).body("Unauthorized");

        Optional<User> followerOpt = userRepository.findByUsername(principal.getName());
        if (followerOpt.isPresent()) {
            Optional<Follow> followOpt = followRepository.findByFollowerIdAndFollowingId(followerOpt.get().getId(), userId);
            if (followOpt.isPresent()) {
                followRepository.delete(followOpt.get());
                return ResponseEntity.ok("Unfollowed successfully.");
            } else {
                return ResponseEntity.badRequest().body("Not following this user.");
            }
        }
        return ResponseEntity.badRequest().body("User not found");
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<List<User>> getFollowers(@PathVariable Long userId) {
        List<User> followers = followRepository.findByFollowingId(userId).stream()
                .map(Follow::getFollower)
                .collect(Collectors.toList());
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<List<User>> getFollowing(@PathVariable Long userId) {
        List<User> following = followRepository.findByFollowerId(userId).stream()
                .map(Follow::getFollowing)
                .collect(Collectors.toList());
        return ResponseEntity.ok(following);
    }

    @GetMapping("/{userId}/is-following")
    public ResponseEntity<Boolean> isFollowing(@PathVariable Long userId, Principal principal) {
        if (principal == null) return ResponseEntity.ok(false);
        Optional<User> followerOpt = userRepository.findByUsername(principal.getName());
        if (followerOpt.isPresent()) {
            boolean exists = followRepository.existsByFollowerIdAndFollowingId(followerOpt.get().getId(), userId);
            return ResponseEntity.ok(exists);
        }
        return ResponseEntity.ok(false);
    }
}
