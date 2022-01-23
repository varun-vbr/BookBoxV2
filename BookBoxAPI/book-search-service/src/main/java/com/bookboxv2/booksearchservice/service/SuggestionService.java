package com.bookboxv2.booksearchservice.service;

import com.bookboxv2.booksearchservice.exceptions.AppError;
import com.bookboxv2.booksearchservice.feignclients.BookClient;
import com.bookboxv2.booksearchservice.feignclients.BookSuggestionClient;
import com.bookboxv2.booksearchservice.models.Author;
import com.bookboxv2.booksearchservice.models.Book;
import com.bookboxv2.booksearchservice.models.Publisher;
import com.bookboxv2.booksearchservice.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.contains;

@Service
public class SuggestionService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private PublisherRepository publisherRepository;
    @Autowired
    private BookSuggestionClient bookSuggestionClient;
    @Autowired
    private BookClient bookClient;

    public void insertBookToCache(Book book){
        bookRepository.save(book);
    }

    public void populateCache(){
        try{
                bookRepository.deleteAll();
                authorRepository.deleteAll();
                publisherRepository.deleteAll();
                List<Map<String, Object>> categories = bookClient.getAllCategories();
                for(Map<String, Object> category : categories) {
                    Map<String, Object> bookPopularity = getPopularBooksByCategory(Long.valueOf((Integer) category.get("categoryId")));
                    List<Map<String, Object>> popularBooks = (List<Map<String, Object>>) ((Map<String, Object>) bookPopularity.get("data")).get("popularBooks");
                    for (Map<String, Object> book : popularBooks) {
                        insertBookToCache(getBooksById(Long.valueOf((Integer) book.get("bookId"))));
                    }
                }
                Map<String, Object> authorPopularity = getPopularAuthors();
                List<Map<String, Object>> popularAuthors = (List<Map<String, Object>>)((Map<String, Object>)authorPopularity.get("data")).get("popularAuthors");
                for(Map<String, Object> author : popularAuthors){
                    authorRepository.save(getAuthorsById(Long.valueOf((Integer) author.get("authorId"))));
                }
                Map<String, Object> publisherPopularity = getPopularPublishers();
                List<Map<String, Object>> popularPublishers = (List<Map<String, Object>>)((Map<String, Object>)publisherPopularity.get("data")).get("popularPublishers");
                for(Map<String, Object> publisher : popularPublishers){
                    publisherRepository.save(getPublisherById((Long.valueOf((Integer) publisher.get("publisherId")))));
                }
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public Object performSearch(String type, String key){
        try{
           if(type.equalsIgnoreCase("book")) {
//                 List<Book> books = ((List<Book>) bookRepository.findAll()).
//                         stream().
//                         filter(book -> book.getTitle().contains(key)).
//                         collect(Collectors.toList());
//                 if(books.size() < 5){
               return bookClient.getBooksByTitle(key);
//                 } else{
//                     return books;
//           }
            } else if(type.equalsIgnoreCase("author")){
//                 List<Author> authors = ((List<Author>) authorRepository.findAll()).
//                         stream().
//                         filter(author -> author.getAuthorName().contains(key)).
//                         collect(Collectors.toList());
//                 if(authors.size() < 5){
                     return bookClient.getAuthorsByTitle(key);
//                 } else{
//                     return authors;
//                 }
            } else if(type.equalsIgnoreCase("publisher")){
//                List<Publisher> publishers = ((List<Publisher>) publisherRepository.findAll()).
//                        stream().
//                        filter(publisher -> publisher.getPublisherName().contains(key)).
//                        collect(Collectors.toList());
//                if(publishers.size() < 5){
                    return bookClient.getPublishersByTitle(key);
//                } else{
//                    return publishers;
//                }
            } else{
                throw new AppError("Invalid search type. Supported types:book, author, publisher", HttpStatus.BAD_REQUEST.value(), true);
            }
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public Map<String, Object> getPopularBooksByCategory(long categoryId){
        try{
            return bookSuggestionClient.getPopularBooksForCategory(categoryId);
        } catch(Exception ex) {
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public Book getBooksById(long bookId){
        try{
            Map<String, Object> bookMap = bookClient.getBooksById(bookId);
            Book book = new Book();
            book.setBookId(Long.valueOf((Integer)bookMap.get("bookId")));
            book.setTitle((String)bookMap.get("title"));
            return book;
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }

    }

    public Author getAuthorsById(long authorId){
        try{
            Map<String, Object> authorMap =  bookClient.getAuthorById(authorId);
            Author author = new Author();
            author.setAuthorId(Long.valueOf((Integer)authorMap.get("authorId")));
            author.setAuthorName((String)authorMap.get("authorName"));
            return author;
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public Publisher getPublisherById(long publisherId){
        try{
            Map<String, Object> publisherMap = bookClient.getPublisherById(publisherId);
            Publisher publisher = new Publisher();
            publisher.setPublisherId(Long.valueOf((Integer)publisherMap.get("publisherId")));
            publisher.setPublisherName((String)publisherMap.get("publisherName"));
            return publisher;
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public Map<String, Object> getPopularAuthors(){
        try{
            return bookSuggestionClient.getPopularAuthors();
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public Map<String, Object> getPopularPublishers(){
        try{
            return bookSuggestionClient.getPopularPublishers();
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }


}
