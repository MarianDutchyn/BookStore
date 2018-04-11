package com.bookstore.repository;

import com.bookstore.entity.BookToCartItem;
import com.bookstore.entity.CartItem;
import org.springframework.data.repository.CrudRepository;

public interface BookToCartItemRepository extends CrudRepository<BookToCartItem, Integer> {

    void deleteByCartItem(CartItem cartItem);
}
