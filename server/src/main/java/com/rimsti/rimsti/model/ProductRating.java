package com.rimsti.rimsti.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "product_rating")
public class ProductRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product productId;

    private float rating;
}
