package com.solifund.backend.repository;

import com.solifund.backend.entity.Jeton;
import com.solifund.backend.entity.Utilisateur;
import com.solifund.backend.enums.TypeJeton;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JetonRepository extends JpaRepository<Jeton, Integer> {

    Optional<Jeton> findByCode(String code);

    Optional<Jeton> findByUtilisateurAndTypeAndEstUtiliseFalse(Utilisateur utilisateur, TypeJeton type);
}
