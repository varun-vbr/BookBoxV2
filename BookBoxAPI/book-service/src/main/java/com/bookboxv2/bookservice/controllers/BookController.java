package com.bookboxv2.bookservice.controllers;

import com.bookboxv2.bookservice.models.Book;
import com.bookboxv2.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/books")
public class BookController {

    @Autowired
    private BookService bookSvc;

    @GetMapping(path = "/{id}")
    @ResponseBody
    public Book getById(@PathVariable long id){
        return bookSvc.getBook(id);
    }

    @GetMapping(path = "/category/{categoryId}")
    @ResponseBody
    public List<Book> getByCategoryId(@PathVariable long categoryId){ return bookSvc.getBooksFromCategory(categoryId); }

    @GetMapping(path = "/author/{authorId}")
    @ResponseBody
    public List<Book> getByAuthorId(@PathVariable long authorId){ return bookSvc.getBooksByAuthor(authorId); }

    @GetMapping(path = "/publisher/{publisherId}")
    @ResponseBody
    public List<Book> getByPublisherId(@PathVariable long publisherId){ return bookSvc.getBooksByPublisher(publisherId); }

    @GetMapping(path = "/title/{title}")
    @ResponseBody
    public List<Book> getByTitle(@PathVariable String title) { return bookSvc.findAllBooksByTitle(title); }

    @GetMapping(path = "/author/name/{authorName}")
    @ResponseBody
    public List<Book> getBooksByAuthorName(@PathVariable String authorName){ return bookSvc.findAllBooksByAuthorName(authorName); }

    @GetMapping(path = "/publisher/name/{publisherName}")
    @ResponseBody
    public List<Book> getBooksByPublisherName(@PathVariable String publisherName){ return bookSvc.findAllBooksByPublisherName(publisherName); }

}
