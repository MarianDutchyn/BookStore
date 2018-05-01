package com.bookstore.repository;

import com.bookstore.entity.ShippingAddress;
import org.springframework.data.repository.CrudRepository;

public interface ShippingAddressRepository extends CrudRepository<ShippingAddress, Integer> {
}
