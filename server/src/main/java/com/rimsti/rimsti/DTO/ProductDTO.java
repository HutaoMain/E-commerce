package com.rimsti.rimsti.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ProductDTO {

    private Long id;
    private String name;
    private String imageUrl;
    private String description;
    private Double price;
    private Integer quantity;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private Integer categoryId;
    private Float finalRating;
    private Integer sold;
    private Boolean bestSeller;
}
