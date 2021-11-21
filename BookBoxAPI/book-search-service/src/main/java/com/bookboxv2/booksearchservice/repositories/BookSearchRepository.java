package com.bookboxv2.booksearchservice.repositories;

import com.bookboxv2.booksearchservice.models.Book;
import org.springframework.data.repository.query.QueryByExampleExecutor;

public interface BookSearchRepository extends QueryByExampleExecutor<Book> {
}