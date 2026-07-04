package com.placementpro.repository;

import com.placementpro.entity.Resume;
import com.placementpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByUserOrderByAnalyzedAtDesc(User user);
    Optional<Resume> findFirstByUserOrderByAnalyzedAtDesc(User user);
}
