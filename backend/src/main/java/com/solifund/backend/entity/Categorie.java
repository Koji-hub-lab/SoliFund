package com.solifund.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "slf_categorie")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categorie")
    private Integer id;

    @Column(nullable = false, unique = true, length = 100)
    private String nom;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "icone", length = 255)
    private String icone;

    @Column(name = "couleur", length = 50)
    private String couleur;

    @OneToMany(mappedBy = "categorie")
@Builder.Default
private Set<Cagnotte> cagnottes = new HashSet<>();
}