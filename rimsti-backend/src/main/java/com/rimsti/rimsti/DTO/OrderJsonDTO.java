package com.rimsti.rimsti.DTO;

import lombok.Data;

@Data
public class OrderJsonDTO {
    private Long id;
    private String productName;
    private String productVariationName;
    private Long quantity;
    private String description;
    private String imageUrl;
}
