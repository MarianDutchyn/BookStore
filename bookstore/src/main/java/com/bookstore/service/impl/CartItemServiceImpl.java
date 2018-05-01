package com.bookstore.service.impl;

import com.bookstore.entity.*;
import com.bookstore.repository.BookToCartItemRepository;
import com.bookstore.repository.CartItemRepository;
import com.bookstore.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private BookToCartItemRepository bookToCartItemRepository;


    @Override
    public CartItem addBookToCartItem(Book book, User user, int quantity) {
        List<CartItem> cartItemList = findByShoppingCart(user.getShoppingCart());

        for (CartItem cartItem: cartItemList) {
           if (book.getId() == cartItem.getBook().getId()){
               cartItem.setQuantity(cartItem.getQuantity() + quantity);
               cartItem.setSubTotal(new BigDecimal(book.getOurPrice()).multiply(new BigDecimal(quantity)));
               cartItemRepository.save(cartItem);
               return cartItem;
           }
        }

        CartItem cartItem = new CartItem();
        cartItem.setQuantity(quantity);
        cartItem.setSubTotal(new BigDecimal(book.getOurPrice()).multiply(new BigDecimal(quantity)));
        cartItem.setBook(book);
        cartItem.setShoppingCart(user.getShoppingCart());

        cartItem = cartItemRepository.save(cartItem);

        BookToCartItem bookToCartItem = new BookToCartItem();
        bookToCartItem.setBook(book);
        bookToCartItem.setCartItem(cartItem);
        bookToCartItemRepository.save(bookToCartItem);

        return cartItem;
    }

    @Override
    public List<CartItem> findByShoppingCart(ShoppingCart shoppingCart) {
        return cartItemRepository.findByShoppingCart(shoppingCart);
    }

    @Override
    public List<CartItem> findByOrder(Order order) {
        return cartItemRepository.findByOrder(order);
    }

    @Override
    public CartItem updateCartItem(CartItem cartItem) {
        BigDecimal bigDecimal = new BigDecimal(cartItem.getBook().getOurPrice()).multiply(new BigDecimal(cartItem.getQuantity()));
        bigDecimal = bigDecimal.setScale(2, BigDecimal.ROUND_HALF_UP);
        cartItem.setSubTotal(bigDecimal);
        cartItemRepository.save(cartItem);
        return cartItem;
    }

    @Transactional
    @Override
    public void removeCartItem(CartItem cartItem) {
        bookToCartItemRepository.deleteByCartItem(cartItem);
        cartItemRepository.delete(cartItem);
    }

    @Override
    public CartItem findById(int id) {
        return cartItemRepository.findOne(id);
    }

    @Override
    public CartItem save(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }
}
