package com.bookboxv2.bookreadservice.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "tbl_book_downloads", schema = "booksdb")
@JsonIgnoreProperties(ignoreUnknown = true)
public class BookDownload {
    private long bookId;
    private long userId;
    private Date downLoadedOn;

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

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "download_date")
    public Date getDownLoadedOn() {
        return downLoadedOn;
    }

    public void setDownLoadedOn(Date downLoadedOn) {
        this.downLoadedOn = downLoadedOn;
    }
}
