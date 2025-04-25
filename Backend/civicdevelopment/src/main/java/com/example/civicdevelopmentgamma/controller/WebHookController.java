package com.example.civicdevelopmentgamma.controller;
import com.example.civicdevelopmentgamma.model.Admin;
import com.example.civicdevelopmentgamma.model.Issue;
import com.example.civicdevelopmentgamma.model.IssueStatus;
import com.example.civicdevelopmentgamma.model.PersonDetails;
import com.example.civicdevelopmentgamma.repository.AdminRepository;
import com.example.civicdevelopmentgamma.repository.IssueRepository;
import com.example.civicdevelopmentgamma.repository.PersonDetailsRepo;
import com.twilio.http.HttpMethod;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Gather;
import com.twilio.twiml.voice.Say;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/civic")
public class WebHookController {

    @Autowired
    PersonDetailsRepo personDetailsRepo;
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private AdminRepository adminRepo;

    @PostMapping("/twilio-webhook")
    public String handleIVRRequest(@RequestParam("From") String phoneNumber) {
        VoiceResponse.Builder responseBuilder = new VoiceResponse.Builder();

        // Ask the user to select an issue category
        Say askForInput = new Say.Builder("Welcome to the civic issue reporting system. " +
                "Press 1 for Water issues, Press 2 for Electricity issues, Press 3 for Road issues.").build();

        // Gather user input (DTMF)
        Gather gather = new Gather.Builder()
                .numDigits(1)  // Expect only one digit
                .action("/twilio-process-input")  // Where Twilio will send `Digits`
                .method(HttpMethod.POST)
                .build();

        responseBuilder.say(askForInput).gather(gather);

        return responseBuilder.build().toXml();
    }


    @PostMapping("/twilio-process-input")
    public String processUserInput(@RequestParam("From") String phoneNumber,
                                   @RequestParam("Digits") String userInput) {

        // Determine issue category
        String category;
        switch (userInput) {
            case "1": category = "Water Issue"; break;
            case "2": category = "Electricity Issue"; break;
            case "3": category = "Road Issue"; break;
            default:
                return new VoiceResponse.Builder()
                        .say(new Say.Builder("Invalid input. Please try again.").build())
//                        .redirect("/twilio-webhook")  // Redirect user back to main menu
                        .build()
                        .toXml();
        }

        // Ask user to describe the issue
        Say askForDescription = new Say.Builder("Please describe your issue after the beep. Press any key when finished.").build();
        com.twilio.twiml.voice.Record record = new com.twilio.twiml.voice.Record.Builder()
                .transcribe(true)
                .playBeep(true)
                .finishOnKey("#")
                .transcribeCallback("/twilio-transcription-handler")
                .action("/twilio-record-handler")  // Twilio will send RecordingUrl here
                .method(HttpMethod.POST)
                .build();

        VoiceResponse response = new VoiceResponse.Builder()
                .say(askForDescription)
                .record(record)  // Start recording user speech
                .build();

        return response.toXml();
    }

    @PostMapping("/twilio-transcription-handler")
    public String handleTranscription(@RequestParam Map<String, String> allParams) {
        String phoneNumber = allParams.get("From");
        String transcriptionText = allParams.get("TranscriptionText");

        if (transcriptionText == null || transcriptionText.trim().isEmpty()) {
            System.err.println("⚠️ Error: Transcription is missing!");
            return "Error: Missing TranscriptionText";
        }

        System.out.println("📞 Caller: " + phoneNumber);
        System.out.println("📝 Transcribed Text: " + transcriptionText);

        // Find the user by phone number
        Optional<PersonDetails> personOpt = personDetailsRepo.findByPhone(phoneNumber);
        if (personOpt.isEmpty()) {
            System.err.println("⚠️ Error: User not found for phone " + phoneNumber);
            return "Error: User not found";
        }

        PersonDetails person = personOpt.get();

        // Find an admin for the user's location
        Optional<Admin> adminOpt = adminRepo.findByLocation(person.getLocation());
        if (adminOpt.isEmpty()) {
            System.err.println("⚠️ Error: No admin found for location " + person.getLocation());
            return "Error: No admin assigned for this location";
        }

        Admin assignedAdmin = adminOpt.get();

        // Create a new issue
        Issue newIssue = new Issue();
        newIssue.setTitle("IVR Reported Issue");
        newIssue.setDescription(transcriptionText);
        newIssue.setLocation(person.getLocation());
        newIssue.setStatus(IssueStatus.PENDING);
        newIssue.setCreatedAt(LocalDateTime.now());
        newIssue.setUpdatedAt(LocalDateTime.now());
        newIssue.setUser(person);
        newIssue.setAssignedAdmin(assignedAdmin);
        newIssue.setCount(1);
        // **✅ FIX: Set a default category**
        newIssue.setCategory("Development"); // Change this based on your use case

        // Save the new issue
        issueRepository.save(newIssue);

        System.out.println("✅ New issue created successfully and assigned to admin: " + assignedAdmin.getName());

        return "New issue created and assigned to admin successfully!";
    }



    @PostMapping("/twilio-record-handler")
    public String handleRecording(@RequestParam("From") String phoneNumber,
                                  @RequestParam("RecordingUrl") String recordingUrl
                               ) {
        System.out.println("Recording received: " + recordingUrl);

        return new VoiceResponse.Builder()
                .say(new Say.Builder("Your issue has been recorded successfully.After transcription It will be updated to Database").build())
                .build()
                .toXml();
    }


}
