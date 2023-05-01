package com.rimsti.rimsti.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String name;

    private String imageUrl;

    private String password;

    private String userRole = "ROLE_USER";

    private String secretAnswer;

    private String secretQuestion;

    private String barangay;

    private String street;

    private String municipality;

    private String city;

    private Integer postalCode;

    private Boolean firstLogin = false;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    List<Order> order;
}
