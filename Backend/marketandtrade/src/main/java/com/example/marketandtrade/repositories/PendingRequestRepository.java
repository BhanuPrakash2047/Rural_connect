package com.example.marketandtrade.repositories;

import com.example.marketandtrade.model.PendingRequest;
import com.example.marketandtrade.model.PersonDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PendingRequestRepository extends JpaRepository<PendingRequest, Long> {

    @Query("SELECT p FROM PendingRequest p WHERE p.buyer = :buyer")
    List<PendingRequest> findByBuyer(@Param("buyer") PersonDetails buyer);

    @Query("SELECT p FROM PendingRequest p WHERE p.seller = :seller")
    List<PendingRequest> findBySeller(@Param("seller") PersonDetails seller);
}