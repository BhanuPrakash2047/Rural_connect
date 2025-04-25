package com.example.governmentschemesgamma.repository;

import com.example.governmentschemesgamma.model.Enums;
import com.example.governmentschemesgamma.model.Scheme;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
//import com.example.entity.Scheme;

@Repository
public interface SchemeRepository extends JpaRepository<Scheme, Long>, JpaSpecificationExecutor<Scheme> {

    @Query("SELECT s FROM Scheme s WHERE "
            + "(:state IS NULL OR s.state = :state) AND "
            + "(:category IS NULL OR s.category= :category) AND"
            + "(:gender IS NULL OR s.gender = :gender OR s.gender = com.example.governmentschemesgamma.model.Enums.Gender.ALL) AND "
            + "(:caste IS NULL OR s.caste = :caste) AND "
            + "(:minAge IS NULL OR s.end_age >= :minAge) AND "
            + "(:maxAge IS NULL OR s.start_age <= :maxAge) AND "
            + "(:benefitType IS NULL OR s.benefitType = :benefitType) AND "
            + "(:minDisabilityPercentage IS NULL OR s.end_disabilityPercentage >= :minDisabilityPercentage) AND "
            + "(:maxDisabilityPercentage IS NULL OR s.start_disabilityPercentage <= :maxDisabilityPercentage) AND "
            + "(:occupation IS NULL OR s.occupation = :occupation) AND "
            + "(:employmentStatus IS NULL OR s.employmentStatus = :employmentStatus) AND "
            + "(:minority IS NULL OR s.minority = :minority) AND "
            + "(:differentlyAbled IS NULL OR s.differentlyAbled = :differentlyAbled) AND "
            + "(:belowPovertyLine IS NULL OR s.belowPovertyLine = :belowPovertyLine) AND "
            + "(:keyword IS NULL OR LOWER(s.schemeName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "
            + "LOWER(s.benefits) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "
            + "LOWER(s.exclusions) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "
            + "LOWER(s.feedback) LIKE LOWER(CONCAT('%', :keyword, '%')))"
    )
    List<Scheme> searchSchemes(
            @Param("state") Enums.State state,
            @Param("category") Enums.Category category,
            @Param("gender") Enums.Gender gender,
            @Param("caste") Enums.Caste caste,
            @Param("minAge") Integer minAge,
            @Param("maxAge") Integer maxAge,
            @Param("benefitType") Enums.BenefitType benefitType,
            @Param("minDisabilityPercentage") Integer minDisabilityPercentage,
            @Param("maxDisabilityPercentage") Integer maxDisabilityPercentage,
            @Param("occupation") Enums.Occupation occupation,
            @Param("employmentStatus") Enums.EmploymentStatus employmentStatus,
            @Param("minority") Enums.BooleanEnum minority,
            @Param("differentlyAbled") Enums.BooleanEnum differentlyAbled,
            @Param("belowPovertyLine") Enums.BooleanEnum belowPovertyLine,
            @Param("keyword") String keyword
            );

    List<Scheme> findAllByOrderByUpvotesDesc(PageRequest pageRequest);

    List<Scheme> findBySchemeName(String keyword, PageRequest pageRequest);

    List<Scheme> findByCategory(Enums.Category category, PageRequest pageRequest);
}

