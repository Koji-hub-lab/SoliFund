package com.solifund.backend.repository;

import com.solifund.backend.entity.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaiementRepository extends JpaRepository<Paiement, Integer> {

}