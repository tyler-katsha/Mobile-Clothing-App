package com.tyler.MobileClothing.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> getUser(@AuthenticationPrincipal UserPrincipal principal){
        return ResponseEntity.ok(userService.getUser(principal.getUserId()));
    }

    @GetMapping
    public ResponseEntity<Page<User>> findAll(){
        return ResponseEntity.ok(userService.findAll());
    }
}
