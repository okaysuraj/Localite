package com.localite.backend.repository;

import com.localite.backend.model.Connection;
import com.localite.backend.model.ConnectionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConnectionRepository extends JpaRepository<Connection, Long> {
    List<Connection> findByReceiverIdAndStatus(Long receiverId, ConnectionStatus status);
    List<Connection> findByRequesterIdAndStatus(Long requesterId, ConnectionStatus status);
    
    // Find any connection between two users
    Optional<Connection> findByRequesterIdAndReceiverId(Long requesterId, Long receiverId);
}
