package com.localite.backend.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String email;
    private String firebaseUid;
    
    // MVP Profile Fields
    private String bio;
    private String neighborhood;
    
    private int xp = 0;
    
    @ElementCollection
    private List<String> badges = new ArrayList<>();
    private String sportsInterests; // e.g., "Basketball, Tennis"
    private String interests; // General interests e.g., "Music, Gaming"
    private Integer age;
    private String gender;
    private String profilePhotoUrl;
    private String lookingFor; // e.g., "friends, sports partners"
    private String availability; // e.g., "Weekends, Evenings"

    // Phase 3: Gamification & Reputation
    private int trustScore = 0;
    private int eventsHosted = 0;
    private int eventsAttended = 0;
    private boolean isVerified = false;
    
    // Identity & Trust Additions
    private String phoneNumber;
    private boolean isPhoneVerified = false;
    private String instagramHandle;
    private String twitterHandle;
    
    // Streaks
    private int currentStreak = 0;
    private int longestStreak = 0;
    private java.time.LocalDate lastActivityDate;
    // Phase 6: Ratings
    private Double averageRating = 0.0;
    private Integer reviewCount = 0;
    
    // Phase 5: Monetization & Admin Growth
    private boolean isBanned = false;
    private boolean isAdmin = false;
    private java.time.LocalDateTime profileBoostedUntil;

    public User() {}

    public User(String username, String email, String firebaseUid) {
        this.username = username;
        this.email = email;
        this.firebaseUid = firebaseUid;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getFirebaseUid() { return firebaseUid; }
    public void setFirebaseUid(String firebaseUid) { this.firebaseUid = firebaseUid; }
    
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    
    public String getNeighborhood() { return neighborhood; }
    public void setNeighborhood(String neighborhood) { this.neighborhood = neighborhood; }

    public int getXp() { return xp; }
    public void setXp(int xp) { this.xp = xp; }

    public List<String> getBadges() { return badges; }
    public void setBadges(List<String> badges) { this.badges = badges; }
    
    public String getSportsInterests() { return sportsInterests; }
    public void setSportsInterests(String sportsInterests) { this.sportsInterests = sportsInterests; }

    public String getInterests() { return interests; }
    public void setInterests(String interests) { this.interests = interests; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getProfilePhotoUrl() { return profilePhotoUrl; }
    public void setProfilePhotoUrl(String profilePhotoUrl) { this.profilePhotoUrl = profilePhotoUrl; }

    public String getLookingFor() { return lookingFor; }
    public void setLookingFor(String lookingFor) { this.lookingFor = lookingFor; }

    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }

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

    public boolean isBanned() { return isBanned; }
    public void setBanned(boolean banned) { isBanned = banned; }

    public boolean isAdmin() { return isAdmin; }
    public void setAdmin(boolean admin) { isAdmin = admin; }

    public java.time.LocalDateTime getProfileBoostedUntil() { return profileBoostedUntil; }
    public void setProfileBoostedUntil(java.time.LocalDateTime profileBoostedUntil) { this.profileBoostedUntil = profileBoostedUntil; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public boolean isPhoneVerified() { return isPhoneVerified; }
    public void setPhoneVerified(boolean phoneVerified) { isPhoneVerified = phoneVerified; }

    public String getInstagramHandle() { return instagramHandle; }
    public void setInstagramHandle(String instagramHandle) { this.instagramHandle = instagramHandle; }

    public String getTwitterHandle() { return twitterHandle; }
    public void setTwitterHandle(String twitterHandle) { this.twitterHandle = twitterHandle; }

    public int getCurrentStreak() { return currentStreak; }
    public void setCurrentStreak(int currentStreak) { this.currentStreak = currentStreak; }

    public int getLongestStreak() { return longestStreak; }
    public void setLongestStreak(int longestStreak) { this.longestStreak = longestStreak; }

    public java.time.LocalDate getLastActivityDate() { return lastActivityDate; }
    public void setLastActivityDate(java.time.LocalDate lastActivityDate) { this.lastActivityDate = lastActivityDate; }
}
