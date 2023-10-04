package com.djmcode.backendregistration.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import com.djmcode.backendregistration.email.EmailSender;
import com.djmcode.backendregistration.email.EmailValidator;
import com.djmcode.backendregistration.entity.Role;
import com.djmcode.backendregistration.entity.UserConfirmationEntity;
import com.djmcode.backendregistration.entity.UserEntity;
import com.djmcode.backendregistration.model.RegistrationRequest;
import com.djmcode.backendregistration.repository.UserConfirmationRepository;
import com.djmcode.backendregistration.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistrationService
{
  private final UserConfirmationService userConfirmationService;
  private final UserConfirmationRepository userConfirmationRepository;
  private final UserService userService;
  private final EmailValidator emailValidator;
  private final EmailSender emailSender;
  private final UserRepository userRepository;
  private final JwtService jwtService;
  private final PasswordEncoder passwordEncoder;

  public String register(@NonNull UserEntity userReq)
  {
    boolean isValidEmail = emailValidator.
            verification(userReq.getEmail());

    if (!isValidEmail)
    {
      throw new IllegalStateException("email not valid");
    }
//    UserEntity user = UserEntity.builder()
//                                .firstname(userReq.getFirstname())
//                                .lastname(userReq.getLastname())
//                                .email(userReq.getEmail())
//                                .password(passwordEncoder.encode( userReq.getPassword()))
//                                .role(Role.USER)
//                                .build();
    Optional<UserEntity> userdb = userRepository
            .findByEmail(userReq.getEmail());

    if (userdb.isPresent())
    {
      Optional<UserConfirmationEntity> userConfirmation = userConfirmationService.getUserConfirmationById(userdb.get().getId());

      if (userdb.get().getEnabled()==null && userConfirmation.isPresent())
      {
        // TODO check of attributes are the same
          String token = userConfirmation.get().getToken();
          sendEmail(userReq, token);
          userConfirmationService.setExpiresAt(token);
          return "Please check your Email and Please click on the link to activate your account";
      }
      return "User is already registered";
    }

    userRepository.save(userReq);

    //String token = UUID.randomUUID().toString();
    String token = jwtService.generateToken(userReq);

    UserConfirmationEntity confirmationToken = UserConfirmationEntity.builder()
                                                                     .token(token)
                                                                     .createdAt(LocalDateTime.now())
                                                                     .expiresAt(LocalDateTime.now().plusMinutes(15))
                                                                     .userEntity(userReq)
                                                                     .build();
    userConfirmationService.saveUserConfirmation(confirmationToken);
    sendEmail(userReq, token);
    return token;
  }

  public void sendEmail(@NonNull UserEntity userReq, @NonNull String token)
  {
    String link = "http://localhost:8081/api/v1/auth/registration/confirmation?token=" + token;
    emailSender.sendEmailConfirmation(userReq.getEmail(),
                                      userReq.getFirstname(),
                                      "Confirm your email",
                                      link);
  }

  public String confirmationToken(@NonNull String token)
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
      return "token expired";
    }
    userConfirmationService.setConfirmedAt(token);
    userService.enableUser(user.getUserEntity().getEmail());

    return "confirmed";
  }

}
