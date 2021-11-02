package com.bookboxv2.bookservice.models;

import javax.persistence.*;

@Entity
@Table(name = "tbl_bookcategories", schema = "booksdb")
public class BookCategory {
    private long categoryId;
    private String categoryName;
    private int bookCount;
    private String location;
    private String imagePath;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "category_id")
    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }

    @Column(name = "category_name")
    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    @Column(name = "book_count")
    public int getBookCount() {
        return bookCount;
    }

    public void setBookCount(int bookCount) {
        this.bookCount = bookCount;
    }

    @Column(name = "location")
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Column(name = "imagepath")
    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
