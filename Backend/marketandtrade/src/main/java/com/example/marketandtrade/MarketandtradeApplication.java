package com.example.marketandtrade;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
//@EnableDiscoveryClient
public class MarketandtradeApplication {

    public static void main(String[] args) {
        SpringApplication.run(MarketandtradeApplication.class, args);
    }

}
