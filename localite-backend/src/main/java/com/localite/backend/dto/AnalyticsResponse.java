package com.localite.backend.dto;

import java.util.List;

public class AnalyticsResponse {
    private int totalEventsHosted;
    private int totalAttendees;
    private double averageRating;
    private int upcomingEventsCount;
    private List<EventPerformance> recentEvents;
    private List<ChartData> performanceData;

    public AnalyticsResponse() {
    }

    public int getTotalEventsHosted() {
        return totalEventsHosted;
    }

    public void setTotalEventsHosted(int totalEventsHosted) {
        this.totalEventsHosted = totalEventsHosted;
    }

    public int getTotalAttendees() {
        return totalAttendees;
    }

    public void setTotalAttendees(int totalAttendees) {
        this.totalAttendees = totalAttendees;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public int getUpcomingEventsCount() {
        return upcomingEventsCount;
    }

    public void setUpcomingEventsCount(int upcomingEventsCount) {
        this.upcomingEventsCount = upcomingEventsCount;
    }

    public List<EventPerformance> getRecentEvents() {
        return recentEvents;
    }

    public void setRecentEvents(List<EventPerformance> recentEvents) {
        this.recentEvents = recentEvents;
    }

    public List<ChartData> getPerformanceData() {
        return performanceData;
    }

    public void setPerformanceData(List<ChartData> performanceData) {
        this.performanceData = performanceData;
    }

    public static class EventPerformance {
        private String title;
        private String date;
        private int attendees;
        private double rating;

        public EventPerformance() {}

        public EventPerformance(String title, String date, int attendees, double rating) {
            this.title = title;
            this.date = date;
            this.attendees = attendees;
            this.rating = rating;
        }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }

        public int getAttendees() { return attendees; }
        public void setAttendees(int attendees) { this.attendees = attendees; }

        public double getRating() { return rating; }
        public void setRating(double rating) { this.rating = rating; }
    }

    public static class ChartData {
        private String label;
        private int attendees;

        public ChartData() {}

        public ChartData(String label, int attendees) {
            this.label = label;
            this.attendees = attendees;
        }

        public String getLabel() { return label; }
        public void setLabel(String label) { this.label = label; }

        public int getAttendees() { return attendees; }
        public void setAttendees(int attendees) { this.attendees = attendees; }
    }
}
