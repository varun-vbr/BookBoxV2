package com.bookboxv2.bookservice.service;

import com.bookboxv2.bookservice.exceptions.AppError;
import com.bookboxv2.bookservice.models.Author;
import com.bookboxv2.bookservice.models.Book;
import com.bookboxv2.bookservice.models.BookCategory;
import com.bookboxv2.bookservice.models.Publisher;
import com.bookboxv2.bookservice.repositories.AuthorRepository;
import com.bookboxv2.bookservice.repositories.BookCategoryRepository;
import com.bookboxv2.bookservice.repositories.BookRepository;
import com.bookboxv2.bookservice.repositories.PublisherRepository;
import org.hibernate.service.spi.InjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookCategoryRepository bookCategoryRepository;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private PublisherRepository publisherRepository;

    public Book getBook(long id){
        try{
            Optional<Book> book = bookRepository.findById(id);
            if(book.isPresent())
                return book.get();
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
        throw new AppError("There is no book with the given Id", HttpStatus.NOT_FOUND.value(), true);
    }

    public List<Book> getBooksFromCategory(long categoryId){
        try{
            return bookRepository.findAllByCategoryCategoryId(categoryId);
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public List<Book> getBooksByAuthor(long authorId){
        try{
            return bookRepository.findAllByAuthorAuthorId(authorId);
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public List<Book> getBooksByPublisher(long publisherId){
        try{
            return bookRepository.findAllByPublisherPublisherId(publisherId);
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public List<Book>  findAllBooksByAuthorName(String authorName){
        try{
            return bookRepository.findAllByAuthorAuthorNameIgnoreCaseContaining(authorName);
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public List<Book>  findAllBooksByPublisherName(String publisherName){
        try{
            return bookRepository.findAllByPublisherPublisherNameIgnoreCaseContaining(publisherName);
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public List<Book>  findAllBooksByTitle(String title){
        try{
            return bookRepository.findAllByTitleIgnoreCaseContaining(title);
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public boolean areRequiredFieldsPresent(Map<String, Object> params){
        return (String)params.get("title") != null
                && !((String)params.get("title")).trim().equalsIgnoreCase("")
                && (String)params.get("description") != null
                && (String)params.get("imgLoc") != null
                && !((String)params.get("imgLoc")).trim().equalsIgnoreCase("")
                && !((String)params.get("location")).trim().equalsIgnoreCase("")
                && (String)params.get("location") != null;
    }

    public void addBook(Map<String, Object> params){
        try{
            long categoryId = 0;
            long authorId = 0;
            long publisherId = 0;
            if(params.containsKey("category") && params.containsKey("author") && params.containsKey("publisher")){
                categoryId = Long.valueOf((String)params.get("category"));
                authorId = Long.valueOf((String)params.get("author"));
                publisherId = Long.valueOf((String)params.get("publisher"));
            } else{
                throw new AppError("Missing required request parameters", HttpStatus.BAD_REQUEST.value(), true);
            }

           Optional<BookCategory> category = bookCategoryRepository.findById(categoryId);
           Optional<Author> author = authorRepository.findById(authorId);
           Optional<Publisher> publisher = publisherRepository.findById(publisherId);
           if(category.isPresent() && author.isPresent() && publisher.isPresent()){
               if(areRequiredFieldsPresent(params)){
                   Book book = new Book();
                   book.setTitle((String)params.get("title"));
                   book.setDescription((String)params.get("description"));
                   book.setImgLoc((String)params.get("imgLoc"));
                   book.setLocation((String)params.get("location"));
                   book.setCategory(category.get());
                   book.setAuthor(author.get());
                   book.setPublisher(publisher.get());
                   bookRepository.save(book);
                   return;
               }
           }
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
        throw new AppError("Missing/Invalid required request parameters", HttpStatus.BAD_REQUEST.value(), true);
    }

    public void deleteBook(long id){
        try{
           bookRepository.deleteById(id);
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }
}
