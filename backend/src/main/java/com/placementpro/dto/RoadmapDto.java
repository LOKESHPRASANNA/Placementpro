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
public class RoadmapDto {
    private Long id;
    private String company;
    private String details;
    private LocalDateTime generatedAt;
}
