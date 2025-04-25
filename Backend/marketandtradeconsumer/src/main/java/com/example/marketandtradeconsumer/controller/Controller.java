package com.example.marketandtradeconsumer.controller;

import com.example.dto.UserDTO;
import com.example.marketandtradeconsumer.modal.Notification;
import com.example.marketandtradeconsumer.modal.PersonDetails;
import com.example.marketandtradeconsumer.repositories.NotificationRepository;
import com.example.marketandtradeconsumer.repositories.PersonDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController("/trade1")
public class Controller {

    @Autowired
    PersonDetailsRepository personDetailsRepository;
    @Autowired
    NotificationRepository notificationRepository;
    @Autowired
    private KafkaTemplate<String,UserDTO> kafkaTemplate;


    @PostMapping("/permission-to-user")
    public String permissionToUser(@RequestParam String buyer, @RequestParam String seller,@RequestParam String productTitle) throws Exception {
         Optional<PersonDetails> buy= Optional.ofNullable(personDetailsRepository.findById(buyer).
                 orElseThrow(() -> new Exception("user not found")));
         PersonDetails seller1=personDetailsRepository.findById(seller).
                 orElseThrow(() -> new Exception("user not found"));

        UserDTO user=new UserDTO();
        user.setFirstName(seller1.getFname());
        user.setLastName(seller1.getLname());
        user.setEmail(seller1.getEmail());
        user.getPhone(seller1.getPhone());

        Notification notify=new Notification();
        notify.setUser(buy.get());
        notify.setCreatedAt(LocalDateTime.now());
        notify.setMessage("For Product "+productTitle+"\n"+user.toString());


        notificationRepository.save(notify);


        kafkaTemplate.send("accepted-topic",user);
        return "Success";



    }
}
