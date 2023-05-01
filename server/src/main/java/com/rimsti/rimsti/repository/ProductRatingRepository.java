package com.rimsti.rimsti.repository;

import com.rimsti.rimsti.model.Product;
import com.rimsti.rimsti.model.ProductRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRatingRepository extends JpaRepository<ProductRating, Long> {

    List<ProductRating> findByProductId(Long productId);

    Optional<ProductRating> findByEmailAndProductId(String email, Product productId);
}