package com.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class BillingAddress implements Serializable {
    public static final long serialVersionUID = 454521256L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String billingAddressName;
    private String billingAddressStreet;
    private String billingAddressCity;

    @OneToOne
    @JsonIgnore
    private Order order;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBillingAddressName() {
        return billingAddressName;
    }

    public void setBillingAddresName(String billingAddressName) {
        this.billingAddressName = billingAddressName;
    }

    public String getBillingAddressStreet() {
        return billingAddressStreet;
    }

    public void setBillingAddressStreet(String billingAddressStreet) {
        this.billingAddressStreet = billingAddressStreet;
    }

    public String getBillingAddressCity() {
        return billingAddressCity;
    }

    public void setBillingAddressCity(String billingAddressCity) {
        this.billingAddressCity = billingAddressCity;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
