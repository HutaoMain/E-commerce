package com.rimsti.rimsti.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ProductDTO {

    private Long id;
    private String name;
    private String imageUrl;
    private String description;
    private Float rating;
    private Double price;
    private Integer quantity;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private Integer categoryId;
    private Long productVariations;

}
