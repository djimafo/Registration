package com.djmcode.backendregistration.config;

import java.io.IOException;

import com.djmcode.backendregistration.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter
{
  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(
          @NonNull HttpServletRequest request,
          @NonNull HttpServletResponse response,
          @NonNull FilterChain filterChain)
          throws ServletException, IOException
  {
    final String authHeader = request.getHeader("Authorization");
    final String jwt;
    final String email;
    if (authHeader == null || !authHeader.startsWith("Bearer "))
    {
      filterChain.doFilter(request, response);
      return;
    }
    jwt = authHeader.substring(7);
    email = jwtService.extractEmail(jwt);
    if (email != null && SecurityContextHolder.getContext().getAuthentication() == null)
    {
      UserDetails user = this.userDetailsService.loadUserByUsername(email);
      if (jwtService.isTokenValid(jwt, user))
      {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                user,
                null,
                user.getAuthorities()
        );
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);
      }

    }
    filterChain.doFilter(request, response);
  }
}
