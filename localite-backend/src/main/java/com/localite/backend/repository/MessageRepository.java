package com.localite.backend.repository;

import com.localite.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByEventIdOrderBySentAtAsc(Long eventId);
}
