package com.placementpro.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "analytics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Analytics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "total_interviews")
    @Builder.Default
    private Integer totalInterviews = 0;

    @Column(name = "avg_interview_score")
    @Builder.Default
    private Double avgInterviewScore = 0.0;

    @Column(name = "resume_score")
    @Builder.Default
    private Integer resumeScore = 0;

    @Column(name = "tasks_completed")
    @Builder.Default
    private Integer tasksCompleted = 0;

    @Column(name = "total_tasks")
    @Builder.Default
    private Integer totalTasks = 0;

    @Column(name = "pomodoros_completed")
    @Builder.Default
    private Integer pomodorosCompleted = 0;

    @Column(name = "last_updated", insertable = false, updatable = false)
    private LocalDateTime lastUpdated;
}
