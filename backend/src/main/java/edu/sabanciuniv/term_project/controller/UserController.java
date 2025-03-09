package edu.sabanciuniv.term_project.controller;
import edu.sabanciuniv.term_project.model.User;
import edu.sabanciuniv.term_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        if (userService.exist(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam("email") String email, @RequestParam("password") String password) {
        String token = userService.login(email, password);
        if (token != null) {
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/friends/add")
    public ResponseEntity<String> sendFriendRequest(@RequestParam("email") String receiverEmail) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();  // This is the email of the authenticated user
        boolean requestSent = userService.sendFriendRequest(email, receiverEmail);
        if (requestSent) {
            return ResponseEntity.ok("Friend request sent to " + receiverEmail);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to send friend request");
        }
    }

    @PostMapping("/friends/accept")
    public ResponseEntity<String> acceptFriendRequest(@RequestParam("email") String requestEmail) {
        // Get the authenticated user's username (email) from the SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();  // This is the email of the authenticated user
        boolean requestAccept = userService.acceptFriendRequest(email, requestEmail);
        if (requestAccept) {
            return ResponseEntity.ok("Friend request accepted , " + requestEmail + " is your friend now");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to accept friend request");
        }
    }

    @GetMapping("/friends")
    public ResponseEntity<List<String>> getFriendsList() {
        // Get the authenticated user's username (email) from the SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();  // This is the email of the authenticated user
        List<String> getfriendList = userService.getfriendList(email);
        if (getfriendList != null) {
            return ResponseEntity.ok(getfriendList);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.emptyList());
        }
    }

    @GetMapping("/friends/pending")
    public ResponseEntity<List<String>> getPendingFriendList() {
        // Get the authenticated user's username (email) from the SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();  // This is the email of the authenticated user
        List<String> pendingfriendList = userService.getpendingfriendList(email);
        if (pendingfriendList != null) {
            return ResponseEntity.ok(pendingfriendList);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.emptyList());
        }
    }
}
