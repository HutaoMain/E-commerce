package com.rimsti.rimsti.service.registrationService;

import com.rimsti.rimsti.model.appuser.AppUser;
import com.rimsti.rimsti.model.appuser.ConfirmationToken;
import com.rimsti.rimsti.repository.appuserrepository.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final ConfirmationTokenService confirmationTokenService;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email:" + email));
    }

    public String signUpUser(AppUser appUser) {
        boolean userExists = appUserRepository.findByEmail(appUser.getEmail()).isPresent();

        if (userExists) {
            // TODO check of attributes are the same and
            // TODO if email not confirmed send confirmation email.
            throw new IllegalStateException("email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);
        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(30),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        // TODO: SEND EMAIL

        return token;
    }

    public void enableAppUser(String email) { appUserRepository.enableAppUser(email);
    }

    public static String alphaNumericString(int len) {
        String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Random rnd = new Random();

        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        }
        return sb.toString();
    }

    public AppUser getUserByEmail(String email) {
        return appUserRepository.findByEmail(email).get();
    }

    public void updateUser(long userId, AppUser appUser) {
        AppUser setUser = appUserRepository.getReferenceById(userId);
        appUserRepository.save(setUser);
    }

    public void updateUserImage(long userId, AppUser appUser) {
        AppUser setUser = appUserRepository.getReferenceById(userId);
        setUser.setImageUrl(appUser.getImageUrl());
        appUserRepository.save(setUser);
    }

    public void updateUserPassword(long userId, AppUser appUser) {
        AppUser setUser = appUserRepository.getReferenceById(userId);
        setUser.setPassword(bCryptPasswordEncoder.encode(appUser.getPassword()));
        appUserRepository.save(setUser);
    }

    public List<AppUser> getListUser() {
        return appUserRepository.findAll();
    }

}
