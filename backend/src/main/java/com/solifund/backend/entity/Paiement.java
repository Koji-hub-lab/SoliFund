package com.solifund.backend.entity;

import com.solifund.backend.enums.MethodePaiement;
import com.solifund.backend.enums.StatutPaiement;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "slf_paiement")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Paiement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_paiement")
    private Integer id;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal montant;

    @Column(name = "devise", nullable = false, length = 10)
    private String devise;

    @Enumerated(EnumType.STRING)
    @Column(name = "methode_paiement", nullable = false)
    private MethodePaiement methodePaiement;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutPaiement statut;

   @Column(name = "transaction_id", unique = true)
    private String transactionId;

    @Column(name = "reference_externe")
private String referenceExterne;

    @Column(name = "date_creation", nullable = false)
private LocalDateTime dateCreation;

@Column(name = "date_maj")
private LocalDateTime dateMaj;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_utilisateur", nullable = false)
private Utilisateur utilisateur;

@OneToOne(mappedBy = "paiement")
private Don don;

@OneToMany(mappedBy = "paiement")
@Builder.Default
private Set<Transaction> transactions = new HashSet<>();
}