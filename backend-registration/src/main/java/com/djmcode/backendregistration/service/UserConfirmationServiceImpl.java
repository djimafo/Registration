package com.djmcode.backendregistration.service;

import java.time.LocalDateTime;
import java.util.Optional;

import com.djmcode.backendregistration.entity.UserConfirmationEntity;
import com.djmcode.backendregistration.repository.UserConfirmationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserConfirmationServiceImpl implements UserConfirmationService
{
  private final UserConfirmationRepository userConfirmationRepository;

  public void saveUserConfirmation(UserConfirmationEntity userConfimation)
  {
    userConfirmationRepository.save(userConfimation);
  }

  public Optional<UserConfirmationEntity> getUserToken(String token)
  {
    return userConfirmationRepository.findByToken(token);
  }

  public int setConfirmedAt(String token)
  {
    return userConfirmationRepository.updateConfirmedAt(token, LocalDateTime.now());
  }
}

