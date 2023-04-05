package com.rimsti.rimsti.service;

import com.rimsti.rimsti.DTO.ProductDTO;
import com.rimsti.rimsti.entity.Categories;
import com.rimsti.rimsti.entity.Products;
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

    public Products createProduct(ProductDTO productDTO, Categories categories){
        Products products = new Products();
        products.setName(productDTO.getName());
        products.setImageUrl(productDTO.getImageUrl());
        products.setDescription(productDTO.getDescription());
        products.setCategories(categories);
        products.setCreatedDate(productDTO.getCreatedDate());
        products.setUpdatedDate(productDTO.getUpdatedDate());
        productRepository.save(products);
        return products;
    }

    public ProductDTO getProductDtos(Products products){
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(products.getId());
        productDTO.setName(products.getName());
        productDTO.setImageUrl(products.getImageUrl());
        productDTO.setDescription(products.getDescription());
        productDTO.setCategoryId(products.getCategories().getId());
        productDTO.setCreatedDate(products.getCreatedDate());
        productDTO.setUpdatedDate(products.getUpdatedDate());
        return productDTO;
    }

    public List<ProductDTO> getListProducts(){
        List<Products> allProducts =  productRepository.findAll();
        List<ProductDTO> productDTOS = new ArrayList<>();
        for(Products products: allProducts){
            productDTOS.add(getProductDtos(products));
        }
        return productDTOS;
    }

    public Products getProductById(long productId){
        return productRepository.findById(productId).get();
    }

    public void updateProduct(ProductDTO productDTO, long productId) {
        Optional<Products> optionalProducts = productRepository.findById(productId);
        if(!optionalProducts.isPresent()){
            try {
                throw new Exception("Product not present!");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        Products products = optionalProducts.get();
        products.setName(productDTO.getName());
        products.setImageUrl(productDTO.getImageUrl());
        products.setDescription(productDTO.getDescription());
        products.setUpdatedDate(productDTO.getUpdatedDate());
        productRepository.save(products);
    }

    public void deleteProduct(long productId) {
        productRepository.deleteById(productId);
    }

    public List<Products> searchProduct(String products){ return productRepository.searchProduct(products);}

}
