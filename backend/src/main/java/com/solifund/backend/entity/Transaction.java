package com.solifund.backend.entity;

import com.solifund.backend.enums.TypeTransaction;
import com.solifund.backend.enums.StatutTransaction;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "slf_transaction")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_transaction")
    private Integer id;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal montant;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeTransaction type;

    @Column(name = "reference", unique = true)
    private String reference;

    @Column(name = "date_creation")
private LocalDateTime dateCreation;

    @Column(name = "devise", nullable = false, length = 10)
private String devise;

@Enumerated(EnumType.STRING)
@Column(name = "statut", nullable = false)
private StatutTransaction statut;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_paiement", nullable = false)
private Paiement paiement;
}