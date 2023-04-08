package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.model.Product;
import com.rimsti.rimsti.model.Wishlist;
import com.rimsti.rimsti.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    WishlistService wishlistService;

    @GetMapping("/{email}")
    public ResponseEntity<?> getWishlistByEmail(@PathVariable String email) {
        List<Wishlist> wishlistList = wishlistService.getWishListByEmail(email);
        return ResponseEntity.ok(wishlistList);
    }

    @PostMapping("/create")
    public ResponseEntity<?> addWishlist(@RequestBody Wishlist wishlist) {
        Wishlist createdWishlist = wishlistService.addWishList(wishlist);
        if (createdWishlist != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdWishlist);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error creating wishlist");
        }
    }

    @GetMapping("/product/{email}")
    public ResponseEntity<?> getWishlistProductByEmail(@PathVariable String email) {
        List<Product> wishlistList = wishlistService.getWishlistProductByEmail(email);
        return ResponseEntity.ok(wishlistList);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteWishlist(@PathVariable Long id) {
        Wishlist wishlistList = wishlistService.deleteWishlist(id);
        return ResponseEntity.ok(wishlistList);
    }
}
