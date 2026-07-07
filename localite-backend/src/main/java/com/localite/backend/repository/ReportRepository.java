package com.localite.backend.repository;

import com.localite.backend.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByReporterId(Long reporterId);
    List<Report> findByTargetTypeAndTargetId(String targetType, Long targetId);
    List<Report> findByStatus(String status);
}
