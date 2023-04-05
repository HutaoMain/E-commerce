package com.rimsti.rimsti.repository;

import com.rimsti.rimsti.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Products, Long> {
    @Query("SELECT p FROM Products p WHERE p.name LIKE %:search%")
    List<Products> searchProduct(String search);
}
