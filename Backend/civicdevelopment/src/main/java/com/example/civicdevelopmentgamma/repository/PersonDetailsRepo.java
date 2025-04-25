package com.example.civicdevelopmentgamma.repository;

import com.example.civicdevelopmentgamma.model.PersonDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonDetailsRepo extends JpaRepository<PersonDetails, String> {

    PersonDetails findByIdno(String idno);

    Optional<PersonDetails> findByPhone(String phoneNumber);
}
