package com.placementpro.repository;

import com.placementpro.entity.MockInterview;
import com.placementpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MockInterviewRepository extends JpaRepository<MockInterview, Long> {
    List<MockInterview> findByUserOrderByStartedAtDesc(User user);
}
