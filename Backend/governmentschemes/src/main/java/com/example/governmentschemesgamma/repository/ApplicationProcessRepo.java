package com.example.governmentschemesgamma.repository;

import com.example.governmentschemesgamma.model.ApplicationProcess;
import com.example.governmentschemesgamma.model.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationProcessRepo extends JpaRepository<ApplicationProcess, Long> {
    List<ApplicationProcess> findByScheme(Scheme scheme);

    void deleteByScheme(Scheme existingScheme);
}
