package com.placementpro.controller;

import com.placementpro.dto.ResumeDto;
import com.placementpro.entity.User;
import com.placementpro.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public ResponseEntity<List<ResumeDto>> getResumes(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(resumeService.getResumes(user));
    }

    @PostMapping(value = "/analyze", consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResumeDto> analyzeResume(
            @AuthenticationPrincipal User user,
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file,
            @RequestParam(value = "targetRole", required = false) String targetRole) {
        return ResponseEntity.ok(resumeService.analyzeResume(user, file, targetRole));
    }
}
