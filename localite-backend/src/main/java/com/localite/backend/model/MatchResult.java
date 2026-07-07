package com.localite.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;

@Entity
public class MatchResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Event event;

    @ManyToOne
    private User winner;

    @ManyToOne
    private User loser;

    private String score; // e.g. "6-4, 6-2"
    
    private boolean isVerified;
    
    private LocalDateTime submittedAt;

    public MatchResult() {}

    public MatchResult(Event event, User winner, User loser, String score) {
        this.event = event;
        this.winner = winner;
        this.loser = loser;
        this.score = score;
        this.isVerified = false;
        this.submittedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Event getEvent() { return event; }
    public void setEvent(Event event) { this.event = event; }

    public User getWinner() { return winner; }
    public void setWinner(User winner) { this.winner = winner; }

    public User getLoser() { return loser; }
    public void setLoser(User loser) { this.loser = loser; }

    public String getScore() { return score; }
    public void setScore(String score) { this.score = score; }

    public boolean isVerified() { return isVerified; }
    public void setVerified(boolean verified) { isVerified = verified; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}
