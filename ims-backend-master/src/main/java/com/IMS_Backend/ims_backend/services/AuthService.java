package com.IMS_Backend.ims_backend.services;

import com.IMS_Backend.ims_backend.dto.LogInDto;
import com.IMS_Backend.ims_backend.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    String login(LogInDto loginDto);
}