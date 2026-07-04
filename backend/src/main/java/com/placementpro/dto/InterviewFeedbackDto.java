package com.placementpro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InterviewFeedbackDto {
    private Long id;
    private String question;
    private String userAnswer;
    private String idealAnswer;
    private Integer technicalScore;
    private Integer communicationScore;
    private Integer confidenceScore;
    private Integer grammarScore;
    private String assessment;
}
