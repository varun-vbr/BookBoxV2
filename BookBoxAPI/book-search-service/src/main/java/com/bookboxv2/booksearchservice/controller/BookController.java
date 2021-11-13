package com.bookboxv2.booksearchservice.controller;

import com.bookboxv2.booksearchservice.models.Book;
import com.bookboxv2.booksearchservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/bookSearch")
public class BookController {
    @Autowired
    private BookService bookService;

    @PostMapping(path = "/")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void cacheBook(@RequestBody Book book){
        bookService.insertBookToCache(book);
    }
}
