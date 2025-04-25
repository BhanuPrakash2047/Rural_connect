package com.example.jobportalgamma.repositories;


import com.example.jobportalgamma.model.PersonDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonDetailsRepo extends JpaRepository<PersonDetails, String> {

}
