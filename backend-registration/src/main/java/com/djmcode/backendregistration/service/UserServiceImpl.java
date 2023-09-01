package com.djmcode.backendregistration.service;

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
}
