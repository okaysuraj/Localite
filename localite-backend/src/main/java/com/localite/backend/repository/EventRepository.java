package com.localite.backend.repository;

import com.localite.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCategory(String category);
    List<Event> findByHostId(Long hostId);

    @Query(value = "SELECT * FROM event e WHERE (6371 * acos(cos(radians(:lat)) * cos(radians(e.latitude)) * cos(radians(e.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(e.latitude)))) < :radius", nativeQuery = true)
    List<Event> findWithinRadius(@Param("lat") Double lat, @Param("lng") Double lng, @Param("radius") Double radius);
}
