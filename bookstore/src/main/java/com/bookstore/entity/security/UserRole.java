package com.bookstore.entity.security;

import com.bookstore.entity.User;

import javax.persistence.*;
import java.io.Serializable;
@Entity
public class UserRole implements Serializable {
    private static final long serialVersionUID = 258852L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userRoleId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.EAGER)
    private  Role role;

    public UserRole() {
    }

    public UserRole(User user, Role role) {
        this.user = user;
        this.role = role;
    }

    public int getUserRoleId() {
        return userRoleId;
    }

    public void setUserRoleId(int userRoleId) {
        this.userRoleId = userRoleId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
