package com.rimsti.rimsti.config;


import com.rimsti.rimsti.repository.OrderRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
@Log4j2
public class Scheduler {

    @Autowired
    OrderRepository orderRepository;

//    @Scheduled(cron = "0 0 0 */5 * *")
//    void updateStatusWhenPending(){
//        orderRepository.updateStatus();
//        log.info("updated");
//    }
}
