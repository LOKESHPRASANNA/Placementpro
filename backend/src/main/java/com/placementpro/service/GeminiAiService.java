package com.placementpro.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GeminiAiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GeminiAiService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public String generateContent(String prompt) {
        if ("mock-key-for-testing".equals(apiKey) || apiKey == null || apiKey.isEmpty()) {
            return getMockResponse(prompt);
        }

        try {
            String url = apiUrl + "?key=" + apiKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Construct JSON request body
            Map<String, Object> part = new HashMap<>();
            part.put("text", prompt);

            Map<String, Object> contentNode = new HashMap<>();
            contentNode.put("parts", Collections.singletonList(part));

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", Collections.singletonList(contentNode));

            String jsonRequest = objectMapper.writeValueAsString(requestBody);

            HttpEntity<String> entity = new HttpEntity<>(jsonRequest, headers);
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, entity, String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful() && responseEntity.getBody() != null) {
                JsonNode root = objectMapper.readTree(responseEntity.getBody());
                JsonNode candidates = root.path("candidates");
                if (candidates.isArray() && !candidates.isEmpty()) {
                    JsonNode parts = candidates.get(0).path("content").path("parts");
                    if (parts.isArray() && !parts.isEmpty()) {
                        return parts.get(0).path("text").asText();
                    }
                }
            }
            return "Unable to parse AI response. Status: " + responseEntity.getStatusCode();
        } catch (Exception e) {
            // Log warning and fallback to a mock response/error explanation
            return "AI Service Error: " + e.getMessage() + "\n\nFallback explanation: Please verify your GEMINI_API_KEY environment variable. Returning mock response for demonstration:\n" + getMockResponse(prompt);
        }
    }

    private String getMockResponse(String prompt) {
        String lower = prompt.toLowerCase();
        int lastUserIndex = lower.lastIndexOf("user:");
        if (lastUserIndex != -1) {
            lower = lower.substring(lastUserIndex);
        }
        if (lower.contains("resume") || lower.contains("ats")) {
            return "{\n" +
                    "  \"atsScore\": 78,\n" +
                    "  \"keywordsFound\": [\"Java\", \"Spring Boot\", \"REST APIs\", \"Git\"],\n" +
                    "  \"keywordsMissing\": [\"Docker\", \"Kubernetes\", \"CI/CD\", \"Cloud Platforms\"],\n" +
                    "  \"suggestions\": [\n" +
                    "    \"Include quantitative impact in your projects (e.g., 'improved performance by 25%').\",\n" +
                    "    \"Add keywords related to containers and orchestration, like Docker and Kubernetes.\",\n" +
                    "    \"Ensure your contact info is clean and includes a LinkedIn link.\"\n" +
                    "  ]\n" +
                    "}";
        } else if (lower.contains("roadmap")) {
            return "# Placement Roadmap for Target Role\n\n" +
                    "## Milestone 1: Core Fundamentals (Weeks 1-2)\n" +
                    "- Solidify Object-Oriented Programming (OOP) in Java.\n" +
                    "- Practice basic DSA (Arrays, Linked Lists, HashMaps).\n\n" +
                    "## Milestone 2: Spring Boot Mastery (Weeks 3-4)\n" +
                    "- Understand Dependency Injection, Spring MVC, and REST controllers.\n" +
                    "- Integrate Spring Boot with MySQL using Spring Data JPA.\n\n" +
                    "## Milestone 3: System Design & Deployments (Weeks 5-6)\n" +
                    "- Learn Microservices architectural concepts.\n" +
                    "- Containerize application using Docker.\n\n" +
                    "## Milestone 4: Mocking and Preparation (Weeks 7-8)\n" +
                    "- Complete mock interviews.\n" +
                    "- Revise projects and prepare resume.";
        } else if (lower.contains("interview") || lower.contains("question")) {
            if (lower.contains("evaluate") || lower.contains("answer")) {
                return "{\n" +
                        "  \"idealAnswer\": \"A good explanation of REST defines it as Representational State Transfer, highlighting statelessness, client-server separation, uniform interface, cacheability, and layered system structures.\",\n" +
                        "  \"technicalScore\": 82,\n" +
                        "  \"communicationScore\": 78,\n" +
                        "  \"confidenceScore\": 80,\n" +
                        "  \"grammarScore\": 90,\n" +
                        "  \"assessment\": \"The candidate explained statelessness well but forgot to mention caching mechanisms and HTTP response codes. Overall solid foundation, but could be more structured.\"\n" +
                        "}";
            }
            return "What is the difference between a process and a thread, and how does Java support multithreading?";
        } else if (lower.contains("coding") || lower.contains("mentor")) {
            return "### Code Analysis\n" +
                    "- **Time Complexity:** O(N) where N is the length of the input array.\n" +
                    "- **Space Complexity:** O(1) auxiliary space.\n\n" +
                    "### Recommendations\n" +
                    "1. Your logic is clean, but ensure you handle null or empty array inputs.\n" +
                    "2. Consider using standard library methods if performance allows, or stick to this optimized loop.";
        } else {
            return "Hello! I am your PlacementPro AI mentor. I can analyze your resume, generate custom career roadmaps, test you with mock interviews, and assist with coding challenges. What would you like to prepare today?";
        }
    }
}
