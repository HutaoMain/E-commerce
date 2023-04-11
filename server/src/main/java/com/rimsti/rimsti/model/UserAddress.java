//package com.rimsti.rimsti.model;
//
//import lombok.Getter;
//import lombok.Setter;
//
//import javax.persistence.*;
//
//@Entity
//@Getter
//@Setter
//@Table(name = "user_addresses")
//public class UserAddress {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String street;
//
//    private String city;
//
//    private String state;
//
//    private String zipCode;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//}
