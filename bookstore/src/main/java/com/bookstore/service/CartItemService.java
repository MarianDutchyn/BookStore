package com.bookstore.service;

import com.bookstore.entity.Book;
import com.bookstore.entity.CartItem;
import com.bookstore.entity.ShoppingCart;
import com.bookstore.entity.User;

import java.util.List;

public interface CartItemService {

    CartItem addBookToCartItem(Book book, User user, int quantity);
    List<CartItem> findByShoppingCart(ShoppingCart shoppingCart);
    CartItem updateCartItem(CartItem cartItem);
    void removeCartItem(CartItem cartItem);
    CartItem findById(int id);
    CartItem save(CartItem  cartItem);
}
