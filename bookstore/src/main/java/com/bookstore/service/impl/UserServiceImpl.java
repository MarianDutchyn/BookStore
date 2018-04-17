package com.bookstore.service.impl;

import com.bookstore.entity.UserShipping;
import com.bookstore.entity.ShoppingCart;
import com.bookstore.entity.User;
import com.bookstore.entity.security.UserRole;
import com.bookstore.repository.RoleRepository;
import com.bookstore.repository.UserShippingRepository;
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
    private UserShippingRepository userShippingRepository;

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
    public void updateShipping(UserShipping userShipping, User user) {
        userShipping.setUser(user);
        userShipping.setDefaultShipping(true);
        user.getUserShippingList().add(userShipping);
        userRepository.save(user);
    }

    @Override
    public void setDefaultShipping(int shippingId, User user) {
        List<UserShipping> userShippingList = (List<UserShipping>) userShippingRepository.findAll();

        for (UserShipping userShipping : userShippingList) {
            if (userShipping.getId() == shippingId){
                userShipping.setDefaultShipping(true);
                userShippingRepository.save(userShipping);
            }
            else {
                userShipping.setDefaultShipping(false);
                userShippingRepository.save(userShipping);
            }
        }
    }


}
