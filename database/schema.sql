-- MySQL 8.0 Database Schema for PlacementPro AI

CREATE DATABASE IF NOT EXISTS placementpro;
USE placementpro;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(150) NOT NULL,
    major VARCHAR(150),
    target_goal VARCHAR(150) DEFAULT 'Software Development Engineer (SDE)',
    pomo_goal INT DEFAULT 4,
    completed_pomodoros INT DEFAULT 0,
    resume_score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Chat History Table (AI Chat Assistant Memory)
CREATE TABLE IF NOT EXISTS chat_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    sender VARCHAR(10) NOT NULL, -- 'USER' or 'AI'
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_chat_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Resume Table (ATS Scanner results)
CREATE TABLE IF NOT EXISTS resume (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    resume_text LONGTEXT NOT NULL,
    ats_score INT NOT NULL DEFAULT 0,
    keywords_found TEXT,
    keywords_missing TEXT,
    suggestions TEXT,
    grammar TEXT,
    soft_skills TEXT,
    summary TEXT,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_resume_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Placement Roadmaps Table (AI Generated Roadmaps)
CREATE TABLE IF NOT EXISTS roadmap (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    company VARCHAR(100) NOT NULL,
    details LONGTEXT NOT NULL, -- JSON or Markdown formatted roadmap steps
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_roadmap_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Tasks Table (Daily Pomodoro Planner Checklist)
CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Daily Progress Metrics Table
CREATE TABLE IF NOT EXISTS progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    tracker_date DATE NOT NULL,
    pomodoros_completed INT DEFAULT 0,
    interviews_taken INT DEFAULT 0,
    UNIQUE KEY uq_user_date (user_id, tracker_date),
    CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. Mock Interviews Table
CREATE TABLE IF NOT EXISTS mock_interviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    role VARCHAR(100) NOT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    overall_score INT DEFAULT 0,
    CONSTRAINT fk_mock_interviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 8. Interview Turn-by-turn Feedback Table
CREATE TABLE IF NOT EXISTS mock_interview_feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    interview_id BIGINT NOT NULL,
    question TEXT NOT NULL,
    user_answer TEXT,
    ideal_answer TEXT,
    technical_score INT DEFAULT 0,
    communication_score INT DEFAULT 0,
    confidence_score INT DEFAULT 0,
    grammar_score INT DEFAULT 0,
    assessment TEXT,
    CONSTRAINT fk_feedback_interview FOREIGN KEY (interview_id) REFERENCES mock_interviews(id) ON DELETE CASCADE
);

-- 9. Aggregated Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_interviews INT DEFAULT 0,
    avg_interview_score DOUBLE DEFAULT 0.0,
    resume_score INT DEFAULT 0,
    tasks_completed INT DEFAULT 0,
    total_tasks INT DEFAULT 0,
    pomodoros_completed INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_analytics_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
