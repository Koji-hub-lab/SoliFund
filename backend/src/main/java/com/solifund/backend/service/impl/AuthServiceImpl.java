package com.solifund.backend.service.impl;

import com.solifund.backend.dto.request.LoginRequest;
import com.solifund.backend.dto.request.RegisterRequest;
import com.solifund.backend.dto.response.AuthResponse;
import com.solifund.backend.entity.Role;
import com.solifund.backend.entity.Utilisateur;
import com.solifund.backend.enums.RoleName;
import com.solifund.backend.enums.StatutUtilisateur;
import com.solifund.backend.repository.RoleRepository;
import com.solifund.backend.repository.UtilisateurRepository;
import com.solifund.backend.security.jwt.JwtService;
import com.solifund.backend.security.user.UserDetailsImpl;
import com.solifund.backend.service.interfaces.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (utilisateurRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Cet email est déjà utilisé.");
        }

        if (utilisateurRepository.existsByTelephone(request.getTelephone())) {
            throw new RuntimeException("Ce numéro de téléphone est déjà utilisé.");
        }

        Role role = roleRepository.findByNom(RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("ROLE_USER introuvable."));

        Utilisateur utilisateur = Utilisateur.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                .telephone(request.getTelephone())
                .motDePasse(passwordEncoder.encode(request.getMotDePasse()))
                .dateInscription(LocalDateTime.now())
                .estVerifie(false)
                .statut(StatutUtilisateur.ACTIF)
                .roles(Set.of(role))
                .build();

        utilisateurRepository.save(utilisateur);

        String token = jwtService.generateToken(new UserDetailsImpl(utilisateur));

        return AuthResponse.builder()
                .token(token)
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getMotDePasse()
                )
        );

        Utilisateur utilisateur = utilisateurRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable."));

        String token = jwtService.generateToken(new UserDetailsImpl(utilisateur));

        return AuthResponse.builder()
                .token(token)
                .build();
    }
}