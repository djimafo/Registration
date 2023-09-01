package com.djmcode.backendregistration.service;

import java.time.LocalDateTime;
import java.util.UUID;

import com.djmcode.backendregistration.email.EmailSender;
import com.djmcode.backendregistration.email.EmailValidator;
import com.djmcode.backendregistration.entity.Role;
import com.djmcode.backendregistration.entity.UserConfirmationEntity;
import com.djmcode.backendregistration.entity.UserEntity;
import com.djmcode.backendregistration.model.RegistrationRequest;
import com.djmcode.backendregistration.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistrationService
{
  private final UserConfirmationService userConfirmationService;
  private final UserService userService;
  private final EmailValidator emailValidator;
  private final EmailSender emailSender;
  private final UserRepository userRepository;

  public String register(RegistrationRequest userReq)
  {
    boolean isValidEmail = emailValidator.
            verification(userReq.getEmail());

    if (!isValidEmail)
    {
      throw new IllegalStateException("email not valid");
    }
    UserEntity user = UserEntity.builder()
                                .firstname(userReq.getFirstname())
                                .lastname(userReq.getLastname())
                                .email(userReq.getEmail())
                                .password(userReq.getPassword())
                                .role(Role.USER)
                                .build();
    boolean userExists = userRepository
            .findByEmail(userReq.getEmail())
            .isPresent();

    if (userExists)
    {
      // TODO check of attributes are the same and
      // TODO if email not confirmed send confirmation email.

      throw new IllegalStateException("email already taken");
    }

    userRepository.save(user);

    String token = UUID.randomUUID().toString();

    UserConfirmationEntity confirmationToken = UserConfirmationEntity.builder()
                                                                     .token(token)
                                                                     .createdAt(LocalDateTime.now())
                                                                     .expiresAt(LocalDateTime.now().plusMinutes(15))
                                                                     .userEntity(user)
                                                                     .build();
    userConfirmationService.saveUserConfirmation(confirmationToken);

    String link = "http://localhost:8080/api/v1/registration/confirmation?token=" + token;
    emailSender.sendEmailConfirmation(userReq.getEmail(),
                                      userReq.getFirstname(),
                                      "Confirm your email",
                                      link);

    return token;
  }

  public String confirmationToken(String token)
  {
    UserConfirmationEntity user = userConfirmationService
            .getUserToken(token)
            .orElseThrow(() -> new IllegalStateException("token not found"));

    if (user.getConfirmedAt() != null)
    {
      throw new IllegalStateException("email already confirmed");
    }
    LocalDateTime expiredAt = user.getExpiresAt();

    if (expiredAt.isBefore(LocalDateTime.now()))
    {
      throw new IllegalStateException("token expired");
    }
    userConfirmationService.setConfirmedAt(token);
    userService.enableUser(user.getUserEntity().getEmail());

    return "confirmed";
  }

}
