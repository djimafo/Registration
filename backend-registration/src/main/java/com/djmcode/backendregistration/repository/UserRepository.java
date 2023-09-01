package com.djmcode.backendregistration.repository;

import java.util.Optional;

import com.djmcode.backendregistration.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long>
{
  Optional<UserEntity> findByEmail(String email);

  @Transactional
  @Modifying
  @Query("UPDATE UserEntity a " +
          "SET a.enabled = TRUE WHERE a.email = ?1")
  int enableUser(String email);
}
