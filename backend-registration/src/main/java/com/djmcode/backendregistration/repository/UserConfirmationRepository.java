package com.djmcode.backendregistration.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import com.djmcode.backendregistration.entity.UserConfirmationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public interface UserConfirmationRepository extends JpaRepository<UserConfirmationEntity, Long>
{
  Optional<UserConfirmationEntity> findByToken(String token);

  @Transactional
  @Modifying
  @Query("UPDATE UserConfirmationEntity c " +
          "SET c.confirmedAt = ?2 " +
          "WHERE c.token = ?1")
  int updateConfirmedAt(String token,LocalDateTime confirmedAt);

  @Transactional
  @Modifying
  @Query("UPDATE UserConfirmationEntity c " +
          "SET c.expiresAt = ?2 " +
          "WHERE c.token = ?1")
  int updateExpiresAt(String token,LocalDateTime expiresAt);
}
