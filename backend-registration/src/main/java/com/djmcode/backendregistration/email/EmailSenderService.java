package com.djmcode.backendregistration.email;

import java.io.File;
import java.util.Objects;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailSenderService implements EmailSender
{
  private JavaMailSender mailSender;
  private final static Logger LOGGER = LoggerFactory.getLogger(EmailSenderService.class);

  @Override
  @Async
  public void sendEmail(String toEmail, String emailBody, String subject)
  {
    try
    {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
      helper.setText(toEmail, true);
      helper.setTo(toEmail);
      helper.setSubject(subject);
      helper.setFrom("jerrymalcaire@yahoo.fr");

      mailSender.send(mimeMessage);
    }
    catch (MessagingException e)
    {
      LOGGER.error("failed to send email", e);
      throw new IllegalStateException("failed to send email");
    }
  }

  @Override
  @Async
  public void sendEmail(String toEmail, String emailBody, String subject, String attachment)
  {
    try
    {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
      helper.setText(emailBody, true);
      helper.setTo(toEmail);
      helper.setSubject(subject);
      helper.setFrom("jerrymalcaire@yahoo.fr");
      FileSystemResource fileSystem = new FileSystemResource(new File(attachment));
      helper.addAttachment(Objects.requireNonNull(fileSystem.getFilename()), fileSystem);
      mailSender.send(mimeMessage);
    }
    catch (MessagingException e)
    {
      LOGGER.error("failed to send email", e);
      throw new IllegalStateException("failed to send email");
    }
  }
}
