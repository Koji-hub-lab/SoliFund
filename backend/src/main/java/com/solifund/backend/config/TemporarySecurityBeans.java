package com.solifund.backend.config;

import com.solifund.backend.repository.UtilisateurRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

// NOTE : nomme "Temporary" dans le code d'origine - confirme que la configuration de securite
// definitive (OAuth2 Authorization Server vs JWT simple) reste a trancher avec l'equipe. Voir
// remarque dans le pom.xml.
@Configuration
public class TemporarySecurityBeans {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(UtilisateurRepository utilisateurRepository) {
        return email -> utilisateurRepository.findByEmail(email)
                .map(utilisateur -> User.builder()
                        .username(utilisateur.getEmail())
                        .password(utilisateur.getMotDePasse())
                        .authorities(utilisateur.getRoles().stream()
                                .map(role -> role.getNom().name())
                                .toArray(String[]::new))
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("Aucun utilisateur pour l'email : " + email));
    }

    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(new AuthenticationProvider[] {provider});
    }
}
