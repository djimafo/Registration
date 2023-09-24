package com.djmcode.backendregistration.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Autorise les requêtes depuis ce domaine
public class ChatController
{
  private final SimpMessageSendingOperations messageTemplate;
  @MessageMapping("/message")
  @SendTo("/topic/public")
  public ChatMessage sendMessageChat(@Payload ChatMessage message)
  {
    return message;
  }
  @MessageMapping("/private-sendMessage")
  public ChatMessage sendMessagePraviteChat(@Payload ChatMessage message)
  {
    messageTemplate.convertAndSendToUser(message.getReceiver(),"/private",message); // /user/jerry/private
    return message;
  }
  @MessageMapping("/chat.addUser")
  @SendTo("/topic/public")
  public ChatMessage addUser(@Payload ChatMessage message, SimpMessageHeaderAccessor headerAccessor)
  {
    // Add username in Web Socket session
    headerAccessor.getSessionAttributes().put("username", message.getSender());
    return message;
  }

}
