package com.rimsti.rimsti.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

//@Data
//@Entity
//@Table(name = "users", uniqueConstraints = {
//        @UniqueConstraint(columnNames = {"username"}),
//        @UniqueConstraint(columnNames = {"email"})
//})
public class User {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String studentNo;
//    private String username;
//    private String firstName;
//    private String lastName;
//    private String email;
//    @Column(length = 60)
//    private String password;
//
////    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
////    @JoinTable(name = "user_roles",
////            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
////            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
////    private Set<Role> roles;
//
//    @JsonFormat(pattern = "yyy-MM-dd")
//    private Date birthday;
//    private String gender;
//
//    private String imageUrl;
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
//    List<Order> order;

//    @Column(name = "verification_code", length = 64)
//    private String verificationCode;
//    private boolean enabled;
}
