package com.example.governmentschemesgamma.repository;

import com.example.governmentschemesgamma.model.PersonDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonDetailsRepo extends JpaRepository<PersonDetails, String> {

}
