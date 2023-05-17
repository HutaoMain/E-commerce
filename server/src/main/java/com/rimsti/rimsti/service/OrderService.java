package com.rimsti.rimsti.service;

import com.rimsti.rimsti.DTO.OrderDTO;
import com.rimsti.rimsti.DTO.ProductQuantityDTO;
import com.rimsti.rimsti.model.Order;
import com.rimsti.rimsti.model.Product;
//import com.rimsti.rimsti.model.appuser.AppUser;
import com.rimsti.rimsti.model.User;
import com.rimsti.rimsti.repository.OrderRepository;
import com.rimsti.rimsti.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;

    @Transactional
    public void createOrder(OrderDTO orderDTO, User user) {
        Order order = new Order();
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setStatus(orderDTO.getStatus());
        order.setCreatedDate(orderDTO.getCreatedDate());
        order.setProofPayment(orderDTO.getProofPayment());
        order.setDateNow(orderDTO.getDateNow());
        order.setEmail(orderDTO.getEmail());
        order.setUser(user);
        order.setUserFullName(orderDTO.getUserFullName());
        order.setOrderJsonList(orderDTO.getOrderJsonList());
//        order.setAddress(orderDTO.getAddress());
//        order.setCity(orderDTO.getCity());
//        order.setPostalCode(orderDTO.getPostalCode());
        order.setModeOfPayment(orderDTO.getModeOfPayment());

        List<ProductQuantityDTO> productQuantities = orderDTO.getProducts();
        subtractProductsFromInventory(productQuantities);
        updateProductSold(productQuantities);

        orderRepository.save(order);
    }

    private void subtractProductsFromInventory(List<ProductQuantityDTO> productQuantities) {
        for (ProductQuantityDTO pq : productQuantities) {
            Optional<Product> productOptional = productRepository.findById(pq.getProductId());
            if (productOptional.isPresent()) {
                Product product = productOptional.get();
                product.setQuantity(product.getQuantity() - pq.getQuantity());
                productRepository.save(product);
            } else {
                log.error("error in subtractProductsFromInventory");
            }
        }
    }

    public void updateProductSold(List<ProductQuantityDTO> productQuantities) {
        for (ProductQuantityDTO pq : productQuantities) {
            Optional<Product> productOptional = productRepository.findById(pq.getProductId());
            if (productOptional.isPresent()) {
                Product product = productOptional.get();
                product.setSold(product.getSold() + pq.getQuantity());
                productRepository.save(product);
            } else {
                log.error("error in updateProductSold");
            }
        }
    }

    public List<Order> getListOrder() {
        return orderRepository.findAll();
    }

    public Order getOrderById(long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    public void updateOrderById(long orderId, Order getOrder) {
        Order setOrder = orderRepository.getReferenceById(orderId);
        setOrder.setOrderJsonList(getOrder.getOrderJsonList());
        orderRepository.save(setOrder);
    }

    public void updateStatusById(long orderId, Order getOrder) {
        Order setOrder = orderRepository.getReferenceById(orderId);

        // Retain the current trackingNum if the new value is null or blank
        if (getOrder.getTrackingNum() != null && !getOrder.getTrackingNum().isEmpty()) {
            setOrder.setTrackingNum(getOrder.getTrackingNum());
        }

        // Retain the current status if the new value is null or blank
        if (getOrder.getStatus() != null && !getOrder.getStatus().isEmpty()) {
            setOrder.setStatus(getOrder.getStatus());
        }

        if (getOrder.getCourier() != null && !getOrder.getCourier().isEmpty()) {
            setOrder.setCourier(getOrder.getCourier());
        }

        orderRepository.save(setOrder);
    }

    public void updateProofPaymentById(long orderId, Order getOrder) {
        Order setOrder = orderRepository.getReferenceById(orderId);
        setOrder.setProofPayment(getOrder.getProofPayment());
        orderRepository.save(setOrder);
    }

    public void deleteOrderById(long orderId, Order order) {
        orderRepository.deleteById(orderId);
    }

    public List<OrderRepository.sumOfTotalPrice> priceByDay() {
        return orderRepository.getByDate();
    }

    public Double getTotalPriceOfCompletedOrders() {
        List<Order> completedOrders = orderRepository.findByStatus("completed");
        Double totalPrice = 0.0;
        for (Order order : completedOrders) {
            totalPrice += order.getTotalPrice();
        }
        return totalPrice;
    }
}
