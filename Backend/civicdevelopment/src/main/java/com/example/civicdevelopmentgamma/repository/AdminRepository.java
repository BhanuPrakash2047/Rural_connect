package com.example.civicdevelopmentgamma.repository;



import com.example.civicdevelopmentgamma.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Get admin by email
    Optional<Admin> findByEmail(String email);

    // Get admin by location
    Optional<Admin> findByLocation(String location);

    Admin findByName(String adminName);
}
