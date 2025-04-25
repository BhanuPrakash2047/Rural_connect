package com.example.governmentschemesgamma.repository;

import com.example.governmentschemesgamma.model.DocumentRequirement;
import com.example.governmentschemesgamma.model.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentsRequirementRepo extends JpaRepository<DocumentRequirement,Long> {
    List<DocumentRequirement> findByScheme(Scheme scheme);

    void deleteByScheme(Scheme existingScheme);
}
