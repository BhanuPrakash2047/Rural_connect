package com.example.apigatewayauth.controllers;

import com.example.apigatewayauth.Repo.PersonDetailsRepo;

import com.example.apigatewayauth.modal.PersonDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

    @Autowired
    private PersonDetailsRepo myUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(value = "/register/user" ,consumes = "application/json")
    public PersonDetails createUser(@RequestBody PersonDetails user) {
        System.out.println("====================================================="+user.getPassword()+"==="+passwordEncoder.encode(user.getPassword()));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return myUserRepository.save(user);
    }
}