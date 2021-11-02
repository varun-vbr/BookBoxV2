package com.bookboxv2.bookservice.service;

import com.bookboxv2.bookservice.exceptions.AppError;
import com.bookboxv2.bookservice.models.BookCategory;
import com.bookboxv2.bookservice.repositories.BookCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BookCategoryService {
    @Autowired
    private BookCategoryRepository bookCategoryRepository;

    public BookCategory getBookCategoryById(long id){
        try{
            Optional<BookCategory> category = bookCategoryRepository.findById(id);
            if(category.isPresent()){
                return category.get();
            }
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
        throw new AppError("There is no book category with the given Id", HttpStatus.NOT_FOUND.value(), true);
    }

    public List<BookCategory> findCategoriesByName(String categoryName){
        try{
            return bookCategoryRepository.findAllByCategoryNameIgnoreCaseContaining(categoryName);
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }
    public List<BookCategory> listAllCategories(){
        try{
            return bookCategoryRepository.findAll();
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public boolean areRequiredParamsPresent(Map<String, Object> params){
        return (String)params.get("categoryName") != null &&
                !((String)params.get("categoryName")).trim().equalsIgnoreCase("") &&
                (String)params.get("location") != null &&
                !((String)params.get("location")).trim().equalsIgnoreCase("") &&
                (String)params.get("imagePath") != null &&
                !((String)params.get("imagePath")).trim().equalsIgnoreCase("");
    }
    public void createCategory(Map<String, Object> params){
        try{
            if(areRequiredParamsPresent(params)){
                BookCategory category = new BookCategory();
                category.setCategoryName((String)params.get("categoryName"));
                category.setLocation((String)params.get("location"));
                category.setImagePath((String)params.get("imagePath"));
                bookCategoryRepository.save(category);
                return;
            }
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
        throw new AppError("Missing/Invalid required request parameters", HttpStatus.BAD_REQUEST.value(), true);
    }

    public void deleteCategory(long id){
        try{
            bookCategoryRepository.deleteById(id);
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

}
