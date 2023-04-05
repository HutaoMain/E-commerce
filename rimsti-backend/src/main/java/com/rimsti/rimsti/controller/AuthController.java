package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.DTO.LoginDTO;
import com.rimsti.rimsti.DTO.SignUpDTO;
import com.rimsti.rimsti.entity.Role;
import com.rimsti.rimsti.entity.User;
//import com.rimsti.rimsti.repository.RoleRepository;
import com.rimsti.rimsti.repository.UserRepository;
import com.rimsti.rimsti.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

//@Slf4j
//@RestController
//@RequestMapping("/api/auth")
public class AuthController {
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    UserService userService;

//    @PostMapping("/login")
//    public ResponseEntity<String> authenticateUser(@RequestBody LoginDTO loginDto){
//        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
//                loginDto.getUsernameOrEmail(), loginDto.getPassword()));
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
//    }
//
//    @PostMapping("/signup")
//    public ResponseEntity<?> registerUser(@RequestBody SignUpDTO signUpDto){
//
//        // add check for username exists in a DB
//        if(userRepository.existsByUsername(signUpDto.getUsername())){
//            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
//        }
//
//        // add check for email exists in DB
//        if(userRepository.existsByEmail(signUpDto.getEmail())){
//            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
//        }
//        // create user object
//        User user = new User();
//        user.setFirstName(signUpDto.getFirstName());
//        user.setLastName(signUpDto.getLastName());
//        user.setUsername(signUpDto.getUsername());
//        user.setEmail(signUpDto.getEmail());
//        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
//        user.setBirthday(signUpDto.getBirthday());
//        user.setGender(signUpDto.getGender());
//
//        Role roles = roleRepository.findByName("ROLE_USER").get();
//        user.setRoles(Collections.singleton(roles));
//
//        userRepository.save(user);
//
//        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
//    }

//    @GetMapping("/userEmail/{email}")
//    private User getUserByEmail(@PathVariable("email") String email) {
//        return userService.getUserEmail(email);
//    }

}
