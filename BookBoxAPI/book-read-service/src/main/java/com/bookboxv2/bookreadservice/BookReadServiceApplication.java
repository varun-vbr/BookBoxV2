package com.bookboxv2.bookreadservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BookReadServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookReadServiceApplication.class, args);
	}

}
