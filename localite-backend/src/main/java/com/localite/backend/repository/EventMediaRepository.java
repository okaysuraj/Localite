package com.localite.backend.repository;

import com.localite.backend.model.EventMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventMediaRepository extends JpaRepository<EventMedia, Long> {
    List<EventMedia> findByEventIdOrderByUploadedAtDesc(Long eventId);
}
