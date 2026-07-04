package com.placementpro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProgressDto {
    private Long id;
    private LocalDate trackerDate;
    private Integer pomodorosCompleted;
    private Integer interviewsTaken;
}
