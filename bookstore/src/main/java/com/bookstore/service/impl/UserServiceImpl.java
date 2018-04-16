package com.bookstore.service.impl;

import com.bookstore.entity.Shipping;
import com.bookstore.entity.ShoppingCart;
import com.bookstore.entity.User;
import com.bookstore.entity.security.UserRole;
import com.bookstore.repository.RoleRepository;
import com.bookstore.repository.ShippingRepository;
import com.bookstore.repository.UserRepository;
import com.bookstore.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Set;
@Service
public class UserServiceImpl implements UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ShippingRepository shippingRepository;

    @Transactional
    public User createUser(User user, Set<UserRole> userRoles) {
        User localUser = userRepository.findByUsername(user.getUsername());
        if (localUser != null){
            LOG.info("User with username {} already exist. Nothing will be done", user.getUsername());
        } else {
            for (UserRole ur: userRoles) {
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            ShoppingCart shoppingCart = new ShoppingCart();
            shoppingCart.setUser(user);
            user.setShoppingCart(shoppingCart);
            localUser = userRepository.save(user);
        }

        return localUser;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findById(int id) {
        return userRepository.findOne(id);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void updateShipping(Shipping shipping, User user) {
        shipping.setUser(user);
        shipping.setDefaultShipping(true);
        user.getShippingList().add(shipping);
        userRepository.save(user);
    }

    @Override
    public void setDefaultShipping(int shippingId, User user) {
        List<Shipping> shippingList = (List<Shipping>) shippingRepository.findAll();

        for (Shipping shipping: shippingList) {
            if (shipping.getId() == shippingId){
                shipping.setDefaultShipping(true);
                shippingRepository.save(shipping);
            }
            else {
                shipping.setDefaultShipping(false);
                shippingRepository.save(shipping);
            }
        }
    }


}
