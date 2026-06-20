package com.localite.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String email;
    private String password;
    
    // MVP Profile Fields
    private String bio;
    private String neighborhood;
    private String sportsInterests; // e.g., "Basketball, Tennis"

    // Phase 3: Gamification & Reputation
    private int trustScore = 0;
    private int eventsHosted = 0;
    private int eventsAttended = 0;
    private boolean isVerified = false;

    // Phase 6: Ratings
    private Double averageRating = 0.0;
    private Integer reviewCount = 0;

    public User() {}

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    
    public String getNeighborhood() { return neighborhood; }
    public void setNeighborhood(String neighborhood) { this.neighborhood = neighborhood; }
    
    public String getSportsInterests() { return sportsInterests; }
    public void setSportsInterests(String sportsInterests) { this.sportsInterests = sportsInterests; }

    public int getTrustScore() { return trustScore; }
    public void setTrustScore(int trustScore) { this.trustScore = trustScore; }

    public int getEventsHosted() { return eventsHosted; }
    public void setEventsHosted(int eventsHosted) { this.eventsHosted = eventsHosted; }

    public int getEventsAttended() { return eventsAttended; }
    public void setEventsAttended(int eventsAttended) { this.eventsAttended = eventsAttended; }

    public boolean isVerified() { return isVerified; }
    public void setVerified(boolean verified) { isVerified = verified; }

    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
}
