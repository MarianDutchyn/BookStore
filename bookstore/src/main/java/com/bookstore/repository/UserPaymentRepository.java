package com.bookstore.repository;

import com.bookstore.entity.UserPayment;
import org.springframework.data.repository.CrudRepository;

public interface UserPaymentRepository extends CrudRepository<UserPayment, Integer> {
}
