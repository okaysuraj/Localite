package com.localite.backend.repository;

import com.localite.backend.model.DirectMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DirectMessageRepository extends JpaRepository<DirectMessage, Long> {
    
    @Query("SELECT dm FROM DirectMessage dm WHERE (dm.sender.id = :userId1 AND dm.receiver.id = :userId2) OR (dm.sender.id = :userId2 AND dm.receiver.id = :userId1) ORDER BY dm.sentAt ASC")
    List<DirectMessage> findConversation(Long userId1, Long userId2);
}
