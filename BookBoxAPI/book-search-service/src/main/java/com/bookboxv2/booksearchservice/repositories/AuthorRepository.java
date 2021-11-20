package com.bookboxv2.booksearchservice.repositories;

import com.bookboxv2.booksearchservice.models.Author;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Long> {
    public List<Author> findAllByAuthorNameIgnoreCaseContaining(String authorName);
}
