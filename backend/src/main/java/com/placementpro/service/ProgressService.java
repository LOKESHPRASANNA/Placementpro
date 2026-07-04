package com.placementpro.service;

import com.placementpro.dto.ProgressDto;
import com.placementpro.entity.Analytics;
import com.placementpro.entity.Progress;
import com.placementpro.entity.User;
import com.placementpro.repository.AnalyticsRepository;
import com.placementpro.repository.ProgressRepository;
import com.placementpro.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final AnalyticsRepository analyticsRepository;

    public ProgressService(ProgressRepository progressRepository,
                           UserRepository userRepository,
                           AnalyticsRepository analyticsRepository) {
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
        this.analyticsRepository = analyticsRepository;
    }

    public List<ProgressDto> getProgressHistory(User user) {
        return progressRepository.findByUserOrderByTrackerDateAsc(user).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public ProgressDto getOrCreateDailyProgress(User user, LocalDate date) {
        Progress progress = progressRepository.findByUserAndTrackerDate(user, date)
                .orElseGet(() -> {
                    Progress p = Progress.builder()
                            .user(user)
                            .trackerDate(date)
                            .pomodorosCompleted(0)
                            .interviewsTaken(0)
                            .build();
                    return progressRepository.save(p);
                });
        return toDto(progress);
    }

    @Transactional
    public ProgressDto recordPomodoro(User user, LocalDate date) {
        Progress progress = progressRepository.findByUserAndTrackerDate(user, date)
                .orElseGet(() -> Progress.builder()
                        .user(user)
                        .trackerDate(date)
                        .pomodorosCompleted(0)
                        .interviewsTaken(0)
                        .build());

        progress.setPomodorosCompleted(progress.getPomodorosCompleted() + 1);
        Progress saved = progressRepository.save(progress);

        // Update User Profile Total Completed
        user.setCompletedPomodoros(user.getCompletedPomodoros() + 1);
        userRepository.save(user);

        // Update Analytics
        Analytics analytics = analyticsRepository.findByUser(user)
                .orElse(Analytics.builder().user(user).build());
        analytics.setPomodorosCompleted(user.getCompletedPomodoros());
        analyticsRepository.save(analytics);

        return toDto(saved);
    }

    private ProgressDto toDto(Progress p) {
        return ProgressDto.builder()
                .id(p.getId())
                .trackerDate(p.getTrackerDate())
                .pomodorosCompleted(p.getPomodorosCompleted())
                .interviewsTaken(p.getInterviewsTaken())
                .build();
    }
}
