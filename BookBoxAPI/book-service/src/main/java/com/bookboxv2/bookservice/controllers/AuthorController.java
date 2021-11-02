package com.bookboxv2.bookservice.controllers;

import com.bookboxv2.bookservice.models.Author;
import com.bookboxv2.bookservice.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/author")
public class AuthorController {
    @Autowired
    private AuthorService authorService;

    @GetMapping(path = "/{authorId}")
    @ResponseBody
    public Author getAuthorById(@PathVariable long authorId){ return authorService.findAuthorById(authorId); }

    @GetMapping(path = "/name/{authorName}")
    @ResponseBody
    public List<Author> getAllAuthorsByName(@PathVariable String authorName){ return authorService.findAllByAuthorName(authorName); }

    @GetMapping(path = "/")
    @ResponseBody
    public List<Author> getAllAuthors(){ return authorService.listAllAuthors(); }

    @PostMapping(path = "/")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addAuthor(@RequestBody Map<String, Object> params){ authorService.addAuthor(params); }

    @DeleteMapping(path = "/{authorId}")
    public void deleteAuthor(@PathVariable long authorId){ authorService.deleteAuthor(authorId); }
}
