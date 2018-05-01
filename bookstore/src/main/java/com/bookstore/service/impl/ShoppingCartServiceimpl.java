package com.bookstore.service.impl;

import com.bookstore.entity.CartItem;
import com.bookstore.entity.ShoppingCart;
import com.bookstore.repository.CartItemRepository;
import com.bookstore.repository.ShoppingCartRepository;
import com.bookstore.service.CartItemService;
import com.bookstore.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ShoppingCartServiceimpl implements ShoppingCartService {

    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Override
    public ShoppingCart update(ShoppingCart shoppingCart) {
        BigDecimal cartTotal = new BigDecimal(0);
        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);

        for (CartItem cartItem: cartItemList) {
            if (cartItem.getBook().getInStockNumber() > 0){
                cartItemService.updateCartItem(cartItem);
                cartTotal = cartTotal.add(cartItem.getSubTotal());
            }
        }
        shoppingCart.setTotal(cartTotal);
        shoppingCartRepository.save(shoppingCart);
        return shoppingCart;

    }

    @Override
    public void clear(ShoppingCart shoppingCart) {
        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);

        for (CartItem cartItem: cartItemList) {
            cartItemService.removeCartItem(cartItem);
        }

        shoppingCart.setTotal(new BigDecimal(0));
        shoppingCartRepository.save(shoppingCart);

    }
}
