package com.rimsti.rimsti.repository;

import com.rimsti.rimsti.model.Category;
import com.rimsti.rimsti.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.name LIKE %:search%")
    List<Product> searchProduct(String search);

    Optional<Product> findFirstByCategoryOrderBySoldDesc(Category category);

    List<Product> findAllByCategory(Category category);
}
