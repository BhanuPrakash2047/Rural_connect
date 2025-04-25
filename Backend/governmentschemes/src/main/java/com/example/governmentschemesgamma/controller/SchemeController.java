package com.example.governmentschemesgamma.controller;
import com.example.governmentschemesgamma.dto.SchemeDetailsResponse;
import com.example.governmentschemesgamma.dto.SchemeRequestDTO;
import com.example.governmentschemesgamma.dto.UserEligibilityDetailsDTO;
import com.example.governmentschemesgamma.model.*;
import com.example.governmentschemesgamma.repository.*;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.example.governmentschemesgamma.model.Enums.*;

@RestController
@RequestMapping("/api/schemes")
public class SchemeController {

    @Autowired private SchemeRepository schemeRepo;
    @Autowired private CommentRepository commentRepo;
    @Autowired private NotificationRepository notificationRepo;
    @Autowired private PersonDetailsRepo personRepo;
    @Autowired private PersonDetailsRepo personDetailsRepo;
    @Autowired private ApplicationProcessRepo applicationProcessRepo;
    @Autowired private DocumentsRequirementRepo documentsRequirementRepo;
    @Autowired private EligibilitiesRepo eligibilitiesRepo;
    @Autowired private FAQRepo faqRepo;
    @Autowired private InnerCategoriesRepo innerCategoriesRepo;
    @Autowired private SchemeSpecificCriteriasRepo schemeSpecificCriteriasRepo;
    @Autowired private SourceReferencesRepo sourceReferencesRepo;
//    @Autowired private LikeRepository likeRepo;
//    @Autowired private PostRepository postRepo;

    private boolean isAdmin(List<String> roles) {
        return roles.contains("ROLE_Admin");
    }

    // 1. SCHEME MANAGEMENT ENDPOINTS
    @PostMapping("/scheme")
    public ResponseEntity<?> addScheme(
            @RequestBody SchemeRequestDTO schemeRequest,
            @RequestHeader("userName") String username,
            @RequestHeader("roles") List<String> roles) {

        try {
            Optional<PersonDetails> contributor = personRepo.findById(username);
            if (contributor.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error: Invalid user credentials");
            }

            // Create and save the scheme first
            Scheme scheme = new Scheme();
            // Map basic scheme properties
            scheme.setSchemeName(schemeRequest.getSchemeName());
            scheme.setState(schemeRequest.getState());
            scheme.setGender(schemeRequest.getGender());
            scheme.setStart_age(schemeRequest.getStart_age());
            scheme.setEnd_age(schemeRequest.getEnd_age());
            scheme.setCaste(schemeRequest.getCaste());
            scheme.setResidence(schemeRequest.getResidence());
            scheme.setMinority(schemeRequest.getMinority());
            scheme.setDifferentlyAbled(schemeRequest.getDifferentlyAbled());
            scheme.setBenefitType(schemeRequest.getBenefitType());
            scheme.setDbtScheme(schemeRequest.getDbtScheme());
            scheme.setStart_disabilityPercentage(schemeRequest.getStart_disabilityPercentage());
            scheme.setEnd_disabilityPercentage(schemeRequest.getEnd_disabilityPercentage());
            scheme.setBelowPovertyLine(schemeRequest.getBelowPovertyLine());
            scheme.setGovernmentEmployee(schemeRequest.getGovernmentEmployee());
            scheme.setEmploymentStatus(schemeRequest.getEmploymentStatus());
            scheme.setStudent(schemeRequest.getStudent());
            scheme.setOccupation(schemeRequest.getOccupation());
            scheme.setBenefits(schemeRequest.getBenefits());
            scheme.setExclusions(schemeRequest.getExclusions());
            scheme.setContributor(contributor.get());
            scheme.setCategory(schemeRequest.getCategory());
            // Save the scheme to get an ID
            Scheme savedScheme = schemeRepo.save(scheme);

            // Now save the related entities

            // 1. Save Document Requirements
            if (schemeRequest.getDocumentRequirements() != null && !schemeRequest.getDocumentRequirements().isEmpty()) {
                for (String docName : schemeRequest.getDocumentRequirements()) {
                    System.out.println(docName);
                    DocumentRequirement doc = new DocumentRequirement();
                    doc.setDocumentName(docName);
                    doc.setScheme(savedScheme);
                    documentsRequirementRepo.save(doc);
                }
            }

            // 2. Save Eligibility Criteria
            if (schemeRequest.getEligibilities() != null && !schemeRequest.getEligibilities().isEmpty()) {
                for (String eligibility : schemeRequest.getEligibilities()) {
                    Eligibilities elig = new Eligibilities();
                    elig.setEligibilities(eligibility);
                    elig.setScheme(savedScheme);
                    eligibilitiesRepo.save(elig);
                }
            }

            // 3. Save Application Process Steps
            if (schemeRequest.getApplicationProcessSteps() != null && !schemeRequest.getApplicationProcessSteps().isEmpty()) {
                for (String step : schemeRequest.getApplicationProcessSteps()) {
                    System.out.println("Thi is step"+step);
                    ApplicationProcess process = new ApplicationProcess();
                    process.setApplicationProcessSteps(step);
                    process.setScheme(savedScheme);
                    applicationProcessRepo.save(process);
                }
            }

            // 4. Save FAQs
            if (schemeRequest.getFaqs() != null && !schemeRequest.getFaqs().isEmpty()) {
                for (SchemeRequestDTO.FAQItem faqItem : schemeRequest.getFaqs()) {
                    FAQ faq = new FAQ();
                    faq.setFaqKey(faqItem.getQuestion());
                    faq.setFaqValue(faqItem.getAnswer());
                    faq.setScheme(savedScheme);
                    faqRepo.save(faq);
                }
            }

            // 5. Save Source References
            if (schemeRequest.getSourceReferences() != null && !schemeRequest.getSourceReferences().isEmpty()) {
                for (String reference : schemeRequest.getSourceReferences()) {
                    SourceReferences source = new SourceReferences();
                    System.out.println("THis is "+reference);
                    source.setReference(reference);
                    source.setScheme(savedScheme);
                    sourceReferencesRepo.save(source);
                }
            }

            if (schemeRequest.getSchemeSpecificCriterias() != null && !schemeRequest.getSchemeSpecificCriterias().isEmpty()) {
                for (String reference : schemeRequest.getSchemeSpecificCriterias()) {
                    SchemeSpecificCriterias source = new SchemeSpecificCriterias();
                    System.out.println("THis is "+reference);
                    source.setCriteria(reference);
                    source.setScheme(savedScheme);
                    schemeSpecificCriteriasRepo.save(source);
                }
            }





            // Create notification for admins when a new scheme is added
            Notification notification = new Notification();
            notification.setMessage("New scheme added: " + scheme.getSchemeName());
            notification.setNotificationType("NEW_SCHEME");
            notification.setStatus("PENDING");
            notification.setSentDate(LocalDateTime.now());
            notificationRepo.save(notification);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedScheme);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating scheme: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllSchemes(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        try {
            Page<Scheme> schemes;

            if (keyword != null && !keyword.trim().isEmpty()) {
                // Search schemes by keyword in name or description
                schemes = (Page<Scheme>) schemeRepo.findBySchemeName(keyword,PageRequest.of(page,size));
            } else {
                schemes = schemeRepo.findAll(PageRequest.of(page,size));
            }

//            // Implement pagination manually
//            int startIndex = page * size;
//            int endIndex = Math.min(startIndex + size, schemes.size());
//
//            if (startIndex > schemes.size()) {
//                return ResponseEntity.ok(new ArrayList<>());
//            }

//            List<Scheme> pagedSchemes = schemes.subList(startIndex, endIndex);

            return ResponseEntity.ok(schemes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching schemes: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<?> geSchemeDetails(@PathVariable Long id) {
        try {
            Optional<Scheme> schemeOpt = schemeRepo.findById(id);
            if (schemeOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Error: Scheme not found with id: " + id);
            }


            Scheme scheme = schemeOpt.get();

            // Get comments for this scheme
            List<Comment> comments = commentRepo.findBySchemeReferring(scheme);

            // Get document requirements
            List<DocumentRequirement> documentRequirements = documentsRequirementRepo.findByScheme(scheme);

            // Get eligibilities
            List<Eligibilities> eligibilities = eligibilitiesRepo.findByScheme(scheme);

            // Get application process steps
            List<ApplicationProcess> applicationProcesses = applicationProcessRepo.findByScheme(scheme);

            // Get FAQs
            List<FAQ> faqs = faqRepo.findByScheme(scheme);

            // Get source references
            List<SourceReferences> sourceReferences = sourceReferencesRepo.findByScheme(scheme);

            List<SchemeSpecificCriterias> schemeSpecificCriterias=schemeSpecificCriteriasRepo.findByScheme(scheme);


            // Create response object with scheme and related data
            SchemeDetailsResponse response = new SchemeDetailsResponse();
            response.setScheme(scheme);
            response.setComments(comments);
            response.setDocumentRequirements(documentRequirements);
            response.setEligibilities(eligibilities);
            response.setApplicationProcesses(applicationProcesses);
            response.setFaqs(faqs);
            response.setSourceReferences(sourceReferences);
            response.setSchemeSpecificCriterias(schemeSpecificCriterias);
            for(SchemeSpecificCriterias sh:schemeSpecificCriterias) System.out.println("This is criteria"+sh.getCriteria());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching scheme details: " + e.getMessage());
        }
    }
    @Transactional
    @PutMapping("/schemes/{id}")
    public ResponseEntity<?> updateScheme(
            @PathVariable Long id,
            @RequestBody SchemeRequestDTO schemeRequest,
            @RequestHeader("username") String username,
            @RequestHeader("Role") List<String> roles) {
        try {
            PersonDetails personDetails = personDetailsRepo.findById(username)
                    .orElseThrow(() -> new RuntimeException("Error: Person not found"));

            Optional<Scheme> existingSchemeOpt = schemeRepo.findById(id);
            if (existingSchemeOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Error: Scheme not found with id: " + id);
            }

            Scheme existingScheme = existingSchemeOpt.get();

            // Check if user is contributor or admin
            if (!existingScheme.getContributor().getIdno().equals(personDetails.getIdno())
                    && !isAdmin(roles)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Error: Only scheme contributors and admins can update schemes");
            }

            // Update the scheme basic properties
            existingScheme.setSchemeName(schemeRequest.getSchemeName());
            existingScheme.setState(schemeRequest.getState());
            existingScheme.setGender(schemeRequest.getGender());
            existingScheme.setStart_age(schemeRequest.getStart_age());
            existingScheme.setEnd_age(schemeRequest.getEnd_age());
            existingScheme.setCaste(schemeRequest.getCaste());
            existingScheme.setResidence(schemeRequest.getResidence());
            existingScheme.setMinority(schemeRequest.getMinority());
            existingScheme.setDifferentlyAbled(schemeRequest.getDifferentlyAbled());
            existingScheme.setBenefitType(schemeRequest.getBenefitType());
            existingScheme.setDbtScheme(schemeRequest.getDbtScheme());
            existingScheme.setStart_disabilityPercentage(schemeRequest.getStart_disabilityPercentage());
            existingScheme.setEnd_disabilityPercentage(schemeRequest.getEnd_disabilityPercentage());
            existingScheme.setBelowPovertyLine(schemeRequest.getBelowPovertyLine());
            existingScheme.setGovernmentEmployee(schemeRequest.getGovernmentEmployee());
            existingScheme.setEmploymentStatus(schemeRequest.getEmploymentStatus());
            existingScheme.setStudent(schemeRequest.getStudent());
            existingScheme.setOccupation(schemeRequest.getOccupation());
            existingScheme.setBenefits(schemeRequest.getBenefits());
            existingScheme.setExclusions(schemeRequest.getExclusions());

            // Save the updated scheme
            Scheme updatedScheme = schemeRepo.save(existingScheme);

            // Update related entities by removing old ones and adding new ones

            // 1. Update Document Requirements
            documentsRequirementRepo.deleteByScheme(existingScheme);
            if (schemeRequest.getDocumentRequirements() != null && !schemeRequest.getDocumentRequirements().isEmpty()) {
                for (String docName : schemeRequest.getDocumentRequirements()) {
                    DocumentRequirement doc = new DocumentRequirement();
                    doc.setDocumentName(docName);
                    doc.setScheme(updatedScheme);
                    documentsRequirementRepo.save(doc);
                }
            }

            // 2. Update Eligibility Criteria
            eligibilitiesRepo.deleteByScheme(existingScheme);
            if (schemeRequest.getEligibilities() != null && !schemeRequest.getEligibilities().isEmpty()) {
                for (String eligibility : schemeRequest.getEligibilities()) {
                    Eligibilities elig = new Eligibilities();
                    elig.setEligibilities(eligibility);
                    elig.setScheme(updatedScheme);
                    eligibilitiesRepo.save(elig);
                }
            }

            // 3. Update Application Process Steps
            applicationProcessRepo.deleteByScheme(existingScheme);
            if (schemeRequest.getApplicationProcessSteps() != null && !schemeRequest.getApplicationProcessSteps().isEmpty()) {
                for (String step : schemeRequest.getApplicationProcessSteps()) {
                    ApplicationProcess process = new ApplicationProcess();
                    process.setApplicationProcessSteps(step);
                    process.setScheme(updatedScheme);
                    applicationProcessRepo.save(process);
                }
            }

            // 4. Update FAQs
            faqRepo.deleteByScheme(existingScheme);
            if (schemeRequest.getFaqs() != null && !schemeRequest.getFaqs().isEmpty()) {
                for (SchemeRequestDTO.FAQItem faqItem : schemeRequest.getFaqs()) {
                    FAQ faq = new FAQ();
                    faq.setFaqKey(faqItem.getQuestion());
                    faq.setFaqValue(faqItem.getAnswer());
                    faq.setScheme(updatedScheme);
                    faqRepo.save(faq);
                }
            }

            // 5. Update Source References
            sourceReferencesRepo.deleteByScheme(existingScheme);
            if (schemeRequest.getSourceReferences() != null && !schemeRequest.getSourceReferences().isEmpty()) {
                for (String reference : schemeRequest.getSourceReferences()) {
                    SourceReferences source = new SourceReferences();
                    source.setReference(reference);
                    source.setScheme(updatedScheme);
                    sourceReferencesRepo.save(source);
                }
            }

            // Create notification about scheme update
            Notification notification = new Notification();
            notification.setMessage("Scheme updated: " + updatedScheme.getSchemeName());
            notification.setNotificationType("SCHEME_UPDATE");
            notification.setStatus("PENDING");
            notification.setSentDate(LocalDateTime.now());
            notificationRepo.save(notification);

            return ResponseEntity.ok(updatedScheme);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating scheme: " + e.getMessage());
        }
    }

    @Transactional
    @DeleteMapping("/schemes/{id}")
    public ResponseEntity<?> deleteScheme(
            @PathVariable Long id,
            @RequestHeader("username") String username,
            @RequestHeader("Role") List<String> roles) {
        try {
            Optional<Scheme> schemeOpt = schemeRepo.findById(id);
            if (schemeOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Error: Scheme not found with id: " + id);
            }

            Scheme scheme = schemeOpt.get();

            PersonDetails personDetails = personDetailsRepo.findById(username)
                    .orElseThrow(() -> new RuntimeException("Error: Person not found"));

            // Check if user is contributor or admin
            if (!scheme.getContributor().getIdno().equals(personDetails.getIdno())
                    && !isAdmin(roles)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Error: Only scheme contributors and admins can delete schemes");
            }

            // Delete all related entities first
            // 1. Delete comments
            List<Comment> comments = commentRepo.findBySchemeReferring(scheme);
            commentRepo.deleteAll(comments);

            // 2. Delete document requirements
            documentsRequirementRepo.deleteByScheme(scheme);

            // 3. Delete eligibilities
            eligibilitiesRepo.deleteByScheme(scheme);

            // 4. Delete application processes
            applicationProcessRepo.deleteByScheme(scheme);

            // 5. Delete FAQs
            faqRepo.deleteByScheme(scheme);

            // 6. Delete source references
            sourceReferencesRepo.deleteByScheme(scheme);

            // Finally delete the scheme
            schemeRepo.deleteById(id);

            // Create notification about scheme deletion
            Notification notification = new Notification();
            notification.setMessage("Scheme deleted: " + scheme.getSchemeName());
            notification.setNotificationType("SCHEME_DELETE");
            notification.setStatus("PENDING");
            notification.setSentDate(LocalDateTime.now());
            notificationRepo.save(notification);

            return ResponseEntity.ok("Scheme deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting scheme: " + e.getMessage());
        }
    }
    @GetMapping("/filters/search")
    public ResponseEntity<?> searchSchemes(
            @RequestParam(required = false) Enums.State state,
            @RequestParam(required = false) Enums.Category category,
            @RequestParam(required = false) Enums.Gender gender,
            @RequestParam(required = false) Enums.Caste caste,
            @RequestParam(required = false) Integer minAge,
            @RequestParam(required = false) Integer maxAge,
            @RequestParam(required = false) Enums.BenefitType benefitType,
            @RequestParam(required = false) Integer minDisabilityPercentage,
            @RequestParam(required = false) Integer maxDisabilityPercentage,
            @RequestParam(required = false) Enums.Occupation occupation,
            @RequestParam(required = false) Enums.EmploymentStatus employmentStatus,
            @RequestParam(required = false) Enums.BooleanEnum minority,
            @RequestParam(required = false) Enums.BooleanEnum differentlyAbled,
            @RequestParam(required = false) Enums.BooleanEnum belowPovertyLine,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size
    ) {
        try {
            List<Scheme> schemes = (List<Scheme>) schemeRepo.searchSchemes(
                    state, category, gender, caste, minAge, maxAge, benefitType,
                    minDisabilityPercentage, maxDisabilityPercentage,
                    occupation, employmentStatus, minority,
                    differentlyAbled, belowPovertyLine, keyword);


            return ResponseEntity.ok(schemes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error searching schemes: " + e.getMessage());
        }
    }



    @GetMapping("/{category}")
    public ResponseEntity<?> getSchemesByCategory(@PathVariable Enums.Category category,
                                                  @RequestParam(required = false, defaultValue = "0") int page,
                                                  @RequestParam(required = false, defaultValue = "10") int size){

        try{
            Page<Scheme> schemes= (Page<Scheme>) schemeRepo.findByCategory(category,PageRequest.of(page,size));
            return ResponseEntity.ok(schemes);
        }
        catch(Exception e){
            return ResponseEntity.status(401).body("Category Not Found!");
        }

    }


//    // 3. VOTING & FEEDBACK ENDPOINTS
//    @PostMapping("/feedback/vote/{schemeId}")
//    public ResponseEntity<?> voteForScheme(
//            @PathVariable Long schemeId,
//            @RequestParam boolean upvote,
//            @RequestHeader("username") String username) {
//        try {
//            Optional<Scheme> scheme = schemeRepo.findById(schemeId);
//            if (scheme.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                        .body("Error: Scheme not found");
//            }
//
//            Optional<PersonDetails> user = personRepo.findById(username);
//            if (user.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                        .body("Error: Invalid user credentials");
//            }
//
//            // Check if user has already voted
//            Optional<Comment> existingVote = commentRepo.findByUserAndSchemeReferring(user.get(), scheme.get());
//
//            Comment vote;
//            if (existingVote.isPresent()) {
//                // Update existing vote
//                vote = existingVote.get();
//
//                // If vote changed from downvote to upvote
//                if (!vote.getLiked() && upvote) {
//                    scheme.get().setUpvotes(scheme.get().getUpvotes() + 1);
//                }
//                // If vote changed from upvote to downvote
//                else if (vote.getLiked() && !upvote) {
//                    scheme.get().setUpvotes(scheme.get().getUpvotes() - 1);
//                }
//
//                vote.setLiked(upvote);
//            } else {
//                // Create new vote
//                vote = new Comment();
//                vote.setUser(user.get());
//                vote.setLiked(upvote);
//                vote.setCreationDate(LocalDateTime.now());
//                vote.setSchemeReferring(scheme.get());
//
//                // Update scheme upvotes
//                if (upvote) {
//                    scheme.get().setUpvotes(scheme.get().getUpvotes() + 1);
//                }
//            }
//
//            schemeRepo.save(scheme.get());
//            return ResponseEntity.status(HttpStatus.CREATED).body(commentRepo.save(vote));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error recording vote: " + e.getMessage());
//        }
//    }
//
//    @GetMapping("/feedback/votes/{schemeId}")
//    public ResponseEntity<?> getSchemeVotes(@PathVariable Long schemeId) {
//        try {
//            Optional<Scheme> scheme = schemeRepo.findById(schemeId);
//            if (scheme.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                        .body("Error: Scheme not found");
//            }
//
//            List<Comment> votes = commentRepo.findBySchemeReferringAndLikedIsNotNull(scheme.get());
//            return ResponseEntity.ok(votes);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error fetching votes: " + e.getMessage());
//        }
//    }

    @PostMapping("/feedback/comment/{schemeId}/{commentText}")
    public ResponseEntity<?> addComment(
            @PathVariable Long schemeId,
            @PathVariable("commentText") String commenty,
            @RequestHeader("userName") String username) {
        try {
            Optional<Scheme> scheme = schemeRepo.findById(schemeId);
            if (scheme.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Error: Scheme not found");
            }

            Optional<PersonDetails> user = personRepo.findById(username);
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error: Invalid user credentials");
            }

            Comment comment = new Comment();
            comment.setComment(commenty);
            comment.setCreationDate(LocalDateTime.now());
            comment.setSchemeReferring(scheme.get());
            comment.setUser(user.get());

            return ResponseEntity.status(HttpStatus.CREATED).body(commentRepo.save(comment));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding comment: " + e.getMessage());
        }
    }

    @GetMapping("/feedback/comments/{schemeId}")
    public ResponseEntity<?> getSchemeComments(@PathVariable Long schemeId) {
        try {
            Optional<Scheme> scheme = schemeRepo.findById(schemeId);
            if (scheme.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Error: Scheme not found");
            }

            List<Comment> comments = commentRepo.findBySchemeReferringAndCommentIsNotNull(scheme.get());
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching comments: " + e.getMessage());
        }
    }


    // 5. USER DASHBOARD ENDPOINTS

    // 6. ELIGIBILITY CHECK ENDPOINT
    @PostMapping("/{schemeId}/check-eligibility")
    public ResponseEntity<?> checkEligibility(
            @PathVariable Long schemeId,
            @RequestBody UserEligibilityDetailsDTO userDetails,
            @RequestHeader("userName") String username,
            @RequestHeader("roles") List<String> roles) {
        System.out.println(userDetails.toString());

        try {
            Scheme scheme = schemeRepo.findById(schemeId)
                    .orElseThrow(() -> new RuntimeException("Scheme not found"));

            EligibilityResult result = checkEligibilityCriteria(userDetails, scheme);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error checking eligibility: " + e.getMessage());
        }
    }

    private EligibilityResult checkEligibilityCriteria(UserEligibilityDetailsDTO user, Scheme scheme) {
        EligibilityResult result = new EligibilityResult();
        result.setEligible(true);
        List<String> reasons = new ArrayList<>();

        // Age check
        if (user.getAge() < scheme.getStart_age() || user.getAge() > scheme.getEnd_age()) {
            result.setEligible(false);
            reasons.add(String.format("Age should be between %d and %d years",
                    scheme.getStart_age(), scheme.getEnd_age()));
        }

        // Gender check with ALL case
        if (scheme.getGender() != null &&
                scheme.getGender() != Gender.ALL &&
                user.getGender() != scheme.getGender()) {
            result.setEligible(false);
            reasons.add("Gender criteria not met");
        }

        // State check
        if (scheme.getState() != null && user.getState() != scheme.getState()) {
            result.setEligible(false);
            reasons.add("State criteria not met");
        }

        // Caste check
        if (scheme.getCaste() != null && user.getCaste() != scheme.getCaste()) {
            result.setEligible(false);
            reasons.add("Caste criteria not met");
        }

        // Residence check
        if (scheme.getResidence() != null && user.getResidence() != scheme.getResidence()) {
            result.setEligible(false);
            reasons.add("Residence criteria not met");
        }

        // Minority check
        if (scheme.getMinority() == BooleanEnum.YES)
            if (user.getMinority() != BooleanEnum.YES) {
                result.setEligible(false);
                reasons.add("Minority status criteria not met");
            }

        // Differently abled check with percentage range
        if (scheme.getDifferentlyAbled() == BooleanEnum.YES) {
            if (user.getDifferentlyAbled() != BooleanEnum.YES) {
                result.setEligible(false);
                reasons.add("Differently abled criteria not met");
            } else if (scheme.getStart_disabilityPercentage() != null &&
                    scheme.getEnd_disabilityPercentage() != null &&
                    (user.getDisabilityPercentage() < scheme.getStart_disabilityPercentage() ||
                            user.getDisabilityPercentage() > scheme.getEnd_disabilityPercentage())) {
                result.setEligible(false);
                reasons.add(String.format("Disability percentage should be between %d and %d",
                        scheme.getStart_disabilityPercentage(), scheme.getEnd_disabilityPercentage()));
            }
        }

        // Below Poverty Line check
        if (scheme.getBelowPovertyLine() == BooleanEnum.YES &&
                user.getBelowPovertyLine() != BooleanEnum.YES) {
            result.setEligible(false);
            reasons.add("BPL criteria not met");
        }

        // Government Employee check
        if (scheme.getGovernmentEmployee() == BooleanEnum.NO &&
                user.getGovernmentEmployee() == BooleanEnum.YES) {
            result.setEligible(false);
            reasons.add("Government employee not eligible for this scheme");
        }

        // Employment Status check
        if (scheme.getEmploymentStatus() != null &&
                user.getEmploymentStatus() != scheme.getEmploymentStatus()) {
            result.setEligible(false);
            reasons.add("Employment status criteria not met");
        }

        // Student check
        if (scheme.getStudent() == BooleanEnum.YES && user.getStudent() != BooleanEnum.YES) {
            result.setEligible(false);
            reasons.add("Student status criteria not met");
        }

        // Occupation check
        if (scheme.getOccupation() != null && user.getOccupation() != scheme.getOccupation()) {
            result.setEligible(false);
            reasons.add("Occupation criteria not met");
        }


        Map<String, Boolean> schemeSpecificCriterias = user.getSchemeSpecificCriterias();
        for (Map.Entry<String, Boolean> entry : schemeSpecificCriterias.entrySet()) {
            if (!entry.getValue()) {  // If any condition is false, eligibility fails
                result.setEligible(false);
                reasons.add(entry.getKey().toString() + " criteria not met");
            }
        }
        System.out.println("eligible Or not"+result.eligible);
        for(String reason : reasons) {
            System.out.println("this is the reson why tyou dont eligible"+reason);
        }
        result.setReasons(reasons);
        return result;

    }
    @Data
    class EligibilityResult {
        private boolean eligible;
        private List<String> reasons = new ArrayList<>();

        public boolean isEligible() {
            return eligible;
        }

        public void setEligible(boolean eligible) {
            this.eligible = eligible;
        }

        public List<String> getReasons() {
            return reasons;
        }

        public void setReasons(List<String> reasons) {
            this.reasons = reasons;
        }
    }
}
