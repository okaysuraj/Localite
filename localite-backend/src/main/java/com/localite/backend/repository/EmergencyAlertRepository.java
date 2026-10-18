package com.localite.backend.repository;

import com.localite.backend.model.EmergencyAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmergencyAlertRepository extends JpaRepository<EmergencyAlert, Long> {
    List<EmergencyAlert> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<EmergencyAlert> findAllByOrderByCreatedAtDesc();
}
