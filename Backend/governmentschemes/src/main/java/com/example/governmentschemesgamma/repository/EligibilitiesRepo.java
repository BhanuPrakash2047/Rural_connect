package com.example.governmentschemesgamma.repository;

import com.example.governmentschemesgamma.model.Eligibilities;
import com.example.governmentschemesgamma.model.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EligibilitiesRepo extends JpaRepository <Eligibilities,Long>{
    List<Eligibilities> findByScheme(Scheme scheme);

    void deleteByScheme(Scheme existingScheme);
}
