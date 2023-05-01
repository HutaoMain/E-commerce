package com.rimsti.rimsti.DTO;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDTO {

    private Long id;

    private Double totalPrice;

    private String status = "Pending";

    private Long userId;

    private String userFullName;

    private Long productId;

    private Integer quantity;

    private LocalDateTime createdDate;

    private String proofPayment;

    private LocalDate dateNow;

    private String orderJsonList;

    private String email;

    private List<ProductQuantityDTO> products;

//    private String barangay;
//
//    private String street;
//
//    private String city;
//
//    private Integer postalCode;

    private String modeOfPayment;
}
