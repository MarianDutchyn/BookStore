package com.bookstore.repository;

import com.bookstore.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);
    User findByEmail(String email);
}
