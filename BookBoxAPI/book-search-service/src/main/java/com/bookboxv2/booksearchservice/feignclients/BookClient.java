package com.bookboxv2.booksearchservice.feignclients;

import com.bookboxv2.booksearchservice.models.Book;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

@FeignClient(name = "book-service", url = "${BOOK_SERVICE_SERVICE_HOST:http://localhost}:8080")
public interface BookClient {

    @GetMapping(path = "/books/{bookId}")
    public Map<String, Object> getBooksById(@PathVariable long bookId);

    @GetMapping(path = "/author/{authorId}")
    public Map<String, Object> getAuthorById(@PathVariable long authorId);

    @GetMapping(path = "/publisher/{publisherId}")
    public Map<String, Object> getPublisherById(@PathVariable long publisherId);

    @GetMapping(path = "/category/")
    public List<Map<String, Object>> getAllCategories();

    @GetMapping(path = "/books/title/{title}")
    public List<Map<String, Object>> getBooksByTitle(@PathVariable String title);

    @GetMapping(path = "/author/name/{authorName}")
    public List<Map<String, Object>> getAuthorsByTitle(@PathVariable String authorName);

    @GetMapping(path = "/publisher/name/{publisherName}")
    public List<Map<String, Object>> getPublishersByTitle(@PathVariable String publisherName);

    @GetMapping(path = "/books/author/name/{authorName}")
    public List<Map<String, Object>> getBooksByAuthorName(@PathVariable String authorName);

    @GetMapping(path = "/books/publisher/name/{publisherName}")
    public List<Map<String, Object>> getBooksByPublisherName(@PathVariable String publisherName);


}
