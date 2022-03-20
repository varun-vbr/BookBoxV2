package com.bookboxv2.bookreadservice.feignclients;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "books", url = "http://localhost:8080")
public interface BookClient {
	
	@GetMapping(path = "/books/{bookId}")
    public Map<String, Object> getBooksById(@PathVariable long bookId);

}
