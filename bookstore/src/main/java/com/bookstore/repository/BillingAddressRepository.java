package com.bookstore.repository;

import com.bookstore.entity.BillingAddress;
import org.springframework.data.repository.CrudRepository;

public interface BillingAddressRepository extends CrudRepository<BillingAddress, Integer> {
}
