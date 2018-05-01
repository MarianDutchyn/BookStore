package com.bookstore.service.impl;

import com.bookstore.entity.*;
import com.bookstore.repository.BillingAddressRepository;
import com.bookstore.repository.OrderRepository;
import com.bookstore.repository.PaymentRepository;
import com.bookstore.repository.ShippingAddressRepository;
import com.bookstore.service.BookService;
import com.bookstore.service.CartItemService;
import com.bookstore.service.OrderService;
import com.bookstore.utility.MailConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ShippingAddressRepository shippingAddressRepository;
    @Autowired
    private BillingAddressRepository billingAddressRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private BookService bookService;
    @Autowired
    private MailConstructor mailConstructor;


    @Override
    public synchronized Order createOrder(ShoppingCart shoppingCart, ShippingAddress shippingAddress, BillingAddress billingAddress, Payment payment, User user) {

        Order order = new Order();
        order.setShippingAddress(shippingAddress);
        order.setBillingAddress(billingAddress);
        order.setPayment(payment);
        order.setOrderStatus("created");

        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);

        for (CartItem cartItem: cartItemList) {
            Book book = cartItem.getBook();
            cartItem.setOrder(order);
            book.setInStockNumber(book.getInStockNumber() - cartItem.getQuantity());
        }

        LocalDateTime localDateTime = LocalDateTime.now();
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        order.setCartItemList(cartItemList);
        order.setOrderDate(timeFormatter.format(localDateTime));
        order.setOrderTotal(shoppingCart.getTotal().intValue());
        shippingAddress.setOrder(order);
        billingAddress.setOrder(order);
        payment.setOrder(order);
        order.setUser(user);

        order = orderRepository.save(order);

        return order;
    }

    @Override
    public Order findOne(int id) {
        return orderRepository.findOne(id);
    }


}
