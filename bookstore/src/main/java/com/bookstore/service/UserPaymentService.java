package com.bookstore.service;

import com.bookstore.entity.UserPayment;

public interface UserPaymentService {

    UserPayment findById(int id);
    void remove(int id);
}
