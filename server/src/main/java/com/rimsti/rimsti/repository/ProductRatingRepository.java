package com.rimsti.rimsti.repository;

import com.rimsti.rimsti.model.ProductRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRatingRepository extends JpaRepository<ProductRating, Long> {
}
