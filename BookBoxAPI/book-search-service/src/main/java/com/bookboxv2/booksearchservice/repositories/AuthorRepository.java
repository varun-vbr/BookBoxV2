package com.bookboxv2.booksearchservice.repositories;

import com.bookboxv2.booksearchservice.models.Author;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Long>, QueryByExampleExecutor<Author> {
    public List<Author> findAllByAuthorNameIgnoreCaseContaining(String authorName);
}
