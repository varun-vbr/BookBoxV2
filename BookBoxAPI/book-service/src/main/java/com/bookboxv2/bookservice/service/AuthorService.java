package com.bookboxv2.bookservice.service;

import com.bookboxv2.bookservice.exceptions.AppError;
import com.bookboxv2.bookservice.models.Author;
import com.bookboxv2.bookservice.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthorService {
    @Autowired
    private AuthorRepository authorRepository;

    public void addAuthor(Map<String, Object> params) {
        try{
            if(params.get("authorName") != null && !((String)params.get("authorName")).trim().equalsIgnoreCase("")){
                Author author = new Author();
                author.setAuthorName((String)params.get("authorName"));
                authorRepository.save(author);
                return;
            }
        } catch (Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
        throw new AppError("Missing/Invalid required request parameters", HttpStatus.BAD_REQUEST.value(), true);
    }

    public Author findAuthorById(long id){
        try{
            Optional<Author> author = authorRepository.findById(id);
            if(author.isPresent()){
                return author.get();
            }
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
        throw new AppError("There is no author with the given Id", HttpStatus.NOT_FOUND.value(), true);
    }

    public List<Author> findAllByAuthorName(String authorName){
        try{
            return authorRepository.findAllByAuthorNameIgnoreCaseContaining(authorName);
        }catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public List<Author> listAllAuthors(){
        try{
           return authorRepository.findAll();
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public void deleteAuthor(long id){
        try{
            authorRepository.deleteById(id);
        } catch(Exception ex) {
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }
}
