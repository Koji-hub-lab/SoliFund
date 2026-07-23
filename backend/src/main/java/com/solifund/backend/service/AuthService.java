package com.solifund.backend.service;

import com.solifund.backend.dto.LoginRequest;
import com.solifund.backend.dto.LoginResponse;
import com.solifund.backend.dto.RegisterRequest;
import com.solifund.backend.dto.UtilisateurResponse;
import com.solifund.backend.entity.Jeton;
import com.solifund.backend.entity.Role;
import com.solifund.backend.entity.Utilisateur;
import com.solifund.backend.enums.RoleName;
import com.solifund.backend.enums.StatutUtilisateur;
import com.solifund.backend.enums.TypeJeton;
import com.solifund.backend.exception.CompteNonActifException;
import com.solifund.backend.exception.EmailDejaUtiliseException;
import com.solifund.backend.exception.IdentifiantsInvalidesException;
import com.solifund.backend.exception.UtilisateurNotFoundException;
import com.solifund.backend.repository.JetonRepository;
import com.solifund.backend.repository.RoleRepository;
import com.solifund.backend.repository.UtilisateurRepository;
import com.solifund.backend.security.jwt.JwtService;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private static final RoleName ROLE_PAR_DEFAUT = RoleName.ROLE_USER;
    private static final long DUREE_VALIDITE_JETON_HEURES = 24L;

    private final UtilisateurRepository utilisateurRepository;
    private final RoleRepository roleRepository;
    private final JetonRepository jetonRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
            UtilisateurRepository utilisateurRepository,
            RoleRepository roleRepository,
            JetonRepository jetonRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {
        this.utilisateurRepository = utilisateurRepository;
        this.roleRepository = roleRepository;
        this.jetonRepository = jetonRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional
    public UtilisateurResponse inscrire(RegisterRequest request) {
        if (utilisateurRepository.existsByEmail(request.getEmail())) {
            throw new EmailDejaUtiliseException(request.getEmail());
        }

        Role roleDefaut = roleRepository.findByNom(ROLE_PAR_DEFAUT)
                .orElseGet(() -> roleRepository.save(Role.builder().nom(ROLE_PAR_DEFAUT).build()));

        Utilisateur utilisateur = Utilisateur.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                .telephone(request.getTelephone())
                .motDePasse(passwordEncoder.encode(request.getMotDePasse()))
                .dateInscription(LocalDateTime.now())
                .estVerifie(false)
                .statut(StatutUtilisateur.ACTIF)
                .build();
        utilisateur.getRoles().add(roleDefaut);

        Utilisateur utilisateurEnregistre = utilisateurRepository.save(utilisateur);
        genererJeton(utilisateurEnregistre, TypeJeton.VERIF_EMAIL);

        return versUtilisateurResponse(utilisateurEnregistre);
    }

    public LoginResponse connecter(LoginRequest request) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getMotDePasse()));
        } catch (AuthenticationException ex) {
            throw new IdentifiantsInvalidesException();
        }

        Utilisateur utilisateur = utilisateurRepository.findByEmail(request.getEmail())
                .orElseThrow(IdentifiantsInvalidesException::new);

        if (utilisateur.getStatut() != StatutUtilisateur.ACTIF) {
            throw new CompteNonActifException("Votre compte n'est pas encore actif.");
        }

        UserDetails principal = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(principal);

        return LoginResponse.builder()
                .token(token)
                .id(utilisateur.getId())
                .email(utilisateur.getEmail())
                .nom(utilisateur.getNom())
                .prenom(utilisateur.getPrenom())
                .roles(extraireNomsRoles(utilisateur))
                .build();
    }

    @Transactional(readOnly = true)
    public UtilisateurResponse obtenirUtilisateurCourant(String email) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new UtilisateurNotFoundException("Aucun utilisateur trouve pour l'email : " + email));
        return versUtilisateurResponse(utilisateur);
    }

    private Jeton genererJeton(Utilisateur utilisateur, TypeJeton type) {
        Jeton jeton = Jeton.builder()
                .code(UUID.randomUUID().toString())
                .type(type)
                .dateCreation(LocalDateTime.now())
                .dateExpiration(LocalDateTime.now().plusHours(DUREE_VALIDITE_JETON_HEURES))
                .estUtilise(false)
                .utilisateur(utilisateur)
                .build();
        return jetonRepository.save(jeton);
    }

    private Set<String> extraireNomsRoles(Utilisateur utilisateur) {
        return utilisateur.getRoles().stream()
                .map(role -> role.getNom().name())
                .collect(Collectors.toSet());
    }

    private UtilisateurResponse versUtilisateurResponse(Utilisateur utilisateur) {
        return UtilisateurResponse.builder()
                .id(utilisateur.getId())
                .nom(utilisateur.getNom())
                .prenom(utilisateur.getPrenom())
                .email(utilisateur.getEmail())
                .telephone(utilisateur.getTelephone())
                .statut(utilisateur.getStatut())
                .dateInscription(utilisateur.getDateInscription())
                .roles(extraireNomsRoles(utilisateur))
                .build();
    }
}
