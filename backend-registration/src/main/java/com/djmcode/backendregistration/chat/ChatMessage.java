package com.djmcode.backendregistration.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage
{
  private String messageContent;
  private String sender;
  private String receiver;
  private MessageType messageType;
}
