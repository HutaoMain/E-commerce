package com.rimsti.rimsti.service;

import com.rimsti.rimsti.DTO.ProductDTO;
import com.rimsti.rimsti.model.Category;
import com.rimsti.rimsti.model.Product;
import com.rimsti.rimsti.model.ProductRating;
import com.rimsti.rimsti.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public Product createProduct(ProductDTO productDTO, Category category){
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setImageUrl(productDTO.getImageUrl());
        product.setPrice(productDTO.getPrice());
        product.setQuantity(productDTO.getQuantity());
        product.setDescription(productDTO.getDescription());
        product.setCategory(category);
        product.setCreatedDate(productDTO.getCreatedDate());
        product.setUpdatedDate(productDTO.getUpdatedDate());
        productRepository.save(product);
        return product;
    }

    private ProductDTO getProductDtos(Product product){
        ProductDTO productDTO = new ProductDTO();

        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setImageUrl(product.getImageUrl());
        productDTO.setDescription(product.getDescription());
        productDTO.setPrice(product.getPrice());
        productDTO.setQuantity(product.getQuantity());
        productDTO.setCategoryId(product.getCategory().getId());
        productDTO.setCreatedDate(product.getCreatedDate());
        productDTO.setUpdatedDate(product.getUpdatedDate());

        List<ProductRating> ratings = product.getRatings();
        float totalRating = 0f;
        for (ProductRating rating : ratings) {
            totalRating += rating.getRating();
        }
        float finalRating = 0f;
        if (ratings.size() > 0) {
            finalRating = totalRating / ratings.size();
        }
        productDTO.setFinalRating(finalRating);

        return productDTO;
    }

    public List<ProductDTO> getListProducts(){
        List<Product> allProducts =  productRepository.findAll();
        List<ProductDTO> productDTOS = new ArrayList<>();
        for(Product product : allProducts){
            productDTOS.add(getProductDtos(product));
        }
        return productDTOS;
    }

    public Product getProductById(long productId){
        return productRepository.findById(productId).orElse(null);
    }

    public void updateProduct(ProductDTO productDTO, long productId) {
        Optional<Product> optionalProducts = productRepository.findById(productId);
        if(!optionalProducts.isPresent()){
            try {
                throw new Exception("Product not present!");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        Product products = optionalProducts.get();
        products.setName(productDTO.getName());
        products.setImageUrl(productDTO.getImageUrl());
        products.setDescription(productDTO.getDescription());
        products.setUpdatedDate(productDTO.getUpdatedDate());
        products.setPrice(productDTO.getPrice());
        products.setQuantity(productDTO.getQuantity());
        productRepository.save(products);
    }

    public void deleteProduct(long productId) {
        productRepository.deleteById(productId);
    }

    public List<Product> searchProduct(String products){ return productRepository.searchProduct(products);}
}
