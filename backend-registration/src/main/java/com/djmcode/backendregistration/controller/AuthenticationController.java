package com.djmcode.backendregistration.controller;

import com.djmcode.backendregistration.model.AuthenticationRequest;
import com.djmcode.backendregistration.model.AuthenticationResponse;
import com.djmcode.backendregistration.service.JwtService;
import com.djmcode.backendregistration.service.UserService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/auth/authenticate")
@RequiredArgsConstructor
public class AuthenticationController
{
  private final @NonNull AuthenticationManager authenticationManager;
  private final @NonNull JwtService jwtService;
  private final @NonNull UserService userService;

  @PostMapping
  public AuthenticationResponse authenticate(@RequestBody AuthenticationRequest userReq)
  {
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    userReq.getEmail(),
                    userReq.getPassword()));
    var user = userService.findByEmail(userReq.getEmail()).orElseThrow();
    String token = jwtService.generateToken(user);
    return AuthenticationResponse.builder().token(token).build();
  }
}
