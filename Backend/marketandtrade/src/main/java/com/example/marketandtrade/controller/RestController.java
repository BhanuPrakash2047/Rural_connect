package com.example.marketandtrade.controller;

import com.example.marketandtrade.dto.FeedbackDto;
import com.example.dto.PendingRequestDTO;
import com.example.marketandtrade.model.*;
import com.example.marketandtrade.repositories.*;
import com.example.marketandtrade.service.PendingRequestService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/trade")
public class RestController {

    private final FeedbackRepository feedbackRepository;
    private final PersonDetailsRepository personDetailsRepository;
    private final ReviewRepository reviewRepository;
    private final PendingRequestService pendingRequestService;
    private final PendingRequestRepository pendingRequestRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public RestController(FeedbackRepository feedbackRepository, PersonDetailsRepository personDetailsRepository, ReviewRepository reviewRepository, PendingRequestService pendingRequestService, PendingRequestRepository pendingRequestRepository, OrderRepository orderRepository, ProductRepository productRepository) {
        this.feedbackRepository = feedbackRepository;
        this.personDetailsRepository = personDetailsRepository;
        this.reviewRepository = reviewRepository;
        this.pendingRequestService = pendingRequestService;
        this.pendingRequestRepository = pendingRequestRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    private boolean isAdmin(String roles) {
        return roles.contains("ROLE_Admin");
    }

    private boolean isUser(String roles) {
        return roles.contains("ROLE_User");
    }

    @PostMapping("/feedback")
    public ResponseEntity<String> submitFeedback(@RequestBody FeedbackDto feedback1) {
        // Find the user by username
        PersonDetails user = personDetailsRepository.findById(feedback1.getUsername())
                .orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }

        Feedback feedback = new Feedback();
        feedback.setUser(user);
        feedback.setFeedback(feedback1.getFeedback());
        feedback.setLocation(feedback1.getLocation());

        // Set the full PersonDetails object instead of just username
        feedback.setUser(user);
        feedbackRepository.save(feedback);

        return ResponseEntity.status(HttpStatus.CREATED).body("Feedback submitted successfully!");
    }

//    // 1. Get all reviews by a user
    @GetMapping("/getReviews")
    public ResponseEntity<List<Review>> getReviews(@RequestHeader("userName") String userName) {
        Optional<PersonDetails> buyer = personDetailsRepository.findById(userName);
        if (buyer.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<Review> reviews = reviewRepository.findBySellerUsername(userName);
        return ResponseEntity.ok(reviews);
    }

    // 2. Get all reviews for a productId
    @GetMapping("/getReviews/{productId}")
    public ResponseEntity<List<Review>> getReviewsForProduct(@PathVariable String productId, @RequestHeader String userName) {
        // Checking if the buyer exists
        Optional<PersonDetails> buyer = personDetailsRepository.findById(userName);
        if (buyer.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Fetching all reviews for the product with the given productId
        List<Review> reviews = reviewRepository.findByProduct_ProductId(Long.parseLong(productId));
        if (reviews.isEmpty()) {
            return ResponseEntity.notFound().build();  // Return 404 if no reviews are found for the product
        }

        return ResponseEntity.ok(reviews);  // Return the list of reviews for the product
    }

    @PostMapping("/request_to_seller")
    @Transactional
    public ResponseEntity<PendingRequest> createPendingRequest(@RequestBody PendingRequestDTO requestDTO) {
        return ResponseEntity.ok(pendingRequestService.createPendingRequest(requestDTO));
    }

    //need to create the endpoint point the repsonse from seller.
   // @PostMapping("/response_to_buyer")

    @GetMapping("/buyer/notifications")
    @Transactional
    public ResponseEntity<List<PendingRequest>> getPendingRequestsForBuyer(@RequestHeader("userName") String userName) {
        Optional<PersonDetails> buyer = personDetailsRepository.findById(userName);
        if (buyer.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<PendingRequest> requests = pendingRequestRepository.findByBuyer(buyer.get());
        if (requests.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no requests found
        }
        return ResponseEntity.ok(requests);
    }

    // Fetch pending requests where user is a seller
    @GetMapping("/seller/notifications")
    @Transactional
    public ResponseEntity<List<PendingRequest>> getPendingRequestsForSeller(@RequestHeader String userName) {
        Optional<PersonDetails> seller = personDetailsRepository.findById(userName);
        if (seller.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<PendingRequest> requests = pendingRequestRepository.findBySeller(seller.get());
        if (requests.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(requests);
    }

    // Get orders where the user is the buyer
    @GetMapping("/orders/buyer")
    @Transactional
    public ResponseEntity<List<OrderEntity>> getOrdersForBuyer(@RequestHeader String userName) {
        Optional<PersonDetails> buyer = personDetailsRepository.findById(userName);
        if (buyer.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<OrderEntity> orders = orderRepository.findByBuyer(buyer.get());
        if (orders.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no orders found
        }

        return ResponseEntity.ok(orders);
    }

    // Get orders where the user is the seller
    @GetMapping("/orders/seller")
    @Transactional
    public ResponseEntity<List<OrderEntity>> getOrdersForSeller(@RequestHeader String userName) {
        Optional<PersonDetails> seller = personDetailsRepository.findById(userName);
        if (seller.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<OrderEntity> orders = orderRepository.findBySeller(seller.get());
        if (orders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(orders);
    }

    @PostMapping("/seller/update")
    @Transactional
    public ResponseEntity<String> updateProduct(@RequestHeader("userName") String userName,
                                                @RequestBody ProductEntity updatedProduct) {
        Optional<PersonDetails> sellerOptional = personDetailsRepository.findById(userName);
        if (sellerOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Seller not found");
        }

        Optional<ProductEntity> existingProductOptional = productRepository.findById(updatedProduct.getProductId());
        if (existingProductOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Product not found");
        }

        ProductEntity existingProduct = existingProductOptional.get();

        // Make sure the seller is the owner of the product
        if (!existingProduct.getSeller().getIdno().equals(userName)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to update this product.");
        }

        // 🔥 Set the correct version before saving
        updatedProduct.setVersion(existingProduct.getVersion());

        // Save the updated product
        productRepository.save(updatedProduct);
        return ResponseEntity.ok("Product updated successfully!");
    }

    @PostMapping("/seller/add")
    @Transactional
    public ResponseEntity<String> addProduct(@RequestHeader("userName") String userName,
                                             @RequestBody ProductEntity productEntity) {
        Optional<PersonDetails> sellerOptional = personDetailsRepository.findById(userName);

        if (sellerOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Seller not found");
        }

        PersonDetails seller = sellerOptional.get();
        productEntity.setSeller(seller); // Set the seller

        // ✅ Ensure the product ID is null (so Hibernate knows it's a new product)
        productEntity.setProductId(null);

        // ✅ Ensure version starts from 0 (helps with updates later)
        productEntity.setVersion(0L);

        productRepository.save(productEntity);
        return ResponseEntity.ok("Product added successfully!");
    }




}






