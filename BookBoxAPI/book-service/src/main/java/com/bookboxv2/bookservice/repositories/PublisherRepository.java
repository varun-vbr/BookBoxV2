package com.bookboxv2.bookservice.repositories;

import com.bookboxv2.bookservice.models.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {
    public List<Publisher> findAllByPublisherNameIgnoreCaseContaining(String publisherName);
}
