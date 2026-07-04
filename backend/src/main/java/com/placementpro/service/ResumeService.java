package com.placementpro.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.placementpro.dto.ResumeDto;
import com.placementpro.entity.Analytics;
import com.placementpro.entity.Resume;
import com.placementpro.entity.User;
import com.placementpro.repository.AnalyticsRepository;
import com.placementpro.repository.ResumeRepository;
import com.placementpro.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final AnalyticsRepository analyticsRepository;
    private final GeminiAiService geminiAiService;
    private final ResumeParserService resumeParserService;
    private final ObjectMapper objectMapper;

    public ResumeService(ResumeRepository resumeRepository,
                         UserRepository userRepository,
                         AnalyticsRepository analyticsRepository,
                         GeminiAiService geminiAiService,
                         ResumeParserService resumeParserService) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.analyticsRepository = analyticsRepository;
        this.geminiAiService = geminiAiService;
        this.resumeParserService = resumeParserService;
        this.objectMapper = new ObjectMapper();
    }

    public List<ResumeDto> getResumes(User user) {
        return resumeRepository.findByUserOrderByAnalyzedAtDesc(user).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ResumeDto analyzeResume(User user, org.springframework.web.multipart.MultipartFile file, String targetRole) {
        try {
            String resumeText = resumeParserService.extractText(file);
            return analyzeResumeText(user, resumeText, targetRole);
        } catch (java.io.IOException e) {
            throw new RuntimeException("Failed to read and parse resume file: " + e.getMessage(), e);
        }
    }

    @Transactional
    public ResumeDto analyzeResumeText(User user, String resumeText, String targetRole) {
        String finalRole = targetRole != null && !targetRole.isEmpty() ? targetRole : user.getTargetGoal();

        String prompt = "You are an expert ATS (Applicant Tracking System) scanner and career coach. " +
                "Analyze the candidate's resume content for the target role: " + finalRole + ".\n" +
                "Evaluate the text, calculate a score (0-100), identify technical skills, soft skills, missing skills, grammar quality, improvement suggestions, and a professional summary.\n\n" +
                "Resume Text:\n" + resumeText + "\n\n" +
                "Respond STRICTLY in valid JSON format matching this schema:\n" +
                "{\n" +
                "  \"atsScore\": 85,\n" +
                "  \"technicalSkills\": [\"Java\", \"SQL\"],\n" +
                "  \"softSkills\": [\"Leadership\", \"Problem Solving\"],\n" +
                "  \"missingSkills\": [\"Docker\", \"Kubernetes\"],\n" +
                "  \"grammar\": \"Good grammar, but consider active verbs in project descriptions.\",\n" +
                "  \"improvementSuggestions\": [\"Add docker credentials\", \"Enhance project details\"],\n" +
                "  \"summary\": \"Aspiring software development engineer with hands-on java projects.\"\n" +
                "}\n" +
                "Do not add any markdown backticks (like ```json) or leading/trailing comments. Return only raw JSON.";

        String aiResponse = geminiAiService.generateContent(prompt);
        
        // Clean JSON response
        if (aiResponse.contains("```")) {
            aiResponse = aiResponse.replaceAll("```json", "").replaceAll("```", "").trim();
        }

        int score = 70;
        String techSkillsStr = "";
        String softSkillsStr = "";
        String missingStr = "";
        String suggestionsStr = "";
        String grammarStr = "";
        String summaryStr = "";

        try {
            JsonNode root = objectMapper.readTree(aiResponse);
            score = root.path("atsScore").asInt(70);
            
            JsonNode techNode = root.path("technicalSkills");
            if (techNode.isArray()) {
                techSkillsStr = objectMapper.writeValueAsString(techNode);
            }
            
            JsonNode softNode = root.path("softSkills");
            if (softNode.isArray()) {
                softSkillsStr = objectMapper.writeValueAsString(softNode);
            }

            JsonNode missingNode = root.path("missingSkills");
            if (missingNode.isArray()) {
                missingStr = objectMapper.writeValueAsString(missingNode);
            }

            JsonNode sugNode = root.path("improvementSuggestions");
            if (sugNode.isArray()) {
                suggestionsStr = objectMapper.writeValueAsString(sugNode);
            } else {
                suggestionsStr = sugNode.asText();
            }

            grammarStr = root.path("grammar").asText("Checked.");
            summaryStr = root.path("summary").asText("");
        } catch (Exception e) {
            grammarStr = "Error parsing detailed report.";
            suggestionsStr = aiResponse;
        }

        // Save Resume
        Resume resume = Resume.builder()
                .user(user)
                .resumeText(resumeText)
                .atsScore(score)
                .keywordsFound(techSkillsStr)
                .keywordsMissing(missingStr)
                .suggestions(suggestionsStr)
                .grammar(grammarStr)
                .softSkills(softSkillsStr)
                .summary(summaryStr)
                .build();
        
        Resume savedResume = resumeRepository.save(resume);

        // Update User Profile Resume Score
        user.setResumeScore(score);
        userRepository.save(user);

        // Update Analytics
        Analytics analytics = analyticsRepository.findByUser(user)
                .orElse(Analytics.builder().user(user).build());
        analytics.setResumeScore(score);
        analyticsRepository.save(analytics);

        return toDto(savedResume);
    }

    private ResumeDto toDto(Resume resume) {
        return ResumeDto.builder()
                .id(resume.getId())
                .resumeText(resume.getResumeText())
                .atsScore(resume.getAtsScore())
                .keywordsFound(resume.getKeywordsFound())
                .keywordsMissing(resume.getKeywordsMissing())
                .suggestions(resume.getSuggestions())
                .grammar(resume.getGrammar())
                .softSkills(resume.getSoftSkills())
                .summary(resume.getSummary())
                .analyzedAt(resume.getAnalyzedAt())
                .build();
    }
}
