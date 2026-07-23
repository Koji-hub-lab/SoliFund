package com.solifund.backend.security.user;

import com.solifund.backend.entity.Role;
import com.solifund.backend.enums.StatutUtilisateur;
import com.solifund.backend.entity.Utilisateur;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {

    private final Utilisateur utilisateur;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return utilisateur.getRoles()
                .stream()
                .map(Role::getNom)
                .map(Enum::name)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return utilisateur.getMotDePasse();
    }

    @Override
    public String getUsername() {
        return utilisateur.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
public boolean isEnabled() {
    return utilisateur.getStatut() == StatutUtilisateur.ACTIF;
}

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }
}