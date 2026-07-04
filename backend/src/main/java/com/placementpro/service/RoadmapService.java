package com.placementpro.service;

import com.placementpro.dto.RoadmapDto;
import com.placementpro.entity.Roadmap;
import com.placementpro.entity.User;
import com.placementpro.repository.RoadmapRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoadmapService {

    private final RoadmapRepository roadmapRepository;
    private final GeminiAiService geminiAiService;

    public RoadmapService(RoadmapRepository roadmapRepository, GeminiAiService geminiAiService) {
        this.roadmapRepository = roadmapRepository;
        this.geminiAiService = geminiAiService;
    }

    public List<RoadmapDto> getRoadmaps(User user) {
        return roadmapRepository.findByUserOrderByGeneratedAtDesc(user).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public RoadmapDto generateRoadmap(User user, String company) {
        String finalCompany = (company == null || company.trim().isEmpty()) ? "Tier 1 Tech Companies" : company;

        String prompt = "You are an elite placement coordinator. Generate a highly structured career placement roadmap for a student aiming for a role at '" + finalCompany + "'.\n" +
                "Their target role is: " + user.getTargetGoal() + ".\n" +
                "Major: " + user.getMajor() + ".\n" +
                "Structure the response with detailed weekly milestones, core technical topics to master, DSA recommendations, sample interview questions, and useful preparation checklists.\n" +
                "Use Markdown headings, bullets, and tables for an extremely professional visual layout.";

        String detailsText = geminiAiService.generateContent(prompt);

        Roadmap roadmap = Roadmap.builder()
                .user(user)
                .company(finalCompany)
                .details(detailsText)
                .build();

        Roadmap savedRoadmap = roadmapRepository.save(roadmap);
        return toDto(savedRoadmap);
    }

    private RoadmapDto toDto(Roadmap roadmap) {
        return RoadmapDto.builder()
                .id(roadmap.getId())
                .company(roadmap.getCompany())
                .details(roadmap.getDetails())
                .generatedAt(roadmap.getGeneratedAt())
                .build();
    }
}
