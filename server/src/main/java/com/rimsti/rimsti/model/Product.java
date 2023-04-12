package com.rimsti.rimsti.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "product")
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String imageUrl;

    private String description;

    private Double price;

    private Integer quantity;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "categoryId")
    Category category;

    @CreationTimestamp
    private LocalDateTime createdDate;

    @UpdateTimestamp
    private LocalDateTime updatedDate;

    @JsonIgnore
    @OneToMany(mappedBy = "productId")
    private List<ProductRating> ratings;

    @Transient
    private Float finalRating;

    private Integer sold = 0;

    private Boolean bestSeller = false;

    public Product(Long id) {
            this.id = id;
        }
}
