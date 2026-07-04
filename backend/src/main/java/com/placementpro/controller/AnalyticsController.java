package com.placementpro.controller;

import com.placementpro.dto.AnalyticsDto;
import com.placementpro.entity.Analytics;
import com.placementpro.entity.User;
import com.placementpro.repository.AnalyticsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsRepository analyticsRepository;

    public AnalyticsController(AnalyticsRepository analyticsRepository) {
        this.analyticsRepository = analyticsRepository;
    }

    @GetMapping
    public ResponseEntity<AnalyticsDto> getAnalytics(@AuthenticationPrincipal User user) {
        Analytics analytics = analyticsRepository.findByUser(user)
                .orElse(Analytics.builder().user(user).build());
        
        AnalyticsDto dto = AnalyticsDto.builder()
                .totalInterviews(analytics.getTotalInterviews())
                .avgInterviewScore(analytics.getAvgInterviewScore())
                .resumeScore(analytics.getResumeScore())
                .tasksCompleted(analytics.getTasksCompleted())
                .totalTasks(analytics.getTotalTasks())
                .pomodorosCompleted(analytics.getPomodorosCompleted())
                .lastUpdated(analytics.getLastUpdated())
                .build();
                
        return ResponseEntity.ok(dto);
    }
}
