package com.bookboxv2.bookservice.service;

import com.bookboxv2.bookservice.exceptions.AppError;
import com.bookboxv2.bookservice.models.Book;
import com.bookboxv2.bookservice.repositories.BookRepository;
import org.hibernate.service.spi.InjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

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
}
