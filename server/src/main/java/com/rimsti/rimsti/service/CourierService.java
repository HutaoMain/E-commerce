package com.rimsti.rimsti.service;

import com.rimsti.rimsti.DTO.CourierDto;
import com.rimsti.rimsti.model.Courier;
import com.rimsti.rimsti.repository.CourierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourierService {

    @Autowired
    CourierRepository courierRepository;


    public void addCourier(Courier courier) {
        courierRepository.save(courier);
    }

    public List<Courier> getCourierList() {
        return courierRepository.findAll();
    }

}