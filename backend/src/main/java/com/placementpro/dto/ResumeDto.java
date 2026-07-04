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
public class ResumeDto {
    private Long id;
    private String resumeText;
    private Integer atsScore;
    private String keywordsFound;
    private String keywordsMissing;
    private String suggestions;
    private String grammar;
    private String softSkills;
    private String summary;
    private LocalDateTime analyzedAt;
}
