package com.bookstore.service.impl;

import com.bookstore.entity.Book;
import com.bookstore.repository.BookRepository;
import com.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book findOne(int id) {
        return bookRepository.findOne(id);
    }

    @Override
    public List<Book> findAll() {
         List<Book> bookList = (List<Book>) bookRepository.findAll();

         List<Book> activeBookList = new ArrayList<>();

         for (Book book: bookList){
             if (book.isActive()){
                 activeBookList.add(book);
             }
         }
         return activeBookList;
    }

    @Override
    public List<Book> searchByTitle(String title) {
        List<Book> bookList = bookRepository.findByTitleContaining(title);

        List<Book> activeBookList = new ArrayList<>();
        for (Book book: bookList){
            if (book.isActive()){
                activeBookList.add(book);
            }
        }
        return activeBookList;
    }

    @Override
    public void removeOne(int id) {
        bookRepository.delete(id);
    }
}
