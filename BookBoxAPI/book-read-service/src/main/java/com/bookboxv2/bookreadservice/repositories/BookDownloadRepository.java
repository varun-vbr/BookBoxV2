package com.bookboxv2.bookreadservice.repositories;

import com.bookboxv2.bookreadservice.models.BookDownload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookDownloadRepository extends JpaRepository<BookDownload, Long> {
}
