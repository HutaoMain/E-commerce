package com.rimsti.rimsti.service;

import com.rimsti.rimsti.model.ProductRating;
import com.rimsti.rimsti.repository.ProductRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductRatingService {

    @Autowired
    ProductRatingRepository productRatingRepository;

    public ProductRating addRating(ProductRating productRating){
        return productRatingRepository.save(productRating);
    }

    public float getAverageRatingPercentage() {
        List<ProductRating> productRatings = productRatingRepository.findAll();
        float sumRatings = productRatings.stream().map(ProductRating::getRating).reduce(0f, Float::sum);
        float averageRating = sumRatings / productRatings.size();
        return averageRating * 100 / 5;
    }
}
