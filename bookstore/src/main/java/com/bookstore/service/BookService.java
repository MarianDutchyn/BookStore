package com.bookstore.service;

import com.bookstore.entity.Book;

import java.util.List;

public interface BookService {

    Book save(Book book);
    Book findOne(int id);
    List<Book> findAll();
    List<Book> searchByTitle(String title);
    void removeOne(int id);

}
