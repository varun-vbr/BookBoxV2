package com.bookboxv2.bookservice.models;

import javax.persistence.*;

@Entity
@Table(name = "tbl_authors", schema = "booksdb")
public class Author {
    private long authorId;
    private String authorName;

    @Id
    @GeneratedValue
    @Column(name = "author_id")
    public long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(long authorId) {
        this.authorId = authorId;
    }

    @Column(name = "author_name")
    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }
}
