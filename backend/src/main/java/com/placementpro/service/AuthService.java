package com.placementpro.service;

import com.placementpro.dto.AuthRequest;
import com.placementpro.dto.AuthResponse;
import com.placementpro.dto.RegisterRequest;
import com.placementpro.entity.Analytics;
import com.placementpro.entity.User;
import com.placementpro.exception.ApiException;
import com.placementpro.repository.AnalyticsRepository;
import com.placementpro.repository.UserRepository;
import com.placementpro.security.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AnalyticsRepository analyticsRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository,
                       AnalyticsRepository analyticsRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.analyticsRepository = analyticsRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional
    public User register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new ApiException("Username is already taken", HttpStatus.BAD_REQUEST);
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .major(request.getMajor())
                .targetGoal(request.getTargetGoal() != null ? request.getTargetGoal() : "Software Development Engineer (SDE)")
                .pomoGoal(4)
                .completedPomodoros(0)
                .resumeScore(0)
                .build();

        User savedUser = userRepository.save(user);

        // Initialize user analytics row
        Analytics analytics = Analytics.builder()
                .user(savedUser)
                .totalInterviews(0)
                .avgInterviewScore(0.0)
                .resumeScore(0)
                .tasksCompleted(0)
                .totalTasks(0)
                .pomodorosCompleted(0)
                .build();
        analyticsRepository.save(analytics);

        return savedUser;
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ApiException("Invalid username or password", HttpStatus.UNAUTHORIZED));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ApiException("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }

        String token = jwtTokenProvider.generateToken(user.getUsername());
        return new AuthResponse(token, user.getUsername(), user.getName());
    }
}
