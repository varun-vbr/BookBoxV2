package com.bookboxv2.booksearchservice.feignclients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

@FeignClient(name = "bookpopularities", url = "http://localhost:3005/api/v1/suggestion")
public interface BookSuggestionClient {

    @GetMapping(path = "/popularity/{categoryId}")
    public Map<String, Object> getPopularBooksForCategory(@PathVariable long categoryId );

    @GetMapping(path = "/author")
    public Map<String, Object> getPopularAuthors();

    @GetMapping(path = "/publisher")
    public Map<String, Object> getPopularPublishers();

}
