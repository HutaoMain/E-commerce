package com.rimsti.rimsti.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rimsti.rimsti.DTO.OrderJsonDTO;
import com.rimsti.rimsti.entity.appuser.AppUser;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "orders")
public class Order{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;

    private String productName;
    private String username;
    private Long productId;
    private Long quantity;
    private Double totalPrice;
    @Column(name = "status")
    private String status;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne
    @JoinColumn(name = "userId")
    AppUser appUser;
    private String userFullName;
    private String imageUrl;
    private String productVariation;
    private String productDesc;

    @CreationTimestamp
    private LocalDateTime createdDate;

    private String proofPayment;
    private String orNum;

//    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyy");

    @CreationTimestamp
    private LocalDate dateNow;

    private String orderJsonList;

//    public String getDateNow() {
//        String formattedLocalDate = dateNow.format(formatter);
//        return formattedLocalDate;
//    }
}
