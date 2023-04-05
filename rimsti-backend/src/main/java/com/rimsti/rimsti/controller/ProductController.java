package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.DTO.ProductDTO;
import com.rimsti.rimsti.entity.Categories;
import com.rimsti.rimsti.entity.Products;
import com.rimsti.rimsti.repository.CategoryRepository;
import com.rimsti.rimsti.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    CategoryRepository categoryRepository;

    @PostMapping("/create")
    public String createProduct(@RequestBody ProductDTO productDTO){
        Optional<Categories> optionalCategories = categoryRepository.findById(productDTO.getCategoryId());
        if(!optionalCategories.isPresent()){
            return "category does not exist";
        }else {
            productService.createProduct(productDTO, optionalCategories.get());
            return "success created product";
        }
    }

    @GetMapping("/list")
    public List<ProductDTO> getListProduct(){
        List<ProductDTO> productDTOS =productService.getListProducts();
        return productDTOS;
    }

    @PutMapping("/update/{productId}")
    public String updateProduct(@PathVariable("productId") long productId, @RequestBody ProductDTO productDTO){
//        Optional<Categories> optionalCategories = categoryRepository.findById(productDTO.getCategoryId());
//        if(!optionalCategories.isPresent()) {
//            return "category does not exist";
//        }else {
            productService.updateProduct(productDTO, productId);
            return "product successfully updated !";
//        }
    }

    @GetMapping("/list/{productId}")
    private Products getProduct(@PathVariable("productId") long productId) {
        return productService.getProductById(productId);
    }

    @DeleteMapping("/delete/{productId}")
    private String deleteProduct(@PathVariable("productId") long productId) {
        productService.deleteProduct(productId);
        return "deleted";
    }

    @GetMapping("/list/search")
    private List<Products> searchProducts(@RequestParam String products){
        List<Products> searchProducts = productService.searchProduct(products);
        return searchProducts;
    }
}
