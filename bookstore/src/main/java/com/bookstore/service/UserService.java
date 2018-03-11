package com.bookstore.service;

import com.bookstore.entity.User;
import com.bookstore.entity.security.UserRole;

import java.util.Set;

public interface UserService {

    User createUser(User user, Set<UserRole> userRoles);
}
