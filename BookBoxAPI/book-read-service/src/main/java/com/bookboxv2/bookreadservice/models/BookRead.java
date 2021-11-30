package com.bookboxv2.bookreadservice.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "tbl_bookreads", schema = "booksdb")
@JsonIgnoreProperties(ignoreUnknown = true)
public class BookRead {
    private long bookId;
    private long userId;
    private int progress;
    private Date lastRead;

    @Id
    @Column(name = "book_id")
    public long getBookId() {
        return bookId;
    }

    public void setBookId(long bookId) {
        this.bookId = bookId;
    }

    @Column(name = "user_id")
    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    @Column(name = "progress")
    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_read")
    public Date getLastRead() {
        return lastRead;
    }

    public void setLastRead(Date lastRead) {
        this.lastRead = lastRead;
    }
}
