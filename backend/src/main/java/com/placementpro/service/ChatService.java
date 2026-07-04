package com.placementpro.service;

import com.placementpro.dto.ChatMessageDto;
import com.placementpro.entity.ChatMessage;
import com.placementpro.entity.User;
import com.placementpro.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final GeminiAiService geminiAiService;

    public ChatService(ChatMessageRepository chatMessageRepository, GeminiAiService geminiAiService) {
        this.chatMessageRepository = chatMessageRepository;
        this.geminiAiService = geminiAiService;
    }

    public List<ChatMessageDto> getChatHistory(User user) {
        return chatMessageRepository.findByUserOrderByTimestampAsc(user).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ChatMessageDto sendMessage(User user, String messageContent) {
        // Save User Message
        ChatMessage userMessage = ChatMessage.builder()
                .user(user)
                .sender("USER")
                .message(messageContent)
                .build();
        chatMessageRepository.save(userMessage);

        // Fetch recent messages to provide simple context if needed (last 10 messages)
        List<ChatMessage> history = chatMessageRepository.findByUserOrderByTimestampAsc(user);
        StringBuilder promptBuilder = new StringBuilder();
        promptBuilder.append("You are an elite Placement Preparation AI assistant. You help students prepare for interviews, resume reviews, study schedules, and coding challenges.\n\n");
        promptBuilder.append("Here is the conversation history:\n");
        
        int startIdx = Math.max(0, history.size() - 11); // Last 10 before current
        for (int i = startIdx; i < history.size() - 1; i++) {
            ChatMessage msg = history.get(i);
            promptBuilder.append(msg.getSender()).append(": ").append(msg.getMessage()).append("\n");
        }
        promptBuilder.append("USER: ").append(messageContent).append("\n");
        promptBuilder.append("AI: ");

        // Call Gemini AI
        String aiResponseText = geminiAiService.generateContent(promptBuilder.toString());

        // Save AI Message
        ChatMessage aiMessage = ChatMessage.builder()
                .user(user)
                .sender("AI")
                .message(aiResponseText)
                .build();
        ChatMessage savedAiMessage = chatMessageRepository.save(aiMessage);

        return toDto(savedAiMessage);
    }

    private ChatMessageDto toDto(ChatMessage message) {
        return ChatMessageDto.builder()
                .id(message.getId())
                .sender(message.getSender())
                .message(message.getMessage())
                .timestamp(message.getTimestamp())
                .build();
    }
}
