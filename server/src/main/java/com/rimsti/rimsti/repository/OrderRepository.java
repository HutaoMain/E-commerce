package com.rimsti.rimsti.repository;

import com.rimsti.rimsti.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query(value = "SELECT total_price, or_num, date_now, status, SUM(total_price) as totalPrice FROM heroku_130854f11edee87.orders where or_num != \"\" && status = \"Completed\" group by date_now;", nativeQuery = true)
    List<sumOfTotalPrice> getByDate();

    @Transactional
    @Modifying
    @Query(value = "UPDATE heroku_130854f11edee87.orders SET status='Cancelled' where status ='Pending' AND created_date < now();", nativeQuery = true)
    void updateStatus();

//    @Transactional
//    @Modifying
//    @Query(value = "UPDATE rimsti.orders SET status='Cancelled' where status ='Pending' AND created_date < now();", nativeQuery = true)
//    void updateQuantity();

    interface sumOfTotalPrice{
        Double getTotalPrice();
        LocalDate getDate_now();
        String getStatus();
        String getOr_num();
    }
}
