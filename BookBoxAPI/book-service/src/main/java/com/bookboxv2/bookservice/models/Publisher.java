package com.bookboxv2.bookservice.models;

import javax.persistence.*;

@Entity
@Table(name = "tbl_publishers", schema = "booksdb")
public class Publisher {
    private long publisherId;
    private String publisherName;


    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "publisher_id")
    public long getPublisherId() {
        return publisherId;
    }

    public void setPublisherId(long publisherId) {
        this.publisherId = publisherId;
    }

    @Column(name = "publisher_name")
    public String getPublisherName() {
        return publisherName;
    }

    public void setPublisherName(String publisherName) {
        this.publisherName = publisherName;
    }
}
