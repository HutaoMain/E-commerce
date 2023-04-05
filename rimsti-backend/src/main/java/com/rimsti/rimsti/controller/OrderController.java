package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.DTO.OrderDTO;
import com.rimsti.rimsti.entity.Order;
import com.rimsti.rimsti.entity.User;
import com.rimsti.rimsti.entity.appuser.AppUser;
import com.rimsti.rimsti.repository.OrderRepository;
import com.rimsti.rimsti.repository.UserRepository;
import com.rimsti.rimsti.repository.appuserrepository.AppUserRepository;
import com.rimsti.rimsti.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    AppUserRepository appUserRepository;

    @PostMapping(value = "/create")
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO) {
        Optional<AppUser> optionalUser = appUserRepository.findById(orderDTO.getUserId());
        if(optionalUser.isPresent()){
            orderService.createOrder(orderDTO, optionalUser.get());
        }
        return orderDTO;
    }

    @GetMapping("/list")
    public List<Order> getListOrder(){
        return orderService.getListOrder();
    }

    @GetMapping("/list/{orderId}")
    private Order getOrderById(@PathVariable("orderId") long orderId) {
        return orderService.getOrderById(orderId);
    }

    @PutMapping("/update/{orderId}")
    public Order updateOrderById(@PathVariable("orderId") long orderId, @RequestBody Order order) {
        orderService.updateOrderById(orderId, order);
        return order;
    }

    @PutMapping("/update/status/{orderId}")
    public Order updateStatusById(@PathVariable("orderId") long orderId, @RequestBody Order order) {
        orderService.updateStatusById(orderId, order);
        return order;
    }

    @PutMapping("/update/proofPayment/{orderId}")
    public Order updateProofPaymentById(@PathVariable("orderId") long orderId, @RequestBody Order order) {
        orderService.updateProofPaymentById(orderId, order);
        return order;
    }

    @PutMapping("/update/orNumber/{orderId}")
    public Order updateOrNumberById(@PathVariable("orderId") long orderId, @RequestBody Order order) {
        orderService.updateOrNumberByOrderId(orderId, order);
        return order;
    }

    @DeleteMapping("/delete/{orderId}")
    private String deleteOrderById(@PathVariable("orderId") long orderId, @RequestBody Order order) {
        orderService.deleteOrderById(orderId, order);
        return "order deleted";
    }

    @GetMapping("/listByPrice")
    private List<OrderRepository.sumOfTotalPrice> getByDayPrice(){
        return orderService.priceByDay();
    }
}
