package com.rimsti.rimsti.repository;

import com.rimsti.rimsti.entity.ProductVariations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductVariationsRepository extends JpaRepository<ProductVariations, Long> {
    public List<ProductVariations> findByProductId(Long productId);

//    SELECT min(id) FROM ProductVariations where productId = id;
    @Query(value = "SELECT min(id) from heroku_130854f11edee87.product_variations where product_id = :productId", nativeQuery = true)
    public Long min(@Param("productId") Long productId);
}
