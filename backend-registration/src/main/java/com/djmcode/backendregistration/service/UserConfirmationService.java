package com.djmcode.backendregistration.service;

import java.util.Optional;

import com.djmcode.backendregistration.entity.UserConfirmationEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserConfirmationService
{
  void saveUserConfirmation(UserConfirmationEntity userConfimation);

  Optional<UserConfirmationEntity> getUserToken(String token);

  int setConfirmedAt(String token);
}
