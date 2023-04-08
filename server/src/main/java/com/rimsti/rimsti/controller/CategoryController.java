package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.DTO.CategoryDTO;
import com.rimsti.rimsti.exceptions.CategoryNotFoundException;
import com.rimsti.rimsti.model.Category;
import com.rimsti.rimsti.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @PostMapping("/create")
    public String createCategory(@RequestBody Category category){
        categoryService.createCategory(category);
        return "success created category";
    }

    @GetMapping("/list")
    public List<Category> getListCategory(){
        return categoryService.getListCategory();
    }

//    @GetMapping("/list/{categoryId}")
//    private Category getCategory(@PathVariable("categoryId") int categoryId) {
//        return categoryService.getCategoryById(categoryId);
//    }

    @GetMapping("/list/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Integer id) {
        try {
            CategoryDTO categoryDTO = categoryService.findCategoryById(id);
            return ResponseEntity.ok(categoryDTO);
        } catch (CategoryNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{categoryId}")
    public Category updateCategory(@PathVariable("categoryId") int categoryId, @RequestBody Category category) {
        categoryService.updateCategory(categoryId, category);
        return category;
    }

    @DeleteMapping("/delete/{categoryId}")
    private String deleteCategory(@PathVariable("categoryId") int categoryId) {
        categoryService.deleteCategory(categoryId);
        return "category deleted";
    }
}
