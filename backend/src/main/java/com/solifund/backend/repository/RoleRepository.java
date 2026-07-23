package com.solifund.backend.repository;

import com.solifund.backend.entity.Role;
import com.solifund.backend.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByNom(RoleName nom);

}