package com.solifund.backend.exception;

public class CompteNonActifException extends RuntimeException {

    public CompteNonActifException(String message) {
        super(message);
    }
}
