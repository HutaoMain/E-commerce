package com.rimsti.rimsti.service;

import com.rimsti.rimsti.model.Product;
import com.rimsti.rimsti.model.ProductRating;
import com.rimsti.rimsti.model.appuser.AppUser;
import com.rimsti.rimsti.repository.ProductRatingRepository;
import com.rimsti.rimsti.repository.ProductRepository;
import com.rimsti.rimsti.repository.appuserrepository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductRatingService {

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    ProductRatingRepository productRatingRepository;

//    public boolean rateProduct(String email, Long productId, float rating) {
//        Optional<AppUser> optionalUser = appUserRepository.findByEmail(email);
//        Optional<Product> optionalProduct = productRepository.findById(productId);
//
//        if (optionalUser.isPresent() && optionalProduct.isPresent()) {
//            Product product = optionalProduct.get();
//
//            ProductRating ratingObj = new ProductRating();
//            ratingObj.setEmail(email);
//            ratingObj.setProduct(product);
//            ratingObj.setRating(rating);
//
//            product.getRatings().add(ratingObj);
//            productRepository.save(product);
//            return true;
//        } else {
//            return false;
//        }
//    }


    public ProductRating addRating(ProductRating productRating){
        return productRatingRepository.save(productRating);
    }
}
