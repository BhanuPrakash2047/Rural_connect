package com.example.governmentschemesgamma.repository;

import com.example.governmentschemesgamma.model.Scheme;
import com.example.governmentschemesgamma.model.SchemeSpecificCriterias;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchemeSpecificCriteriasRepo extends JpaRepository<SchemeSpecificCriterias, Long> {
//    List<SchemeSpecificCriterias> findByScheme(Scheme scheme);

//    List<SchemeSpecificCriterias> findByUser(Scheme scheme);

    List<SchemeSpecificCriterias> findByScheme(Scheme scheme);
}
