package com.bookstore.repository;

import com.bookstore.entity.Book;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Integer> {
    List<Book> findByTitleContaining(String title);
}
