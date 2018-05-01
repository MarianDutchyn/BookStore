package com.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Entity
public class CartItem implements Serializable {
    private static final long serialVersionUID = 431554L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int quantity;
    private BigDecimal subTotal;

    @OneToOne
    private Book book;

    @OneToMany(mappedBy = "cartItem")
    @JsonIgnore
    private List<BookToCartItem> bookToCartItems;

    @ManyToOne
    @JsonIgnore
    private ShoppingCart shoppingCart;

    @ManyToOne
    @JsonIgnore
    private Order order;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(BigDecimal subTotal) {
        this.subTotal = subTotal;
    }

    public ShoppingCart getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public List<BookToCartItem> getBookToCartItems() {
        return bookToCartItems;
    }

    public void setBookToCartItems(List<BookToCartItem> bookToCartItems) {
        this.bookToCartItems = bookToCartItems;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}


