package com.bookstore.service;

import com.bookstore.entity.*;

public interface OrderService {

    Order createOrder(ShoppingCart shoppingCart,
                      ShippingAddress shippingAddress,
                      BillingAddress billingAddress,
                      Payment payment,
                      User user);

    Order findOne(int id);
}

