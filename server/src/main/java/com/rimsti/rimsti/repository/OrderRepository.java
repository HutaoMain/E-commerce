package com.rimsti.rimsti.repository;

import com.rimsti.rimsti.model.Order;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "SELECT total_price, date_now, status, SUM(total_price) as totalPrice FROM dbecommerce.orders where status = \"Completed\" group by date_now;", nativeQuery = true)
    List<sumOfTotalPrice> getByDate();

    List<Order> findByStatus(String status);

    interface sumOfTotalPrice{
        Double getTotalPrice();
        LocalDate getDate_now();
        String getStatus();

    }
}
