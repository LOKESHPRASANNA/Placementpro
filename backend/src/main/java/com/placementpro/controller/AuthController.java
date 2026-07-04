package com.placementpro.controller;

import com.placementpro.dto.AuthRequest;
import com.placementpro.dto.AuthResponse;
import com.placementpro.dto.RegisterRequest;
import com.placementpro.dto.UserResponse;
import com.placementpro.entity.User;
import com.placementpro.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest request) {
        User user = authService.register(request);
        UserResponse response = UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getName())
                .major(user.getMajor())
                .targetGoal(user.getTargetGoal())
                .pomoGoal(user.getPomoGoal())
                .completedPomodoros(user.getCompletedPomodoros())
                .resumeScore(user.getResumeScore())
                .build();
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
    
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        UserResponse response = UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getName())
                .major(user.getMajor())
                .targetGoal(user.getTargetGoal())
                .pomoGoal(user.getPomoGoal())
                .completedPomodoros(user.getCompletedPomodoros())
                .resumeScore(user.getResumeScore())
                .build();
        return ResponseEntity.ok(response);
    }
}
