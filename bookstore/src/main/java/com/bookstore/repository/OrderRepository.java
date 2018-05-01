package com.bookstore.repository;

import com.bookstore.entity.Order;
import com.bookstore.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Integer> {

    List<Order> findByUser(User user);
}
