package com.placementpro.controller;

import com.placementpro.dto.ChatMessageDto;
import com.placementpro.entity.User;
import com.placementpro.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping
    public ResponseEntity<List<ChatMessageDto>> getChatHistory(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(chatService.getChatHistory(user));
    }

    @PostMapping
    public ResponseEntity<ChatMessageDto> sendMessage(@AuthenticationPrincipal User user, @RequestBody Map<String, String> request) {
        String message = request.get("message");
        return ResponseEntity.ok(chatService.sendMessage(user, message));
    }
}
