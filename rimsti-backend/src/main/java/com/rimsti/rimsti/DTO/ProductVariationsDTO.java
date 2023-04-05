package com.rimsti.rimsti.DTO;

import lombok.Data;

@Data
public class ProductVariationsDTO {

    private Long id;
    private String variationName;
    private Long productId;
    private Double price;
    private String imgUrl;
    private Long quantity;
    private String description;
}