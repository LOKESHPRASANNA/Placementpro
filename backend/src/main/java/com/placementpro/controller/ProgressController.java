package com.placementpro.controller;

import com.placementpro.dto.ProgressDto;
import com.placementpro.entity.User;
import com.placementpro.service.ProgressService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public ResponseEntity<List<ProgressDto>> getProgressHistory(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(progressService.getProgressHistory(user));
    }

    @GetMapping("/daily")
    public ResponseEntity<ProgressDto> getDailyProgress(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        
        if (date == null) {
            date = LocalDate.now();
        }
        return ResponseEntity.ok(progressService.getOrCreateDailyProgress(user, date));
    }

    @PostMapping("/pomodoro")
    public ResponseEntity<ProgressDto> recordPomodoro(
            @AuthenticationPrincipal User user,
            @RequestBody(required = false) Map<String, String> request) {
        
        LocalDate date = LocalDate.now();
        if (request != null && request.containsKey("date")) {
            date = LocalDate.parse(request.get("date"));
        }
        return ResponseEntity.ok(progressService.recordPomodoro(user, date));
    }
}
