package com.rimsti.rimsti.service;

import com.rimsti.rimsti.entity.Categories;
import com.rimsti.rimsti.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public void createCategory(Categories categories){
        categoryRepository.save(categories);
    }

    public List<Categories> getListCategory(){
        return categoryRepository.findAll();
    }

    public Categories getCategoryById(int categoryId) {
        return categoryRepository.findById(categoryId).get();
    }
    public void updateCategory(int categoryId, Categories getCategory) {
        Categories setCategory = categoryRepository.getReferenceById(categoryId);
        setCategory.setCategoryName(getCategory.getCategoryName());
        setCategory.setDescription(getCategory.getDescription());
        setCategory.setImageUrl(getCategory.getImageUrl());
        categoryRepository.save(setCategory);
    }

    public void deleteCategory(int categoryId) {
        categoryRepository.deleteById(categoryId);
    }

}
