package com.rimsti.rimsti.service;

import com.rimsti.rimsti.model.Category;
import com.rimsti.rimsti.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public void createCategory(Category category) {
        categoryRepository.save(category);
    }

    public List<Category> getListCategory() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Integer categoryId) {
        return categoryRepository.findById(categoryId).orElse(null);
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