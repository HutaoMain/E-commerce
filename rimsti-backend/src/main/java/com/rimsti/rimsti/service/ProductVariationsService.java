package com.rimsti.rimsti.service;

import com.rimsti.rimsti.DTO.ProductVariationsDTO;
import com.rimsti.rimsti.entity.Order;
import com.rimsti.rimsti.entity.ProductVariations;
import com.rimsti.rimsti.entity.Products;
import com.rimsti.rimsti.repository.OrderRepository;
import com.rimsti.rimsti.repository.ProductVariationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductVariationsService {

    @Autowired
    ProductVariationsRepository productVariationsRepository;

    @Autowired
    OrderRepository orderRepository;

    public ProductVariations createProductVariation(ProductVariationsDTO productVariationsDTO, Products products){
        ProductVariations productVariations = new ProductVariations();
        productVariations.setVariationName(productVariationsDTO.getVariationName());
        productVariations.setPrice(productVariationsDTO.getPrice());
        productVariations.setImgUrl(productVariationsDTO.getImgUrl());
        productVariations.setQuantity(productVariationsDTO.getQuantity());
        productVariations.setProduct(products);
        productVariations.setDescription(productVariationsDTO.getDescription());
        productVariationsRepository.save(productVariations);
        return productVariations;
    }

    public List<ProductVariations> getAllByProductId (Long productId){
        List<ProductVariations> list = new ArrayList<>();
        productVariationsRepository.findByProductId(productId)
                .forEach(list::add);
        return list;
    }

    public ProductVariationsDTO getProductVarDtos(ProductVariations productVariations){
        ProductVariationsDTO productVariationsDTO = new ProductVariationsDTO();
        productVariationsDTO.setId(productVariations.getId());
        productVariationsDTO.setVariationName(productVariations.getVariationName());
        productVariationsDTO.setProductId(productVariations.getProduct().getId());
        productVariationsDTO.setPrice(productVariations.getPrice());
        productVariationsDTO.setImgUrl(productVariations.getImgUrl());
        productVariationsDTO.setQuantity(productVariations.getQuantity());
        return productVariationsDTO;
    }

    public List<ProductVariationsDTO> getAllListOfProductVariations(){
        List<ProductVariations> productVariationsList =  productVariationsRepository.findAll();
        List<ProductVariationsDTO> productVariationsDTOS = new ArrayList<>();
        for(ProductVariations productVariations: productVariationsList){
            productVariationsDTOS.add(getProductVarDtos(productVariations));
        }
        return productVariationsDTOS;
    }

    public ProductVariations getProductVariationById(long productVarId){
        return productVariationsRepository.findById(productVarId).get();
    }

    public void updateProductQuantity(ProductVariationsDTO productVariationsDTO, long productVarId) {
        Optional<ProductVariations> optionalProductVariations = productVariationsRepository.findById(productVarId);
        if(!optionalProductVariations.isPresent()){
            try {
                throw new Exception("Product not present!");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        ProductVariations productVariations = optionalProductVariations.get();
        productVariations.setQuantity(productVariationsDTO.getQuantity());
        productVariationsRepository.save(productVariations);
    }

    public void updateProduct(ProductVariationsDTO productVariationsDTO, long productVarId) {
        Optional<ProductVariations> optionalProductVariations = productVariationsRepository.findById(productVarId);
        if(!optionalProductVariations.isPresent()){
            try {
                throw new Exception("Product not present!");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        ProductVariations productVariations = optionalProductVariations.get();
        productVariations.setVariationName(productVariationsDTO.getVariationName());
        productVariations.setPrice(productVariationsDTO.getPrice());
        productVariations.setImgUrl(productVariationsDTO.getImgUrl());
        productVariations.setQuantity(productVariationsDTO.getQuantity());
        productVariations.setDescription(productVariationsDTO.getDescription());
        productVariationsRepository.save(productVariations);
    }

    public void checkout(ProductVariationsDTO productVariationsDTO, long productVarId) {
        List<Order> orderList = orderRepository.findAll();
        Optional<ProductVariations> optionalProductVariations = productVariationsRepository.findById(productVarId);
        for(Order order: orderList){
            ProductVariations productVariations = optionalProductVariations.get();
            productVariations.setQuantity(productVariationsDTO.getQuantity() - order.getQuantity());
            productVariationsRepository.save(productVariations);
        }
    }

    public Long min(Long productId){
        return productVariationsRepository.min(productId);
    }

    public void deleteVariationById(long productVarId) {
        productVariationsRepository.deleteById(productVarId);
    }
}
