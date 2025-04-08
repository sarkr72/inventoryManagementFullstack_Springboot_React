package com.IMS_Backend.ims_backend.exceptions;

public class ExpiredJwtException extends RuntimeException{
	public ExpiredJwtException(String message) {
        super(message);
    }
}
