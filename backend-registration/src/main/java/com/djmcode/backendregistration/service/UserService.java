package com.djmcode.backendregistration.service;

import java.util.Optional;

import com.djmcode.backendregistration.entity.UserEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService
{
  int enableUser(String email);
  Optional<UserEntity> findByEmail(String email);
}
