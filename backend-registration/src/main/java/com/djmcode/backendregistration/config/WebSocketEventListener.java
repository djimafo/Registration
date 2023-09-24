package com.djmcode.backendregistration.config;

import com.djmcode.backendregistration.chat.ChatMessage;
import com.djmcode.backendregistration.chat.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import static com.djmcode.backendregistration.chat.MessageType.LEAVE;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener
{
  private final SimpMessageSendingOperations messageTemplate;
  @EventListener
  public void handlerWebSocketDisconnectListener(
          SessionDisconnectEvent event)
  {
    //TODO
    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
    String username = (String) headerAccessor.getSessionAttributes().get("username");
    if (username != null)
    {
      log.info("User disconnected: {}", username);
      var message = ChatMessage.builder()
                               .messageType(LEAVE)
                               .sender(username)
                               .build();
      messageTemplate.convertAndSend("/topic/public",message);
    }
  }
}
