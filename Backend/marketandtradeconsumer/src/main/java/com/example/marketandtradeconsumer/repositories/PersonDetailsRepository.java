package com.example.marketandtradeconsumer.repositories;

//import com.example.marketandtrade.model.PersonDetails;
import com.example.marketandtradeconsumer.modal.PersonDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonDetailsRepository extends JpaRepository<PersonDetails, String> {
}