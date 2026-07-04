package com.placementpro.repository;

import com.placementpro.entity.Progress;
import com.placementpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
    Optional<Progress> findByUserAndTrackerDate(User user, LocalDate date);
    List<Progress> findByUserAndTrackerDateBetweenOrderByTrackerDateAsc(User user, LocalDate start, LocalDate end);
    List<Progress> findByUserOrderByTrackerDateAsc(User user);
}
