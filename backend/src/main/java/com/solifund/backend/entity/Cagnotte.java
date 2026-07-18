package com.solifund.backend.entity;

import com.solifund.backend.enums.StatutCagnotte;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "slf_cagnotte")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cagnotte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cagnotte")
    private Integer id;

    @Column(nullable = false, length = 150)
    private String titre;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "objectif", nullable = false, precision = 15, scale = 2)
    private BigDecimal objectif;

    @Column(name = "montant_collecte", precision = 15, scale = 2)
    private BigDecimal montantCollecte;

    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @Column(name = "date_fin", nullable = false)
    private LocalDate dateFin;

    @Column(name = "date_creation")
    private LocalDateTime dateCreation;

    @Column(name = "date_modification")
    private LocalDateTime dateModification;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutCagnotte statut;

    @Column(name = "image", length = 255)
    private String image;

    @Column(name = "est_publique", nullable = false)
    private Boolean estPublique;

    @Column(name = "devise", nullable = false, length = 10)
    private String devise;

    @ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_utilisateur", nullable = false)
private Utilisateur utilisateur;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_categorie")
private Categorie categorie;

@OneToMany(mappedBy = "cagnotte")
@Builder.Default
private Set<Don> dons = new HashSet<>();

@OneToMany(mappedBy = "cagnotte")
@Builder.Default
private Set<Commentaire> commentaires = new HashSet<>();

@OneToMany(mappedBy = "cagnotte")
@Builder.Default
private Set<Retrait> retraits = new HashSet<>();


}