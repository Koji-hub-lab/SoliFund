package com.solifund.backend.entity;

import com.solifund.backend.enums.StatutRetrait;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "slf_retrait")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Retrait {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_retrait")
    private Integer id;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal montant;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutRetrait statut;

    @Column(name = "date_creation", nullable = false)
private LocalDateTime dateCreation;

@Column(name = "date_traitement")
private LocalDateTime dateTraitement;

@Column(name = "date_validation")
private LocalDateTime dateValidation;

    @Column(name = "motif_rejet", columnDefinition = "TEXT")
private String motifRejet;

@Column(name = "reference_retrait", unique = true)
private String referenceRetrait;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_utilisateur", nullable = false)
private Utilisateur utilisateur;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_cagnotte", nullable = false)
private Cagnotte cagnotte;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_transaction")
private Transaction transaction;
}