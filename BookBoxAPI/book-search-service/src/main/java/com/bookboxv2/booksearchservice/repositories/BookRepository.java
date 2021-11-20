package com.bookboxv2.booksearchservice.repositories;

import com.bookboxv2.booksearchservice.models.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {
    public List<Book> findAllByTitleIgnoreCaseContaining(String title);
}
