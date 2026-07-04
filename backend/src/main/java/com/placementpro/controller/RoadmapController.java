package com.placementpro.controller;

import com.placementpro.dto.RoadmapDto;
import com.placementpro.entity.User;
import com.placementpro.service.RoadmapService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/roadmap")
public class RoadmapController {

    private final RoadmapService roadmapService;

    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @GetMapping
    public ResponseEntity<List<RoadmapDto>> getRoadmaps(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(roadmapService.getRoadmaps(user));
    }

    @PostMapping("/generate")
    public ResponseEntity<RoadmapDto> generateRoadmap(@AuthenticationPrincipal User user, @RequestBody Map<String, String> request) {
        String company = request.get("company");
        return ResponseEntity.ok(roadmapService.generateRoadmap(user, company));
    }
}
