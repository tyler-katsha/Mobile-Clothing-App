package com.tyler.MobileClothing.auth;

import lombok.Data;

import java.util.List;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String name;
    // Optional
    private String preferredUnits = "metric";
    private List<String> favouriteStyles;
}
