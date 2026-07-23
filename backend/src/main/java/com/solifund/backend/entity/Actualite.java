package com.solifund.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "slf_actualite")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Actualite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_actualite")
    private Integer id;

    @Column(nullable = false, length = 255)
    private String titre;

    @Column(columnDefinition = "TEXT")
    private String contenu;

    @Column(name = "date_publication")
    private LocalDateTime datePublication;
}