package com.bookstore.service;

import com.bookstore.entity.ShoppingCart;

public interface ShoppingCartService {

    ShoppingCart update(ShoppingCart shoppingCart);
    void clear(ShoppingCart shoppingCart);
}
