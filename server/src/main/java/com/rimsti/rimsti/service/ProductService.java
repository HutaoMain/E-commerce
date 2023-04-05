package com.rimsti.rimsti.service;

import com.rimsti.rimsti.DTO.ProductDTO;
import com.rimsti.rimsti.model.Category;
import com.rimsti.rimsti.model.Product;
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
        product.setRating(0.0F);
        product.setPrice(productDTO.getPrice());
        product.setQuantity(productDTO.getQuantity());
        product.setDescription(productDTO.getDescription());
        product.setCategory(category);
        product.setCreatedDate(productDTO.getCreatedDate());
        product.setUpdatedDate(productDTO.getUpdatedDate());
        productRepository.save(product);
        return product;
    }

    public ProductDTO getProductDtos(Product products){
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(products.getId());
        productDTO.setName(products.getName());
        productDTO.setImageUrl(products.getImageUrl());
        productDTO.setDescription(products.getDescription());
        productDTO.setRating(products.getRating());
        productDTO.setPrice(products.getPrice());
        productDTO.setQuantity(products.getQuantity());
        productDTO.setCategoryId(products.getCategory().getId());
        productDTO.setCreatedDate(products.getCreatedDate());
        productDTO.setUpdatedDate(products.getUpdatedDate());
        return productDTO;
    }

    public List<ProductDTO> getListProducts(){
        List<Product> allProducts =  productRepository.findAll();
        List<ProductDTO> productDTOS = new ArrayList<>();
        for(Product products: allProducts){
            productDTOS.add(getProductDtos(products));
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
