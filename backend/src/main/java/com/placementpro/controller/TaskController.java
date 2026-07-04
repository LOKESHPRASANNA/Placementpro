package com.placementpro.controller;

import com.placementpro.dto.TaskDto;
import com.placementpro.entity.User;
import com.placementpro.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getTasks(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(taskService.getTasks(user));
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@AuthenticationPrincipal User user, @RequestBody Map<String, String> request) {
        String title = request.get("title");
        return ResponseEntity.ok(taskService.createTask(user, title));
    }

    @PutMapping("/{taskId}/toggle")
    public ResponseEntity<TaskDto> toggleTask(@AuthenticationPrincipal User user, @PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.toggleTask(user, taskId));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@AuthenticationPrincipal User user, @PathVariable Long taskId) {
        taskService.deleteTask(user, taskId);
        return ResponseEntity.ok().build();
    }
}
