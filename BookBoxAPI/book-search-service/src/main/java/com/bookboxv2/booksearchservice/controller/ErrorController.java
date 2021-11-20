package com.bookboxv2.booksearchservice.controller;

import com.bookboxv2.booksearchservice.exceptions.AppError;
import com.bookboxv2.booksearchservice.models.ErrorObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorController {

    @ExceptionHandler(AppError.class)
    @ResponseBody
    public ResponseEntity<ErrorObject> handleError(AppError error){
        return ResponseEntity.status(error.getStatusCode()).body(new ErrorObject(error.getMsg(), error.getStatusCode(), error.getStatus(), error.isOperational()));
    }
}
