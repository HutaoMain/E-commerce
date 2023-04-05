package com.rimsti.rimsti.DTO;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class SignUpDTO {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private Date birthday;
    private String gender;
}
