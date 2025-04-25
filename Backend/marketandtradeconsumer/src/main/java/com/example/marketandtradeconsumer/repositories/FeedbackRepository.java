package com.example.marketandtradeconsumer.repositories;


import com.example.marketandtradeconsumer.modal.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
//    List<Feedback> findByUser_Username(String username); // Get feedback by user
}