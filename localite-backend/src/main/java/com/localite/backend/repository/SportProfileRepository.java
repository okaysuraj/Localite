package com.localite.backend.repository;

import com.localite.backend.model.SportProfile;
import com.localite.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SportProfileRepository extends JpaRepository<SportProfile, Long> {
    List<SportProfile> findBySportNameOrderByPointsDesc(String sportName);
    Optional<SportProfile> findByUserAndSportName(User user, String sportName);
}
