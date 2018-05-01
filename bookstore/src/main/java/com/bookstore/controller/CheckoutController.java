package com.bookstore.controller;

import com.bookstore.entity.*;
import com.bookstore.service.CartItemService;
import com.bookstore.service.OrderService;
import com.bookstore.service.ShoppingCartService;
import com.bookstore.service.UserService;
import com.bookstore.utility.MailConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    private Order order = new Order();
    @Autowired
    private UserService userService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private ShoppingCartService shoppingCartService;

    @RequestMapping(value = "/checkout", method = RequestMethod.POST)
    public Order checkout(@RequestBody HashMap<String, Object> mapper, Principal principal) {

        ObjectMapper objectMapper = new ObjectMapper();

        ShippingAddress shippingAddress = objectMapper.convertValue(mapper.get("shippingAddress"), ShippingAddress.class);
        BillingAddress billingAddress = objectMapper.convertValue(mapper.get("billingAddress"), BillingAddress.class);
        Payment payment = objectMapper.convertValue(mapper.get("payment"), Payment.class);

        ShoppingCart shoppingCart = userService.findByUsername(principal.getName()).getShoppingCart();
        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
        User user = userService.findByUsername(principal.getName());
        Order order = orderService.createOrder(shoppingCart, shippingAddress, billingAddress, payment, user);

        shoppingCartService.clear(shoppingCart);

        return order;
    }
}
