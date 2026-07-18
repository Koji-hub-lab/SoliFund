package com.solifund.backend.entity;

import com.solifund.backend.enums.StatutDon;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "slf_don")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Don {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_don")
    private Integer id;

    

    @Column(name="date_creation", nullable = false)
private LocalDateTime dateCreation;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "est_anonyme")
    private Boolean estAnonyme;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutDon statut;

    @ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_cagnotte", nullable = false)
private Cagnotte cagnotte;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_utilisateur")
private Utilisateur utilisateur;

@OneToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_paiement", nullable = false)
private Paiement paiement;
}