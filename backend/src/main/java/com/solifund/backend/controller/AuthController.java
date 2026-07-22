package com.solifund.backend.controller;

import com.solifund.backend.dto.LoginRequest;
import com.solifund.backend.dto.LoginResponse;
import com.solifund.backend.dto.RegisterRequest;
import com.solifund.backend.dto.UtilisateurResponse;
import com.solifund.backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// ATTENTION EQUIPE : le frontend (feature/auth-ui, AuthService.js) appelle
// POST /auth/register et POST /auth/login (sans prefixe /api). Ce controleur expose
// /api/auth/register et /api/auth/login. Il faut aligner l'un des deux cotes avant l'integration
// (cf. le message precedent sur l'incompatibilite d'architecture d'authentification).
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentification", description = "Inscription, connexion et profil courant")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @Operation(summary = "Creer un nouveau compte utilisateur")
    public ResponseEntity<UtilisateurResponse> register(@Valid @RequestBody RegisterRequest request) {
        UtilisateurResponse reponse = authService.inscrire(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(reponse);
    }

    @PostMapping("/login")
    @Operation(summary = "Authentifier un utilisateur et obtenir un JWT")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse reponse = authService.connecter(request);
        return ResponseEntity.ok(reponse);
    }

    @GetMapping("/me")
    @Operation(summary = "Recuperer le profil de l'utilisateur authentifie")
    public ResponseEntity<UtilisateurResponse> me(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(authService.obtenirUtilisateurCourant(email));
    }
}
