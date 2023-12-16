package com.djmcode.backendregistration.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import com.djmcode.backendregistration.entity.UserEntity;
import com.djmcode.backendregistration.model.ChangePasswordRequest;
import org.springframework.stereotype.Service;

@Service
public interface UserService
{
  int enableUser(String email);
  Optional<UserEntity> findByEmail(String email);
  List<UserEntity> getAllUsers();

  void changePassword(ChangePasswordRequest request, Principal connectedUser);
}
