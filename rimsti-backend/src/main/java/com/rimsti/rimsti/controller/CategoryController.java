package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.entity.Categories;
import com.rimsti.rimsti.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @PostMapping("/create")
    public String createCategory(@RequestBody Categories categories){
        categoryService.createCategory(categories);
        return "success created category";
    }

    @GetMapping("/list")
    public List<Categories> getListCategory(){
        return categoryService.getListCategory();
    }

    @GetMapping("/list/{categoryId}")
    private Categories getCategory(@PathVariable("categoryId") int categoryId) {
        return categoryService.getCategoryById(categoryId);
    }

    @PutMapping("/update/{categoryId}")
    public Categories updateCategory(@PathVariable("categoryId") int categoryId, @RequestBody Categories categories) {
        categoryService.updateCategory(categoryId, categories);
        return categories;
    }

    @DeleteMapping("/delete/{categoryId}")
    private String deleteCategory(@PathVariable("categoryId") int categoryId) {
        categoryService.deleteCategory(categoryId);
        return "category deleted";
    }

}
