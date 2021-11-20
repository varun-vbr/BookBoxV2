package com.bookboxv2.booksearchservice.repositories;

import com.bookboxv2.booksearchservice.models.Publisher;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublisherRepository extends CrudRepository<Publisher, Long> {
    public List<Publisher> findAllByPublisherNameIgnoreCaseContaining(String publisherName);
}
