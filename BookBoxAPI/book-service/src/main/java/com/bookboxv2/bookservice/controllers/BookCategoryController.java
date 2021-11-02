package com.bookboxv2.bookservice.controllers;

import com.bookboxv2.bookservice.models.BookCategory;
import com.bookboxv2.bookservice.service.BookCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/category")
public class BookCategoryController {
    @Autowired
    private BookCategoryService bookCategoryService;

    @GetMapping(path = "/{categoryId}")
    @ResponseBody
    public BookCategory getCategoryById(@PathVariable long categoryId){ return bookCategoryService.getBookCategoryById(categoryId); }

    @GetMapping(path = "/name/{categoryName}")
    @ResponseBody
    public List<BookCategory> getAllCategoriesByName(@PathVariable String categoryName){ return bookCategoryService.findCategoriesByName(categoryName); }

    @GetMapping(path = "/")
    @ResponseBody
    public List<BookCategory> getAllCategories(){ return bookCategoryService.listAllCategories(); }

    @PostMapping("/")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addCategory(@RequestBody Map<String, Object> params){ bookCategoryService.createCategory(params); }

    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable long categoryId){ bookCategoryService.deleteCategory(categoryId); }
}
