package com.rimsti.rimsti.service;

import com.rimsti.rimsti.model.Product;
import com.rimsti.rimsti.model.Wishlist;
import com.rimsti.rimsti.repository.ProductRepository;
import com.rimsti.rimsti.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {

    @Autowired
    WishlistRepository wishlistRepository;

    @Autowired
    ProductRepository productRepository;

    public List<Wishlist> getWishListByEmail(String email) {
        return wishlistRepository.findByEmail(email);
    }

    public Wishlist addWishList(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }


    public List<Product> getWishlistProductByEmail(String email) {
        List<Wishlist> wishlist = wishlistRepository.findByEmail(email);
        List<Product> productList = new ArrayList<>();

        for (Wishlist w : wishlist) {
            Optional<Product> product = productRepository.findById(w.getProductId());
            product.ifPresent(productList::add);
        }

        return productList;
    }

    @Transactional
    public Wishlist deleteWishlist(Long id){
        wishlistRepository.deleteByProductId(id);
        return null;
    }

}
