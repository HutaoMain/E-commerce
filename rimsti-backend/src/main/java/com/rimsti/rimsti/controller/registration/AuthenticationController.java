package com.rimsti.rimsti.controller.registration;

import com.rimsti.rimsti.DTO.LoginDTO;
import com.rimsti.rimsti.DTO.registration.RegistrationRequest;
import com.rimsti.rimsti.config.email.EmailSender;
import com.rimsti.rimsti.repository.appuserrepository.AppUserRepository;
import com.rimsti.rimsti.service.registrationService.AppUserService;
import com.rimsti.rimsti.service.registrationService.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    AppUserService appUserService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    RegistrationService registrationService;

    @Autowired
    EmailSender emailSender;

    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDTO user) {
//        AppUser appUser = appUserService.getUserByEmail(user.getEmail());
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                user.getEmail(), user.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
    }

    @PostMapping("/registration")
    public String register(@RequestBody RegistrationRequest registrationRequest) {
        return registrationService.register(registrationRequest);
    }

    @GetMapping(path = "/registration/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }

    @PutMapping("/forgotPass/{email}")
    public void updateForgotPass(@PathVariable("email") String email) {

        String password = AppUserService.alphaNumericString(10);
//    public String confirm(@RequestParam("token") String token){
        appUserRepository.forgotPass(email, bCryptPasswordEncoder.encode(password));
        emailSender.send(email, "your new password is: " + password);
    }
}
