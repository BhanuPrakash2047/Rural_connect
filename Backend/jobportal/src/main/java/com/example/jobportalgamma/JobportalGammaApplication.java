package com.example.jobportalgamma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class JobportalGammaApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobportalGammaApplication.class, args);
    }

}
