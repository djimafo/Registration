package com.djmcode.backendregistration.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "account_confirmation")
public class UserConfirmationEntity
{

  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false)
  @NonNull
  private String token;

  @Column(nullable = false)
  @NonNull
  private LocalDateTime createdAt;

  @Column(nullable = false)
  @NonNull
  private LocalDateTime expiresAt;

  private LocalDateTime confirmedAt;

  @ManyToOne
  @JoinColumn(
          nullable = false,
          name = "account_id"
  )
  private UserEntity userEntity;

}