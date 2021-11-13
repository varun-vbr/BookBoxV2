package com.bookboxv2.booksearchservice.service;

import com.bookboxv2.booksearchservice.models.Book;
import com.bookboxv2.booksearchservice.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public void insertBookToCache(Book book){
        bookRepository.save(book);
    }

}
