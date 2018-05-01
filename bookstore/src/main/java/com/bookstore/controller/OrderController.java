package com.bookstore.controller;

import com.bookstore.entity.CartItem;
import com.bookstore.entity.Order;
import com.bookstore.entity.User;
import com.bookstore.service.CartItemService;
import com.bookstore.service.OrderService;
import com.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private UserService userService;
    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private OrderService orderService;

    @RequestMapping("/getOrderList")
    public List<Order> getOrderList(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        List<Order> orderList = user.getOrderList();

        return orderList;
    }

    @RequestMapping("/getCartItemList")
    public List<CartItem> getCartItemList(@RequestBody String orderId, Principal principal) {
        Order order = orderService.findOne(Integer.parseInt(orderId));
        List<CartItem> cartItemList = cartItemService.findByOrder(order);
        return cartItemList;
    }
}
