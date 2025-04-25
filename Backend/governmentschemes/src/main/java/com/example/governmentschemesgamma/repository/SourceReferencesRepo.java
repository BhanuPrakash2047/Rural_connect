package com.example.governmentschemesgamma.repository;

import com.example.governmentschemesgamma.model.Scheme;
import com.example.governmentschemesgamma.model.SourceReferences;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SourceReferencesRepo extends JpaRepository<SourceReferences, Long> {
    List<SourceReferences> findByScheme(Scheme scheme);

    void deleteByScheme(Scheme existingScheme);
}
