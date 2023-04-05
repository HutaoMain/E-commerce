package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.entity.appuser.AppUser;
import com.rimsti.rimsti.service.registrationService.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    AppUserService appUserService;

    @GetMapping("/list")
    public List<AppUser> getListUserController(){
        return appUserService.getListUser();
    }

    @GetMapping("/{email}")
    private AppUser getUserByEmail(@PathVariable("email") String email) {
        return appUserService.getUserByEmail(email);
    }

    @PutMapping("/update/{userId}")
    public AppUser updateUser(@PathVariable("userId") int userId, @RequestBody AppUser user) {
        appUserService.updateUser(userId, user);
        return user;
    }

    @PutMapping("/update/image/{userId}")
    public AppUser updateUserImage(@PathVariable("userId") int userId, @RequestBody AppUser user) {
        appUserService.updateUserImage(userId, user);
        return user;
    }

    @PutMapping("/update/password/{userId}")
    public AppUser updateUserPassword(@PathVariable("userId") int userId, @RequestBody AppUser user) {
        appUserService.updateUserPassword(userId, user);
        return user;
    }

//    @Autowired
//    UserService userService;
//
//    @GetMapping("/list")
//    public List<User> getListUserController(){
//        return userService.getListUser();
//    }
//
//    @GetMapping("/list/{userId}")
//    private User getUserById(@PathVariable("userId") long userId) {
//        return userService.getUserById(userId);
//    }
//
//    @GetMapping("/usernameOrEmail/{usernameOrEmail}")
//    private User getUserByEmailOrUsername(@PathVariable("usernameOrEmail") String username, @PathVariable("usernameOrEmail") String email) {
//        return userService.getUserByUsernameOrEmail(username, email);
//    }

//    @PutMapping("/update/{userId}")
//    public User updateUser(@PathVariable("userId") int userId, @RequestBody User user) {
//        userService.updateUser(userId, user);
//        return user;
//    }
//
//    @PutMapping("/update/image/{userId}")
//    public User updateUserImage(@PathVariable("userId") int userId, @RequestBody User user) {
//        userService.updateUserImage(userId, user);
//        return user;
//    }
}
