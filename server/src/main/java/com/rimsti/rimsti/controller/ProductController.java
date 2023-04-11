package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.DTO.ProductDTO;
import com.rimsti.rimsti.model.Category;
import com.rimsti.rimsti.model.Product;
import com.rimsti.rimsti.repository.CategoryRepository;
import com.rimsti.rimsti.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public String createProduct(@RequestBody ProductDTO productDTO) {
        Optional<Category> optionalCategories = categoryRepository.findById(productDTO.getCategoryId());
        if (!optionalCategories.isPresent()) {
            return "category does not exist";
        } else {
            productService.createProduct(productDTO, optionalCategories.get());
            return "success created product";
        }
    }

    @GetMapping("/list")
    public List<ProductDTO> getListProduct() {
        List<ProductDTO> productDTOS = productService.getListProducts();
        return productDTOS;
    }

    @PutMapping("/update/{productId}")
    public String updateProduct(@PathVariable("productId") long productId, @RequestBody ProductDTO productDTO) {
        productService.updateProduct(productDTO, productId);
        return "product successfully updated !";
    }

    @GetMapping("/list/{productId}")
    private Product getProduct(@PathVariable("productId") long productId) {
        return productService.getProductById(productId);
    }

    @DeleteMapping("/delete/{productId}")
    private String deleteProduct(@PathVariable("productId") long productId) {
        productService.deleteProduct(productId);
        return "deleted";
    }

    @GetMapping("/list/search")
    private List<Product> searchProducts(@RequestParam String products) {
        return productService.searchProduct(products);
    }

    @GetMapping("/best-sellers")
    public List<Product> getBestSellersPerCategory() {
        return productService.getBestSellersPerCategory();
    }

}
