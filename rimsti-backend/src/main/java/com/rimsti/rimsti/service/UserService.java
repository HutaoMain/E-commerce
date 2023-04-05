package com.rimsti.rimsti.service;

import com.rimsti.rimsti.entity.User;
import com.rimsti.rimsti.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//@Service
public class UserService {

//    @Autowired
//    UserRepository userRepository;
//
//    public List<User> getListUser(){
//        return userRepository.findAll();
//    }
//
//    public User getUserById(long userId) {
//        return userRepository.findById(userId).get();
//    }
//
//    public User getUserByUsernameOrEmail(String username, String email) {
//        return userRepository.findByUsernameOrEmail(username, email).get();
//    }

//    public User getUserEmail(String email) {
//        return userRepository.findByEmail(email).get();
//    }

//    public void updateUser(long userId, User user) {
//        User setUser = userRepository.getReferenceById(userId);
//        setUser.setEmail(user.getEmail());
//        setUser.setGender(user.getGender());
//        setUser.setBirthday(user.getBirthday());
//        userRepository.save(setUser);
//    }
//
//    public void updateUserImage(long userId, User user) {
//        User setUser = userRepository.getReferenceById(userId);
//        setUser.setImageUrl(user.getImageUrl());
//        userRepository.save(setUser);
//    }
}
