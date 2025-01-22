package com.IMS_Backend.ims_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IMS_Backend.ims_backend.dto.LogInDto;
import com.IMS_Backend.ims_backend.dto.RegisterDto;
import com.IMS_Backend.ims_backend.services.AuthService;



@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LogInDto loginDto){
    	String response = authService.login(loginDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/session-expired")
    public ResponseEntity<String> sessionExpired() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Session has expired. Please log in again.");
    }
    
}