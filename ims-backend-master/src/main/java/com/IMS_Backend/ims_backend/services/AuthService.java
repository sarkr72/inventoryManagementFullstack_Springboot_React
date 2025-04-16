package com.IMS_Backend.ims_backend.services;

import com.IMS_Backend.ims_backend.dto.JwtAuthResponse;
import com.IMS_Backend.ims_backend.dto.LogInDto;
import com.IMS_Backend.ims_backend.dto.RegisterDto;

public interface AuthService {
    RegisterDto register(RegisterDto registerDto);

    JwtAuthResponse login(LogInDto loginDto);
}