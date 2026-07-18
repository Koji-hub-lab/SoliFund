package com.solifund.backend.entity;

import com.solifund.backend.enums.RoleName;
import jakarta.persistence.*;
import lombok.*;
import jakarta.persistence.ManyToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "slf_role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_role")
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "nom", nullable = false, unique = true, length = 30)
    private RoleName nom;

    @ManyToMany(mappedBy = "roles")
@Builder.Default
private Set<Utilisateur> utilisateurs = new HashSet<>();

}