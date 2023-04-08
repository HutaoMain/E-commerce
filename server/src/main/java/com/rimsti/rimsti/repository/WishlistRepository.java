package com.rimsti.rimsti.repository;

import com.rimsti.rimsti.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {

    List<Wishlist> findByEmail(String email);

    void deleteByProductId(Long productId);
}
