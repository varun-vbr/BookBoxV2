package com.bookboxv2.booksearchservice.repositories;

import com.bookboxv2.booksearchservice.models.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

}
