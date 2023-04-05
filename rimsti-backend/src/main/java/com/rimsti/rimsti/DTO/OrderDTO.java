package com.rimsti.rimsti.DTO;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class OrderDTO {

    private Long id;
    private String productName;
    private Long productId;
    private Long quantity;
    private Double totalPrice;
    private String status = "Pending";
    private Long userId;
    private String userFullName;
    private String imageUrl;
    private String productVariation;
    private String productDesc;
    private LocalDateTime createdDate;
    private String proofPayment;
    private String orNum;
    private LocalDate dateNow;
    private String orderJsonList;
    private String username;
}
