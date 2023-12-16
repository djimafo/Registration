package com.djmcode.backendregistration.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import com.djmcode.backendregistration.entity.UserEntity;
import com.djmcode.backendregistration.model.ChangePasswordRequest;
import com.djmcode.backendregistration.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService
{
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

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

  @Override
  public List<UserEntity> getAllUsers()
  {
    return userRepository.findAll();
  }

  @Override
  public void changePassword(ChangePasswordRequest request, Principal connectedUser)
  {
    var user = (UserEntity) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

    // check if the current password is correct
    if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
      throw new IllegalStateException("Wrong password");
    }
    // check if the two new passwords are the same
    if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
      throw new IllegalStateException("Password are not the same");
    }

    // update the password
    user.setPassword(passwordEncoder.encode(request.getNewPassword()));

    // save the new password
    userRepository.save(user);
  }
}
