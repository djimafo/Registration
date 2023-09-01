package com.djmcode.backendregistration.email;

import java.util.function.Predicate;

import org.springframework.stereotype.Service;


@Service
public class EmailValidator implements Predicate<String>
{
  public Boolean verification(String email){
    //TODO
    return true;
  }

  @Override
  public boolean test(String s)
  {
    return false;
  }
}
