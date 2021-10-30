package com.bookboxv2.bookservice.controllers;

import com.bookboxv2.bookservice.exceptions.AppError;
import com.bookboxv2.bookservice.models.ErrorObject;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorController {

    @ExceptionHandler(AppError.class)
    @ResponseBody
    public ErrorObject handleError(AppError error){
        return new ErrorObject(error.getMsg(), error.getStatusCode(), error.getStatus(), error.isOperational());
    }
}
