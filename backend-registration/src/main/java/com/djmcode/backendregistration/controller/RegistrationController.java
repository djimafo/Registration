package com.djmcode.backendregistration.controller;

import com.djmcode.backendregistration.entity.UserEntity;
import com.djmcode.backendregistration.model.AuthenticationResponse;
import com.djmcode.backendregistration.model.RegistrationRequest;
import com.djmcode.backendregistration.service.JwtService;
import com.djmcode.backendregistration.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.djmcode.backendregistration.entity.Role.USER;

@RestController
@RequestMapping("/api/v1/auth/registration")
@RequiredArgsConstructor
public class RegistrationController
{
  private final RegistrationService registrationService;
  private final JwtService jwtService;
  private final PasswordEncoder passwordEncoder;

  @PostMapping
  public AuthenticationResponse registration(@RequestBody RegistrationRequest userReq)
  {
    var user = UserEntity.builder()
                         .firstname(userReq.getFirstname())
                         .lastname(userReq.getLastname())
                         .email(userReq.getEmail())
                         .password(passwordEncoder.encode(userReq.getPassword()))
                         .role(USER)
                         .build();
    var token = registrationService.register(user);
    return AuthenticationResponse.builder().token(token).build();
  }

  @GetMapping(path = "confirmation")
  public String confirm(@RequestParam("token") String token)
  {
    return registrationService.confirmationToken(token);
  }
}
