package com.bookboxv2.bookservice.repositories;

import com.bookboxv2.bookservice.models.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {
    public List<BookCategory> findAllByCategoryNameIgnoreCaseContaining(String categoryName);
}
