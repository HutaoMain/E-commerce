package com.rimsti.rimsti.service;

import com.rimsti.rimsti.DTO.CategoryDTO;
import com.rimsti.rimsti.DTO.ProductDTO;
import com.rimsti.rimsti.exceptions.CategoryNotFoundException;
import com.rimsti.rimsti.model.Category;
import com.rimsti.rimsti.model.Product;
import com.rimsti.rimsti.model.ProductRating;
import com.rimsti.rimsti.repository.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductService productService;

    public void createCategory(Category category) {
        categoryRepository.save(category);
    }

    public List<Category> getListCategory() {
        return categoryRepository.findAll();
    }

//    public Category getCategoryById(Integer categoryId) {
//        return categoryRepository.findById(categoryId).orElse(null);
//    }

    public CategoryDTO findCategoryById(Integer id)  {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            List<ProductDTO> productDTOs = new ArrayList<>();
            for (Product product : category.getProducts()) {
                ProductDTO productDTO = new ProductDTO();
                BeanUtils.copyProperties(product, productDTO);
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
                productDTOs.add(productDTO);
            }
            CategoryDTO categoryDTO = new CategoryDTO();
            BeanUtils.copyProperties(category, categoryDTO);
            categoryDTO.setProducts(productDTOs);
            productService.getBestSellersPerCategory();
            return categoryDTO;
        } else {
            throw new CategoryNotFoundException("Category not found with id: " + id);
        }
    }

    public Category updateCategory(Integer categoryId, Category getCategory) {
        Category setCategory = categoryRepository.getReferenceById(categoryId);
        setCategory.setCategoryName(getCategory.getCategoryName());
        setCategory.setDescription(getCategory.getDescription());
        setCategory.setImageUrl(getCategory.getImageUrl());
        return categoryRepository.save(setCategory);
    }

    public void deleteCategory(int categoryId) {
        categoryRepository.deleteById(categoryId);
    }

}