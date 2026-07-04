package com.placementpro.repository;

import com.placementpro.entity.InterviewFeedback;
import com.placementpro.entity.MockInterview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewFeedbackRepository extends JpaRepository<InterviewFeedback, Long> {
    List<InterviewFeedback> findByInterviewOrderByIdAsc(MockInterview interview);
}
