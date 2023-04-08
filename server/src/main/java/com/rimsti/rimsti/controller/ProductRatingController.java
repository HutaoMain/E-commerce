package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.service.ProductRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/productRating")
public class ProductRatingController {

    @Autowired
    ProductRatingService productRatingService;

    @PutMapping("/{productId}/rate/{userEmail}")
    public ResponseEntity<?> rateProduct(@PathVariable("productId") Long productId,
                                         @PathVariable("userEmail") String userEmail,
                                         @RequestBody Map<String, Object> ratingObj) {
        float rating = Float.parseFloat(ratingObj.get("rating").toString());
        boolean result = productRatingService.rateProduct(userEmail, productId, rating);
        if (result) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
