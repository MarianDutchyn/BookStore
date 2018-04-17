package com.bookstore.service;

import com.bookstore.entity.UserShipping;
import com.bookstore.entity.User;
import com.bookstore.entity.security.UserRole;

import java.util.Set;

public interface UserService {

    User createUser(User user, Set<UserRole> userRoles);
    User findByUsername(String username);
    User findByEmail(String email);
    User findById(int id);
    User save(User user);
    void updateShipping(UserShipping userShipping, User user);
    void setDefaultShipping(int shippingId, User user);

}
