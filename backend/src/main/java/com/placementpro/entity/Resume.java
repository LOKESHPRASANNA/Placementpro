package com.placementpro.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resume")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "resume_text", nullable = false, columnDefinition = "LONGTEXT")
    private String resumeText;

    @Column(name = "ats_score", nullable = false)
    @Builder.Default
    private Integer atsScore = 0;

    @Column(name = "keywords_found", columnDefinition = "TEXT")
    private String keywordsFound;

    @Column(name = "keywords_missing", columnDefinition = "TEXT")
    private String keywordsMissing;

    @Column(columnDefinition = "TEXT")
    private String suggestions;

    @Column(columnDefinition = "TEXT")
    private String grammar;

    @Column(name = "soft_skills", columnDefinition = "TEXT")
    private String softSkills;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(name = "analyzed_at", insertable = false, updatable = false)
    private LocalDateTime analyzedAt;
}
