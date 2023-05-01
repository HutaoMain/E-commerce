package com.rimsti.rimsti.service;

import com.rimsti.rimsti.model.ProductRating;
import com.rimsti.rimsti.repository.ProductRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductRatingService {

    @Autowired
    ProductRatingRepository productRatingRepository;

    //service
    public void addRating(ProductRating productRating){
        Optional<ProductRating> existingRating = productRatingRepository.findByEmailAndProductId(productRating.getEmail(), productRating.getProductId());
        if (existingRating.isPresent()) {
            ProductRating rating = existingRating.get();
            rating.setRating(productRating.getRating());
            productRatingRepository.save(rating);
        } else {
            productRatingRepository.save(productRating);
        }
    }


    public float getAverageRatingPercentage() {
        List<ProductRating> productRatings = productRatingRepository.findAll();
        float sumRatings = productRatings.stream().map(ProductRating::getRating).reduce(0f, Float::sum);
        float averageRating = sumRatings / productRatings.size();
        return averageRating * 100 / 5;
    }
}
