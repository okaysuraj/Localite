package com.localite.backend.repository;

import com.localite.backend.model.Rsvp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RsvpRepository extends JpaRepository<Rsvp, Long> {
    List<Rsvp> findByEventId(Long eventId);
    List<Rsvp> findByUserId(Long userId);
    Optional<Rsvp> findByEventIdAndUserId(Long eventId, Long userId);
    Optional<Rsvp> findByTicketId(String ticketId);
}
