package com.bookboxv2.booksearchservice.controller;

import com.bookboxv2.booksearchservice.models.Author;
import com.bookboxv2.booksearchservice.models.Book;
import com.bookboxv2.booksearchservice.models.Publisher;
import com.bookboxv2.booksearchservice.service.SuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(path = "/bookSearch")
@CrossOrigin(origins = "*")
public class SuggestionController {
    @Autowired
    private SuggestionService suggestionService;

    @PostMapping(path = "/")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void cacheBook(@RequestBody Book book){
        suggestionService.insertBookToCache(book);
    }

    @GetMapping( path = "/popularBooks/{categoryId}" )
    @ResponseBody
    public Map<String, Object> getSuggestions(@PathVariable long categoryId) { return suggestionService.getPopularBooksByCategory(categoryId); }

    @GetMapping( path = "/{bookId}" )
    @ResponseBody
    public Book getBookById(@PathVariable  long bookId){ return suggestionService.getBooksById( bookId ); }

    @GetMapping(path = "/author/{authorId}")
    @ResponseBody
    public Author getAuthorById(@PathVariable long authorId){ return suggestionService.getAuthorsById(authorId); }

    @GetMapping( path = "/publisher/{publisherId}" )
    @ResponseBody
    public Publisher getPublisherById( @PathVariable  long publisherId ){ return suggestionService.getPublisherById(publisherId); }

    @GetMapping(path = "/authors")
    @ResponseBody
    public Map<String, Object> getPopularAuthors(){
        return suggestionService.getPopularAuthors();
    }

    @GetMapping(path = "/publishers")
    @ResponseBody
    public Map<String, Object> getPopularPublishers(){
        return suggestionService.getPopularPublishers();
    }

    @PostMapping(path = "/cache")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void populateCache(){ suggestionService.populateCache(); }

    @GetMapping(path = "/search")
    @ResponseBody
    public Object search(@RequestParam("type") String type, @RequestParam("key") String key){ return suggestionService.performSearch( type, key); }

    @GetMapping(path = "/searchResults")
    @ResponseBody
    public Object getSearchResults(@RequestParam("type") String type, @RequestParam("key") String key){ return suggestionService.getSearchResults( type, key); }
}
