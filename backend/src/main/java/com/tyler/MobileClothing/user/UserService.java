package com.tyler.MobileClothing.user;

import com.tyler.MobileClothing.auth.LoginRequest;
import com.tyler.MobileClothing.auth.RegisterRequest;
import com.tyler.MobileClothing.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getUser(String id){
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
    }

    public Page<User> findAll() {
        return null;
    }

    public String register(RegisterRequest request) {
        return null;
    }

    public String login(LoginRequest request) {
        return null;
    }
}
