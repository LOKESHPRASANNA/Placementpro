package com.placementpro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MockInterviewDto {
    private Long id;
    private String role;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private Integer overallScore;
    private List<InterviewFeedbackDto> feedbackList;
}
