package com.placementpro.service;

import com.placementpro.dto.TaskDto;
import com.placementpro.entity.Analytics;
import com.placementpro.entity.Task;
import com.placementpro.entity.User;
import com.placementpro.exception.ResourceNotFoundException;
import com.placementpro.repository.AnalyticsRepository;
import com.placementpro.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final AnalyticsRepository analyticsRepository;

    public TaskService(TaskRepository taskRepository, AnalyticsRepository analyticsRepository) {
        this.taskRepository = taskRepository;
        this.analyticsRepository = analyticsRepository;
    }

    public List<TaskDto> getTasks(User user) {
        return taskRepository.findByUserOrderByCreatedAtAsc(user).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public TaskDto createTask(User user, String title) {
        Task task = Task.builder()
                .user(user)
                .title(title)
                .completed(false)
                .build();
        Task savedTask = taskRepository.save(task);

        updateAnalytics(user);
        return toDto(savedTask);
    }

    @Transactional
    public TaskDto toggleTask(User user, Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Task not found for this user");
        }

        task.setCompleted(!task.getCompleted());
        Task updated = taskRepository.save(task);

        updateAnalytics(user);
        return toDto(updated);
    }

    @Transactional
    public void deleteTask(User user, Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Task not found for this user");
        }

        taskRepository.delete(task);
        updateAnalytics(user);
    }

    private void updateAnalytics(User user) {
        long total = taskRepository.countByUser(user);
        long completed = taskRepository.countByUserAndCompletedTrue(user);

        Analytics analytics = analyticsRepository.findByUser(user)
                .orElse(Analytics.builder().user(user).build());
        analytics.setTotalTasks((int) total);
        analytics.setTasksCompleted((int) completed);
        analyticsRepository.save(analytics);
    }

    private TaskDto toDto(Task task) {
        return TaskDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .completed(task.getCompleted())
                .createdAt(task.getCreatedAt())
                .build();
    }
}
