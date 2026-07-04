package com.placementpro.controller;

import com.placementpro.dto.MockInterviewDto;
import com.placementpro.entity.MockInterview;
import com.placementpro.entity.User;
import com.placementpro.repository.MockInterviewRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/mock-interview")
public class MockInterviewController {

    private final MockInterviewRepository mockInterviewRepository;

    public MockInterviewController(MockInterviewRepository mockInterviewRepository) {
        this.mockInterviewRepository = mockInterviewRepository;
    }

    @GetMapping
    public ResponseEntity<List<MockInterviewDto>> getMockInterviews(@AuthenticationPrincipal User user) {
        List<MockInterviewDto> dtos = mockInterviewRepository.findByUserOrderByStartedAtDesc(user).stream()
                .map(mi -> MockInterviewDto.builder()
                        .id(mi.getId())
                        .role(mi.getRole())
                        .startedAt(mi.getStartedAt())
                        .completedAt(mi.getCompletedAt())
                        .overallScore(mi.getOverallScore())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}
