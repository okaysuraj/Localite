package com.localite.backend.service;

import com.localite.backend.model.Event;
import com.localite.backend.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

/** Saves a single event or expands its recurrence into at most 24 occurrences. */
@Service
public class EventScheduleService {
    private static final int MAX_OCCURRENCES = 24;
    private final EventRepository eventRepository;

    public EventScheduleService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event saveEvent(Event event) {
        if (event.getRecurrence() == null || "NONE".equals(event.getRecurrence())
                || event.getRecurrenceEndDate() == null) {
            return eventRepository.save(event);
        }

        String seriesId = UUID.randomUUID().toString();
        event.setSeriesId(seriesId);
        LocalDateTime date = event.getDate();

        for (int count = 0; count < MAX_OCCURRENCES && !date.isAfter(event.getRecurrenceEndDate()); count++) {
            eventRepository.save(copyOccurrence(event, date));
            LocalDateTime nextDate = switch (event.getRecurrence()) {
                case "DAILY" -> date.plusDays(1);
                case "WEEKLY" -> date.plusWeeks(1);
                case "MONTHLY" -> date.plusMonths(1);
                default -> null;
            };
            if (nextDate == null) break;
            date = nextDate;
        }

        // The API returns the series template; each saved occurrence has its own ID.
        return event;
    }

    private Event copyOccurrence(Event template, LocalDateTime date) {
        Event occurrence = new Event();
        occurrence.setHost(template.getHost());
        occurrence.setTitle(template.getTitle());
        occurrence.setDescription(template.getDescription());
        occurrence.setCategory(template.getCategory());
        occurrence.setEventType(template.getEventType());
        occurrence.setCost(template.getCost());
        occurrence.setRules(template.getRules());
        occurrence.setSkillLevel(template.getSkillLevel());
        occurrence.setLocation(template.getLocation());
        occurrence.setAttendees(0);
        occurrence.setMaxAttendees(template.getMaxAttendees());
        occurrence.setImageUrl(template.getImageUrl());
        occurrence.setLatitude(template.getLatitude());
        occurrence.setLongitude(template.getLongitude());
        occurrence.setSeriesId(template.getSeriesId());
        occurrence.setDate(date);
        return occurrence;
    }
}
