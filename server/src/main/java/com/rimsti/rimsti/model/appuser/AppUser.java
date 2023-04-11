//package com.rimsti.rimsti.model.appuser;
//
//import com.fasterxml.jackson.annotation.JsonFormat;
//import com.rimsti.rimsti.model.Order;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import javax.persistence.*;
//import java.util.*;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@Entity
//@Table(name = "users_sample", uniqueConstraints = {
//        @UniqueConstraint(columnNames = {"username"})})
//public class AppUser implements UserDetails {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String name;
//    private String username;
//    private String email;
//    private String password;
//    @Enumerated(EnumType.STRING)
//    private UserRole userRole;
//    private Boolean isLocked = false;
//    private Boolean isEnabled = false;
//
//    private String imageUrl;
//
//    @OneToMany(mappedBy = "appUser", cascade = CascadeType.REMOVE)
//    List<Order> order;
//
//    public AppUser(String name,
//                   String username,
//                   String email,
//                   String password,
//                   UserRole userRole) {
//        this.name = name;
//        this.username = username;
//        this.email = email;
//        this.password = password;
//        this.userRole = userRole;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Collections.emptyList();
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    @Override
//    public String getPassword() {
//        return password;
//    }
//
//    @Override
//    public String getUsername() {
//        return username;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return !isLocked;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return isEnabled;
//    }
//}
