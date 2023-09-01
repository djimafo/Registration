package com.djmcode.backendregistration.email;

import org.springframework.stereotype.Service;

@Service
public interface EmailSender
{
  void sendEmailConfirmation(String sendTo, String emailBody, String subject,String link);
  void sendEmail(String sendTo, String emailBody, String subject, String attachment);
}
