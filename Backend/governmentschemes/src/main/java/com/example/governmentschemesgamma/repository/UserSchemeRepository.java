package com.example.governmentschemesgamma.repository;

import com.example.governmentschemesgamma.model.UserSchemeApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSchemeRepository extends JpaRepository<UserSchemeApplication,Long> {

}
