package com.djmcode.backendregistration.controller;

import com.djmcode.backendregistration.model.RegistrationRequest;
import com.djmcode.backendregistration.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/registration")
@RequiredArgsConstructor
public class RegistrationController
{
  private final RegistrationService registrationService;
  @PostMapping
  ResponseEntity<String> register(@RequestBody RegistrationRequest userReq){
    String token = registrationService.register(userReq);
    return ResponseEntity.ok().body(token);
  }

  @GetMapping(path = "confirmation")
  public String confirm(@RequestParam("token") String token) {
    return registrationService.confirmationToken(token);
  }
}
