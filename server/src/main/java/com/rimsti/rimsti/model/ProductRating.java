package com.rimsti.rimsti.model;

import com.rimsti.rimsti.model.appuser.AppUser;
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
    private Product product;

    private float rating;
}
