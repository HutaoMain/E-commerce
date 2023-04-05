package com.rimsti.rimsti.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "product_variations")
public class ProductVariations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String variationName;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "productId")
    Products product;
    private Double price;
    private String imgUrl;
    private Long quantity;
    private String description;
}
