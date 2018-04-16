package com.bookstore.service.impl;

import com.bookstore.entity.Shipping;
import com.bookstore.repository.ShippingRepository;
import com.bookstore.service.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShippingServiceImpl implements ShippingService {

    @Autowired
    private ShippingRepository shippingRepository;

    @Override
    public Shipping findById(int id) {
        return shippingRepository.findOne(id);
    }

    @Override
    public void remove(int id) {
        shippingRepository.delete(id);
    }
}
