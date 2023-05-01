package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.model.Product;
import com.rimsti.rimsti.model.ProductRating;
import com.rimsti.rimsti.repository.ProductRepository;
import com.rimsti.rimsti.service.ProductRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/productRating")
public class ProductRatingController {

    @Autowired
    ProductRatingService productRatingService;

    @Autowired
    ProductRepository productRepository;

    @PostMapping("/rate")
    public ResponseEntity<?> rateProduct(@RequestBody ProductRating productRating) {
        productRatingService.addRating(productRating);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/customerRating")
    public ResponseEntity<Float> getAverageRatingPercentage() {
        float averageRatingPercentage = productRatingService.getAverageRatingPercentage();
        return ResponseEntity.ok(averageRatingPercentage);
    }
}
