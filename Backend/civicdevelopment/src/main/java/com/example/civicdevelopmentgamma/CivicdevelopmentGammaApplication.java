package com.example.civicdevelopmentgamma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class CivicdevelopmentGammaApplication {

    public static void main(String[] args) {
        SpringApplication.run(CivicdevelopmentGammaApplication.class, args);
    }

}
