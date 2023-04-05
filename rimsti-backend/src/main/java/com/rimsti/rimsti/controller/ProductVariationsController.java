package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.DTO.ProductVariationsDTO;
import com.rimsti.rimsti.entity.ProductVariations;
import com.rimsti.rimsti.entity.Products;
import com.rimsti.rimsti.repository.ProductRepository;
import com.rimsti.rimsti.service.ProductVariationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productVariations")
public class ProductVariationsController {

    @Autowired
    ProductVariationsService productVariationsService;

    @Autowired
    ProductRepository productRepository;

    @PostMapping("/create")
    public ProductVariationsDTO createProductVariation(@RequestBody ProductVariationsDTO productVariationsDTO){
        Optional<Products> optionalProducts = productRepository.findById(productVariationsDTO.getProductId());
        if (optionalProducts.isPresent()) {
            productVariationsService.createProductVariation(productVariationsDTO, optionalProducts.get());
        }
        return productVariationsDTO;
    }

    @GetMapping("/list/{productId}")
    public List<ProductVariations> getAllProductVariation(@PathVariable Long productId) {
        return productVariationsService.getAllByProductId(productId);
    }

    @GetMapping("/{productVarId}")
    private ProductVariations getProduct(@PathVariable("productVarId") long productVarId) {
        return productVariationsService.getProductVariationById(productVarId);
    }

    @PutMapping("/update/quantity/{productVarId}")
    public ResponseEntity<?> updateProduct(@PathVariable("productVarId") long productVarId, @RequestBody ProductVariationsDTO productVariationsDTO){
//        Optional<Products> optionalProducts = productRepository.findById(productVariationsDTO.getProductId());
//        if(!optionalProducts.isPresent()) {
//            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
//        }else {
            productVariationsService.updateProductQuantity(productVariationsDTO, productVarId);
            return new ResponseEntity<>(HttpStatus.OK);
//        }
    }

    @PutMapping("/update/{productVarId}")
    public ResponseEntity<?> updateProductVar(@PathVariable("productVarId") long productVarId, @RequestBody ProductVariationsDTO productVariationsDTO){
//        Optional<Products> optionalProducts = productRepository.findById(productVariationsDTO.getProductId());
//        if(!optionalProducts.isPresent()) {
//            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
//        }else {
        productVariationsService.updateProduct(productVariationsDTO, productVarId);
        return new ResponseEntity<>(HttpStatus.OK);
//        }
    }

    @GetMapping("/{productId}/min")
    public Long getListCategory(@PathVariable("productId") Long productId){
        return productVariationsService.min(productId);
    }

    @GetMapping("/list")
    public List<ProductVariationsDTO> getListProduct(){
        List<ProductVariationsDTO> productVariationsDTOS =productVariationsService.getAllListOfProductVariations();
        return productVariationsDTOS;
    }

    @DeleteMapping("/delete/{productVarId}")
    private String deleteProductVar(@PathVariable("productVarId") long productVarId) {
        productVariationsService.deleteVariationById(productVarId);
        return "deleted";
    }
}
