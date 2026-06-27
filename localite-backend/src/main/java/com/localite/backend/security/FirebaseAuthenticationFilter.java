package com.localite.backend.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class FirebaseAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String idToken = authHeader.substring(7);

            try {
                // Verify the ID token with Firebase
                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
                String firebaseUid = decodedToken.getUid();

                // Create Authentication object
                // We use firebaseUid as the principal. We can also fetch user from DB if needed here.
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        firebaseUid, null, new ArrayList<>());
                
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set authentication in the security context
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (FirebaseAuthException e) {
                // Token is invalid, expired, etc.
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid or expired Firebase ID token");
                return;
            } catch (Exception e) {
                // Fallback for when Firebase isn't initialized yet in dev environment without credentials
                System.out.println("Firebase auth error (or not initialized): " + e.getMessage());
                // For development when Firebase isn't fully set up, we might skip throwing if we want 
                // But in production, this should fail. We let it pass down the chain to be rejected by Spring Security.
            }
        }

        filterChain.doFilter(request, response);
    }
}
