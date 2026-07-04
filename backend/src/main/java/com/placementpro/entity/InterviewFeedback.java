package com.placementpro.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mock_interview_feedback")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interview_id", nullable = false)
    private MockInterview interview;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(name = "user_answer", columnDefinition = "TEXT")
    private String userAnswer;

    @Column(name = "ideal_answer", columnDefinition = "TEXT")
    private String idealAnswer;

    @Column(name = "technical_score")
    @Builder.Default
    private Integer technicalScore = 0;

    @Column(name = "communication_score")
    @Builder.Default
    private Integer communicationScore = 0;

    @Column(name = "confidence_score")
    @Builder.Default
    private Integer confidenceScore = 0;

    @Column(name = "grammar_score")
    @Builder.Default
    private Integer grammarScore = 0;

    @Column(columnDefinition = "TEXT")
    private String assessment;
}
