package com.bookboxv2.bookservice.repositories;

import com.bookboxv2.bookservice.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    public List<Book> findAllByCategoryCategoryId(long categoryId);
    public List<Book> findAllByAuthorAuthorId(long authorId);
    public List<Book> findAllByPublisherPublisherId(long publisherId);
    public List<Book> findAllByTitleIgnoreCaseContaining(String title);
    public List<Book> findAllByAuthorAuthorNameIgnoreCaseContaining(String authorName);
    public List<Book> findAllByPublisherPublisherNameIgnoreCaseContaining(String publisherName);
}
