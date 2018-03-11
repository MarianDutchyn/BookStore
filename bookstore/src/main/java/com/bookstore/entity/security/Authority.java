package com.bookstore.entity.security;

import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;

public class Authority implements GrantedAuthority, Serializable {
    private static final long serialVervionUID = 123123L;

    private String authority;

    public Authority(String authority) {
        this.authority = authority;
    }

    public static long getSerialVervionUID() {
        return serialVervionUID;
    }

    @Override
    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
