package com.placementpro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnalyticsDto {
    private Integer totalInterviews;
    private Double avgInterviewScore;
    private Integer resumeScore;
    private Integer tasksCompleted;
    private Integer totalTasks;
    private Integer pomodorosCompleted;
    private LocalDateTime lastUpdated;
}
