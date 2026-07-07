package com.localite.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class SportProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private String sportName; // e.g. "Tennis", "Basketball"
    
    private String skillLevel; // e.g. "Beginner", "Intermediate", "Advanced", "Pro"
    
    private int points = 1000; // Starting baseline points
    
    private int wins = 0;
    
    private int losses = 0;

    public SportProfile() {}

    public SportProfile(User user, String sportName, String skillLevel) {
        this.user = user;
        this.sportName = sportName;
        this.skillLevel = skillLevel;
        this.points = 1000;
        this.wins = 0;
        this.losses = 0;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getSportName() { return sportName; }
    public void setSportName(String sportName) { this.sportName = sportName; }

    public String getSkillLevel() { return skillLevel; }
    public void setSkillLevel(String skillLevel) { this.skillLevel = skillLevel; }

    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }

    public int getWins() { return wins; }
    public void setWins(int wins) { this.wins = wins; }

    public int getLosses() { return losses; }
    public void setLosses(int losses) { this.losses = losses; }
}
