package com.solifund.backend.repository;

import com.solifund.backend.entity.Role;
import com.solifund.backend.enums.RoleName;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByNom(RoleName nom);
}
