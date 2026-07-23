package com.solifund.backend.dto;

import com.solifund.backend.enums.StatutUtilisateur;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UtilisateurResponse {

    private Integer id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private StatutUtilisateur statut;
    private LocalDateTime dateInscription;
    private Set<String> roles;
}
