package com.localite.backend.service;

import com.localite.backend.model.Event;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

/** Filters the event catalog and ranks recommendations using the same stored events. */
@Service
public class EventDiscoveryService {
    private final EventRepository eventRepository;

    public EventDiscoveryService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> findEvents(String category, Double lat, Double lng, Double radius,
                                  String timeFilter, String eventType, String priceFilter) {
        List<Event> events = lat != null && lng != null
                ? eventRepository.findWithinRadius(lat, lng, radius)
                : eventRepository.findAll();
        LocalDate today = LocalDate.now();

        return events.stream()
                .filter(event -> isEmpty(category) || "All".equalsIgnoreCase(category)
                        || category.equalsIgnoreCase(event.getCategory()))
                .filter(event -> isEmpty(eventType) || eventType.equalsIgnoreCase(event.getEventType()))
                .filter(event -> matchesPrice(event, priceFilter))
                .filter(event -> matchesTime(event, timeFilter, today))
                .sorted(Comparator.comparing(Event::isHighlighted).reversed())
                .toList();
    }

    public List<Event> recommendEvents(User user) {
        // Highlighted events come first; equal scores retain their original order.
        return eventRepository.findAll().stream()
                .map(event -> new ScoredEvent(event, matchScore(user, event)))
                .filter(match -> match.score() > 0)
                .sorted(Comparator.comparing((ScoredEvent match) -> match.event().isHighlighted())
                        .reversed()
                        .thenComparing(Comparator.comparingInt(ScoredEvent::score).reversed()))
                .map(ScoredEvent::event)
                .toList();
    }

    private boolean matchesPrice(Event event, String priceFilter) {
        if (isEmpty(priceFilter)) return true;
        double cost = event.getCost() == null ? 0.0 : event.getCost();
        if ("Free".equalsIgnoreCase(priceFilter)) return cost == 0.0;
        if ("Paid".equalsIgnoreCase(priceFilter)) return cost > 0.0;
        return true;
    }

    private boolean matchesTime(Event event, String timeFilter, LocalDate today) {
        if (isEmpty(timeFilter) || event.getDate() == null) return true;
        LocalDate date = event.getDate().toLocalDate();
        if ("today".equalsIgnoreCase(timeFilter)) return date.equals(today);
        if ("weekend".equalsIgnoreCase(timeFilter)) {
            return date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY;
        }
        return true;
    }

    private int matchScore(User user, Event event) {
        int score = 0;
        if (containsIgnoreCase(user.getSportsInterests(), event.getCategory())) score += 3;
        if (containsIgnoreCase(event.getLocation(), user.getNeighborhood())) score += 2;
        return score;
    }

    private boolean containsIgnoreCase(String text, String part) {
        return text != null && part != null
                && text.toLowerCase(Locale.ROOT).contains(part.toLowerCase(Locale.ROOT));
    }

    private boolean isEmpty(String value) {
        return value == null || value.isEmpty();
    }

    private record ScoredEvent(Event event, int score) {}
}
