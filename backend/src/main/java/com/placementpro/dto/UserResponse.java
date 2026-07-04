package com.placementpro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String name;
    private String major;
    private String targetGoal;
    private Integer pomoGoal;
    private Integer completedPomodoros;
    private Integer resumeScore;
}
