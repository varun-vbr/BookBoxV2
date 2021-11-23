package com.bookboxv2.booksearchservice.repositories;

import com.bookboxv2.booksearchservice.models.Publisher;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublisherRepository extends CrudRepository<Publisher, Long>, QueryByExampleExecutor<Publisher> {
    public List<Publisher> findAllByPublisherNameIgnoreCaseContaining(String publisherName);
}
