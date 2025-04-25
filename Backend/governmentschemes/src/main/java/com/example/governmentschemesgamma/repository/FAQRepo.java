package com.example.governmentschemesgamma.repository;

import com.example.governmentschemesgamma.model.FAQ;
import com.example.governmentschemesgamma.model.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FAQRepo extends JpaRepository<FAQ, Long> {
    List<FAQ> findByScheme(Scheme scheme);

    void deleteByScheme(Scheme existingScheme);
}
