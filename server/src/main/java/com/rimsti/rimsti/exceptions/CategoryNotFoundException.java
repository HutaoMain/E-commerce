package com.rimsti.rimsti.exceptions;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(String message) {
        super(message);
    }
}