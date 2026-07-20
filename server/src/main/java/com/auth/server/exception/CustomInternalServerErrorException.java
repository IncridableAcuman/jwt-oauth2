package com.auth.server.exception;

public class CustomInternalServerErrorException extends RuntimeException{
    public CustomInternalServerErrorException(String message){
        super(message);
    }
}
