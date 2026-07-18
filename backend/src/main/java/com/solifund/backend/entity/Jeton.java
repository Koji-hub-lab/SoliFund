package com.solifund.backend.entity;

import com.solifund.backend.enums.TypeJeton;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "slf_jeton")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Jeton {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_jeton")
    private Integer id;

   @Column(name = "code", nullable = false, unique = true, length = 255)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeJeton type;

    @Column(name = "date_creation", nullable = false)
    private LocalDateTime dateCreation;

    @Column(name = "date_expiration")
    private LocalDateTime dateExpiration;

    @Column(name = "est_utilise", nullable = false)
    private Boolean estUtilise;

    @ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_utilisateur", nullable = false)
private Utilisateur utilisateur;
}