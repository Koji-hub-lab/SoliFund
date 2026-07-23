package com.solifund.backend.service.interfaces;

import com.solifund.backend.dto.request.LoginRequest;
import com.solifund.backend.dto.request.RegisterRequest;
import com.solifund.backend.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}