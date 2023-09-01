package com.djmcode.backendregistration.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest
{
  @NonNull
  private String firstname;
  @NonNull
  private String lastname;
  @NonNull
  private String email;
  @NonNull
  private String password;
}
