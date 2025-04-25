package com.example.governmentschemesgamma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class GovernmentschemesGammaApplication {

    public static void main(String[] args) {
        SpringApplication.run(GovernmentschemesGammaApplication.class, args);
    }

}
