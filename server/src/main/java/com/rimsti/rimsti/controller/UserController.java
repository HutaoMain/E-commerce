package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.DTO.LoginDTO;
import com.rimsti.rimsti.model.User;
import com.rimsti.rimsti.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody LoginDTO loginDTO) throws Exception {
        return userService.loginUser(loginDTO.getEmail(), loginDTO.getPassword());
    }

    @GetMapping("/list")
    public List<User> getListUserController(){
        return userService.getListUser();
    }

    @GetMapping("/{email}")
    private User getUserByEmail(@PathVariable("email") String email) {
        return userService.getUserByEmail(email);
    }

    @PutMapping("/{email}/address")
    public ResponseEntity<?> updateUserAddress(@PathVariable String email, @RequestBody String newAddress) {
        try {
            userService.updateUserAddress(email, newAddress);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//    @PutMapping("/update/{userId}")
//    public AppUser updateUser(@PathVariable("userId") int userId, @RequestBody AppUser user) {
//        appUserService.updateUser(userId, user);
//        return user;
//    }
//
//    @PutMapping("/update/image/{userId}")
//    public AppUser updateUserImage(@PathVariable("userId") int userId, @RequestBody AppUser user) {
//        appUserService.updateUserImage(userId, user);
//        return user;
//    }
//
//    @PutMapping("/update/password/{userId}")
//    public AppUser updateUserPassword(@PathVariable("userId") int userId, @RequestBody AppUser user) {
//        appUserService.updateUserPassword(userId, user);
//        return user;
//    }
}
