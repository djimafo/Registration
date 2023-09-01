package com.djmcode.backendregistration.service;

import org.springframework.stereotype.Service;

@Service
public interface UserService
{
  int enableUser(String email);
}
