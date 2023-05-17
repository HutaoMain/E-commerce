package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.DTO.CourierDto;
import com.rimsti.rimsti.model.Courier;
import com.rimsti.rimsti.service.CourierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courier")
public class CourierController {

    @Autowired
    CourierService courierService;

    @PostMapping("/create")
    ResponseEntity<String> addCourier(@RequestBody Courier courier) {
        courierService.addCourier(courier);
        return ResponseEntity.ok("Courier added");
    }

    @GetMapping("/list")
    ResponseEntity<List<Courier>> getCourierList() {
        List<Courier> courierList = courierService.getCourierList();
        return ResponseEntity.ok(courierList);
    }
}
