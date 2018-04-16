package com.bookstore.service;

import com.bookstore.entity.Shipping;

public interface ShippingService {

    Shipping findById(int id);
    void remove(int id);

}
