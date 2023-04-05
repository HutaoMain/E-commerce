package com.rimsti.rimsti.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductDTO {

    private Long id;
    private String name;
    private String imageUrl;
    private String description;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private Integer categoryId;
    private Long productVariations;
}
