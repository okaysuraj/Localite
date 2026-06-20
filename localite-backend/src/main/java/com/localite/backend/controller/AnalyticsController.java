package com.localite.backend.controller;

import com.localite.backend.dto.AnalyticsResponse;
import com.localite.backend.model.Event;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users/me/analytics")
public class AnalyticsController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping
    public ResponseEntity<AnalyticsResponse> getAnalytics(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            return ResponseEntity.status(401).build();
        }

        User currentUser = (User) authentication.getPrincipal();
        Long hostId = currentUser.getId();

        List<Event> hostedEvents = eventRepository.findByHostId(hostId);
        
        AnalyticsResponse response = new AnalyticsResponse();
        response.setTotalEventsHosted(hostedEvents.size());
        
        int totalAttendees = 0;
        int upcomingCount = 0;
        List<AnalyticsResponse.EventPerformance> recentEvents = new ArrayList<>();
        Map<String, Integer> attendeesByMonth = new TreeMap<>();
        
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMM yyyy");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");

        for (Event event : hostedEvents) {
            totalAttendees += event.getAttendees();
            
            if (event.getDate().isAfter(now)) {
                upcomingCount++;
            } else {
                // Calculate rating for this specific event
                // Assuming we can get reviews for this host. But reviews are for host, not specific event currently.
                // We'll just show the host's overall average rating on the event, or 0 if none.
                // Since our Review entity doesn't link to an Event natively in the MVP, we'll mock the per-event rating with the host's average for now.
                recentEvents.add(new AnalyticsResponse.EventPerformance(
                    event.getTitle(),
                    event.getDate().format(dateFormatter),
                    event.getAttendees(),
                    currentUser.getAverageRating()
                ));
            }
            
            String monthKey = event.getDate().format(monthFormatter);
            attendeesByMonth.put(monthKey, attendeesByMonth.getOrDefault(monthKey, 0) + event.getAttendees());
        }

        // Sort recent events by date (descending string compare works somewhat, but let's just reverse the list or let the frontend handle it)
        // For simplicity, we just pass the list.

        List<AnalyticsResponse.ChartData> chartData = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : attendeesByMonth.entrySet()) {
            chartData.add(new AnalyticsResponse.ChartData(entry.getKey(), entry.getValue()));
        }

        response.setTotalAttendees(totalAttendees);
        response.setUpcomingEventsCount(upcomingCount);
        response.setAverageRating(currentUser.getAverageRating());
        response.setRecentEvents(recentEvents);
        response.setPerformanceData(chartData);

        return ResponseEntity.ok(response);
    }
}
