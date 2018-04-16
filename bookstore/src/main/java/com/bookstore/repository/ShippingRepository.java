package com.bookstore.repository;

import com.bookstore.entity.Shipping;
import org.springframework.data.repository.CrudRepository;

public interface ShippingRepository extends CrudRepository<Shipping, Integer> {
}
