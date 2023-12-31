package com.djmcode.backendregistration.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
//@CrossOrigin(origins = "http://localhost:5173")
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer
{
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry)
  {
    registry.addEndpoint("/ws").setAllowedOriginPatterns("http://localhost:5173/").withSockJS();
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry)
  {
    registry.setApplicationDestinationPrefixes("/app");
    registry.enableSimpleBroker("/topic","/user");
    registry.setUserDestinationPrefix("/user");
  }
}
