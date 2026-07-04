package com.placementpro.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "progress", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "tracker_date"})})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "tracker_date", nullable = false)
    private LocalDate trackerDate;

    @Column(name = "pomodoros_completed")
    @Builder.Default
    private Integer pomodorosCompleted = 0;

    @Column(name = "interviews_taken")
    @Builder.Default
    private Integer interviewsTaken = 0;
}
