package com.tyler.MobileClothing.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.PAYMENT_REQUIRED,reason = "Tier limited exceeded")
public class TierException extends RuntimeException {
    public TierException(String message) {
        super(message);
    }
}
