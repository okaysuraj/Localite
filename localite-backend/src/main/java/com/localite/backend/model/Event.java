package com.localite.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import jakarta.persistence.Transient;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @jakarta.persistence.JoinColumn(name = "host_id")
    private User host;

    @jakarta.persistence.OneToMany(mappedBy = "event", cascade = jakarta.persistence.CascadeType.ALL)
    private java.util.List<Rsvp> rsvps = new java.util.ArrayList<>();
    private String title;
    private String category;
    private LocalDateTime date;
    private String location;
    private int attendees;
    private int maxAttendees;
    private String imageUrl;
    private Double latitude;
    private Double longitude;
    private String seriesId;
    
    @Transient
    private String recurrence;
    
    @Transient
    private LocalDateTime recurrenceEndDate;

    public Event() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public int getAttendees() { return attendees; }
    public void setAttendees(int attendees) { this.attendees = attendees; }
    
    public int getMaxAttendees() { return maxAttendees; }
    public void setMaxAttendees(int maxAttendees) { this.maxAttendees = maxAttendees; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public User getHost() { return host; }
    public void setHost(User host) { this.host = host; }

    public java.util.List<Rsvp> getRsvps() { return rsvps; }
    public void setRsvps(java.util.List<Rsvp> rsvps) { this.rsvps = rsvps; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getSeriesId() { return seriesId; }
    public void setSeriesId(String seriesId) { this.seriesId = seriesId; }

    public String getRecurrence() { return recurrence; }
    public void setRecurrence(String recurrence) { this.recurrence = recurrence; }

    public LocalDateTime getRecurrenceEndDate() { return recurrenceEndDate; }
    public void setRecurrenceEndDate(LocalDateTime recurrenceEndDate) { this.recurrenceEndDate = recurrenceEndDate; }
}
