package com.djmcode.backendregistration.email;

import org.springframework.stereotype.Service;

@Service
public interface EmailSender
{
  void sendEmail(String sendTo, String emailBody, String subject);
  void sendEmail(String sendTo, String emailBody, String subject, String attachment);
}
