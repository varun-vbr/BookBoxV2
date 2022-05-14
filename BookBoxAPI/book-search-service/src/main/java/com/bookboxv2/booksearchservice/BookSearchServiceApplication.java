package com.bookboxv2.booksearchservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@SpringBootApplication
@EnableFeignClients
public class BookSearchServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(BookSearchServiceApplication.class, args);
	}
}
