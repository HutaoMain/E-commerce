package com.rimsti.rimsti.service;

import com.rimsti.rimsti.DTO.OrderDTO;
import com.rimsti.rimsti.model.Order;
import com.rimsti.rimsti.model.appuser.AppUser;
import com.rimsti.rimsti.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    public Order createOrder(OrderDTO orderDTO, AppUser appUser){
        Order orders = new Order();
        orders.setProductName(orderDTO.getProductName());
        orders.setProductId(orderDTO.getProductId());
        orders.setQuantity(orderDTO.getQuantity());
        orders.setTotalPrice(orderDTO.getTotalPrice());
        orders.setCreatedDate(orderDTO.getCreatedDate());
        orders.setAppUser(appUser);
        orders.setUserFullName(orderDTO.getUserFullName());
        orders.setImageUrl(orderDTO.getImageUrl());
        orders.setProductDesc(orderDTO.getProductDesc());
        orders.setStatus(orderDTO.getStatus());
        orders.setDateNow(orderDTO.getDateNow());
        orders.setOrderJsonList(orderDTO.getOrderJsonList());
        orders.setEmail(orderDTO.getEmail());
        orderRepository.save(orders);
        return orders;
    }

    public List<Order> getListOrder(){
        return orderRepository.findAll();
    }

    public Order getOrderById(long orderId) {
        return orderRepository.findById(orderId).get();
    }

    public void updateOrderById(long orderId, Order getOrder) {
        Order setOrder = orderRepository.getReferenceById(orderId);
        setOrder.setProductId(getOrder.getProductId());
        setOrder.setQuantity(getOrder.getQuantity());
        setOrder.setTotalPrice(getOrder.getTotalPrice());
        orderRepository.save(setOrder);
    }

    public void updateStatusById(long orderId, Order getOrder) {
        Order setOrder = orderRepository.getReferenceById(orderId);
        setOrder.setStatus(getOrder.getStatus());
        orderRepository.save(setOrder);
    }

    public void updateProofPaymentById(long orderId, Order getOrder) {
        Order setOrder = orderRepository.getReferenceById(orderId);
        setOrder.setProofPayment(getOrder.getProofPayment());
        orderRepository.save(setOrder);
    }

    public void updateOrNumberByOrderId(long orderId, Order getOrder) {
        Order setOrder = orderRepository.getReferenceById(orderId);
        setOrder.setOrNum(getOrder.getOrNum());
        orderRepository.save(setOrder);
    }

    public void deleteOrderById(long orderId, Order order) {
        orderRepository.deleteById(orderId);
    }

    public List<OrderRepository.sumOfTotalPrice> priceByDay(){ return orderRepository.getByDate();}

}
