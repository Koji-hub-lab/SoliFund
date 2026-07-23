package com.solifund.backend.exception;

public class EmailDejaUtiliseException extends RuntimeException {

    public EmailDejaUtiliseException(String email) {
        super("L'email est deja utilise : " + email);
    }
}
