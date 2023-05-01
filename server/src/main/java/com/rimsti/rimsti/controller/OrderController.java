package com.rimsti.rimsti.controller;

import com.rimsti.rimsti.DTO.OrderDTO;
import com.rimsti.rimsti.model.Order;
import com.rimsti.rimsti.model.User;
import com.rimsti.rimsti.repository.OrderRepository;
import com.rimsti.rimsti.repository.UserRepository;
import com.rimsti.rimsti.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    UserRepository userRepository;


    @PostMapping(value = "/create")
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO) {
        Optional<User> optionalUser = userRepository.findById(orderDTO.getUserId());
        optionalUser.ifPresent(appUser -> orderService.createOrder(orderDTO, appUser));
        return orderDTO;
    }

    @GetMapping("/list")
    public List<Order> getListOrder() {
        return orderService.getListOrder();
    }

    @GetMapping("/list/{orderId}")
    private Order getOrderById(@PathVariable("orderId") long orderId) {
        return orderService.getOrderById(orderId);
    }

    @PutMapping("/updateOrderList/{orderId}")
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

    @DeleteMapping("/delete/{orderId}")
    private String deleteOrderById(@PathVariable("orderId") long orderId, @RequestBody Order order) {
        orderService.deleteOrderById(orderId, order);
        return "order deleted";
    }

    @GetMapping("/list-sales")
    private List<OrderRepository.sumOfTotalPrice> getByDayPrice() {
        return orderService.priceByDay();
    }

    @GetMapping("/total-price")
    public ResponseEntity<Double> getTotalPriceOfCompletedOrders() {
        Double totalPrice = orderService.getTotalPriceOfCompletedOrders();
        return ResponseEntity.ok(totalPrice);
    }

}
