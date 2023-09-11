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

  @Override
  public void saveUserConfirmation(UserConfirmationEntity userConfimation)
  {
    userConfirmationRepository.save(userConfimation);
  }

  @Override
  public Optional<UserConfirmationEntity> getUserToken(String token)
  {
    return userConfirmationRepository.findByToken(token);
  }

  @Override
  public int setConfirmedAt(String token)
  {
    return userConfirmationRepository.updateConfirmedAt(token, LocalDateTime.now());
  }

  @Override
  public int setExpiresAt(String token)
  {
    return userConfirmationRepository.updateExpiresAt(token, LocalDateTime.now().plusMinutes(15));
  }

  @Override
  public Optional<UserConfirmationEntity> getUserConfirmationById(Long id)
  {
    return userConfirmationRepository.findById(id);
  }

}

