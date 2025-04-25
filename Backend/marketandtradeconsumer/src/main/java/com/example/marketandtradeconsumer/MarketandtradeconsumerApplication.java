package com.example.marketandtradeconsumer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
//import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MarketandtradeconsumerApplication {

    public static void main(String[] args) {
        SpringApplication.run(MarketandtradeconsumerApplication.class, args);
    }

}
