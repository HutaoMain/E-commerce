package com.rimsti.rimsti.DTO;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.util.Date;

@Data
public class SignUpDTO {
    private Long id;

    private String email;

    private String name;

    private String imageUrl;

    private String password;

    private String userRole;

    private String secretAnswer;

    private String secretQuestion;
}
