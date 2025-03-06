package com.IMS_Backend.ims_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IMS_Backend.ims_backend.dto.JwtAuthResponse;
import com.IMS_Backend.ims_backend.dto.LogInDto;
import com.IMS_Backend.ims_backend.dto.RefreshTokenRequest;
import com.IMS_Backend.ims_backend.dto.RegisterDto;
import com.IMS_Backend.ims_backend.exceptions.ExpiredJwtException;
import com.IMS_Backend.ims_backend.security.JwtUtil;
import com.IMS_Backend.ims_backend.services.AuthService;

@CrossOrigin(value = "*", exposedHeaders = "New-Access-Token")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;
	private JwtUtil jwtUtil;

	public AuthController(AuthService authService, JwtUtil jwtUtil) {
		this.authService = authService;
		this.jwtUtil = jwtUtil;
	}

	@PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LogInDto loginDto) {
        try {
            JwtAuthResponse jwtResponse = authService.login(loginDto);  // Your login service logic
            
            return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
        } catch (ExpiredJwtException e) {
            return new ResponseEntity<>("JWT token has expired. Please log in again.", HttpStatus.UNAUTHORIZED);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Invalid username or password.", HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/session-expired")
    public ResponseEntity<String> sessionExpired() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Session has expired. Please log in again.");
    }
    
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        String refreshToken = refreshTokenRequest.getRefreshToken();
        
        if (jwtUtil.validateToken(refreshToken)) {
            String username = jwtUtil.extractUsername(refreshToken);
            String newAccessToken = jwtUtil.generateAccessToken(username);
            
            JwtAuthResponse response = new JwtAuthResponse();
            response.setAccessToken(newAccessToken);
            response.setRefreshToken(refreshToken);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token.");
        }
    }

    
    
}