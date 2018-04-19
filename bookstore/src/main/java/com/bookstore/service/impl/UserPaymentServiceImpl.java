package com.bookstore.service.impl;

import com.bookstore.entity.UserPayment;
import com.bookstore.repository.UserPaymentRepository;
import com.bookstore.service.UserPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserPaymentServiceImpl implements UserPaymentService {

    @Autowired
    private UserPaymentRepository userPaymentRepository;

    @Override
    public UserPayment findById(int id) {
        return userPaymentRepository.findOne(id);
    }

    @Override
    public void remove(int id) {
        userPaymentRepository.delete(id);
    }
}
