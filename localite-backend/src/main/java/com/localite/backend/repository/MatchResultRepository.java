package com.localite.backend.repository;

import com.localite.backend.model.MatchResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MatchResultRepository extends JpaRepository<MatchResult, Long> {
    List<MatchResult> findByEventId(Long eventId);
    List<MatchResult> findByWinnerIdOrLoserId(Long winnerId, Long loserId);
}
