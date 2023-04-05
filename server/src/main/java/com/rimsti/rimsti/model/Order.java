package com.rimsti.rimsti.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rimsti.rimsti.model.appuser.AppUser;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "orders")
public class Order{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;

    private String productName;

    private String email;

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

    private String productDesc;

    @CreationTimestamp
    private LocalDateTime createdDate;

    private String proofPayment;
    private String orNum;

    @CreationTimestamp
    private LocalDate dateNow;

    private String orderJsonList;
}
