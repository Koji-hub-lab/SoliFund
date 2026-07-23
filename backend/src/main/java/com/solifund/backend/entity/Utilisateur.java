package com.solifund.backend.entity;

import com.solifund.backend.enums.StatutUtilisateur;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "slf_utilisateur")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_utilisateur")
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nom;

    @Column(nullable = false, length = 100)
    private String prenom;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "mot_de_passe", nullable = false, length = 255)
    private String motDePasse;

    @Column(unique = true, length = 20)
    private String telephone;

    @Column(name = "date_inscription", nullable = false)
    private LocalDateTime dateInscription;

    @Column(name = "est_verifie", nullable = false)
    private Boolean estVerifie;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatutUtilisateur statut;

    @Column(name = "date_fin_suspension")
    private LocalDateTime dateFinSuspension;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "slf_posseder",
            joinColumns = @JoinColumn(name = "id_utilisateur"),
            inverseJoinColumns = @JoinColumn(name = "id_role"))
    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Jeton> jetons = new HashSet<>();

    @OneToMany(mappedBy = "utilisateur")
    @Builder.Default
    private Set<Cagnotte> cagnottes = new HashSet<>();

    @OneToMany(mappedBy = "utilisateur")
    @Builder.Default
    private Set<Paiement> paiements = new HashSet<>();

    @OneToMany(mappedBy = "utilisateur")
    @Builder.Default
    private Set<Don> dons = new HashSet<>();

    @OneToMany(mappedBy = "utilisateur")
    @Builder.Default
    private Set<Commentaire> commentaires = new HashSet<>();

    @OneToMany(mappedBy = "utilisateur")
    @Builder.Default
    private Set<Retrait> retraits = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "slf_recevoir",
            joinColumns = @JoinColumn(name = "id_utilisateur"),
            inverseJoinColumns = @JoinColumn(name = "id_notification"))
    @Builder.Default
    private Set<Notification> notifications = new HashSet<>();
}
