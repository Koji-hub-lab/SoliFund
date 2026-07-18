package com.solifund.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "slf_commentaire")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Commentaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_commentaire")
    private Integer id;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
private String description;

    @Column(name = "date_creation")
private LocalDateTime dateCreation;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_utilisateur", nullable = false)
private Utilisateur utilisateur;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_cagnotte", nullable = false)
private Cagnotte cagnotte;
}