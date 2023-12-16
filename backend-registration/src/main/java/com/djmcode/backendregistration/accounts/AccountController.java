package com.djmcode.backendregistration.accounts;

import java.security.Principal;

import com.djmcode.backendregistration.model.ChangePasswordRequest;
import com.djmcode.backendregistration.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController
{
  private final UserService userService;

  @PatchMapping
  public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Principal connectedUser){
    userService.changePassword(request, connectedUser);
    return ResponseEntity.ok().build();
  }
}
