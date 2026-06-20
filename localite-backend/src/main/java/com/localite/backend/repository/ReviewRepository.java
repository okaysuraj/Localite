package com.localite.backend.repository;

import com.localite.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByHostId(Long hostId);
    Optional<Review> findByEventIdAndReviewerId(Long eventId, Long reviewerId);
}
