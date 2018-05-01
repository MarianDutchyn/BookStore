package com.bookstore.repository;

import com.bookstore.entity.CartItem;
import com.bookstore.entity.Order;
import com.bookstore.entity.ShoppingCart;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CartItemRepository extends CrudRepository<CartItem, Integer> {

    List<CartItem> findByShoppingCart(ShoppingCart shoppingCart);
    List<CartItem> findByOrder(Order order);
}
