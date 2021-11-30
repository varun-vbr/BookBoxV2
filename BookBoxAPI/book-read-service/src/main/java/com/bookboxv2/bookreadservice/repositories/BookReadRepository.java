package com.bookboxv2.bookreadservice.repositories;

import com.bookboxv2.bookreadservice.models.BookRead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookReadRepository extends JpaRepository<BookRead, Long> {
    public List<BookRead> findByBookIdAndUserId(long bookId, long userId);
    public List<BookRead> findByUserIdOrderByProgressAsc(long userId);
}
