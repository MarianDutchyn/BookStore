package com.bookstore.service;

import com.bookstore.entity.UserShipping;

public interface UserShippingService {

    UserShipping findById(int id);
    void remove(int id);

}
