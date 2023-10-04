package com.djmcode.backendregistration.service;

import java.util.Optional;

import com.djmcode.backendregistration.entity.UserEntity;
import com.djmcode.backendregistration.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService
{
  private final UserRepository userRepository;

  @Override
  public int enableUser(String email)
  {
    return userRepository.enableUser(email);
  }

  @Override
  public Optional<UserEntity> findByEmail(String email)
  {
    return userRepository.findByEmail(email);
  }
}
