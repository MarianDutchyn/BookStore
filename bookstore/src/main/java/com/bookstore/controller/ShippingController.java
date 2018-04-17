package com.bookstore.controller;

import com.bookstore.entity.UserShipping;
import com.bookstore.entity.User;
import com.bookstore.service.UserShippingService;
import com.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/shipping")
public class ShippingController {

    @Autowired
    private UserShippingService userShippingService;
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity addNewUserShipping(@RequestBody UserShipping userShipping, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        userService.updateShipping(userShipping, user);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping("/getUserShippingList")
    public List<UserShipping> getShippingList(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        List<UserShipping> userShippingList = user.getUserShippingList();
        return userShippingList;
    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public ResponseEntity removeShipping(@RequestBody String id, Principal principal) {
        userShippingService.remove(Integer.parseInt(id));
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/setDefault", method = RequestMethod.POST)
    public ResponseEntity setDefaultShipping(@RequestBody String id, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        userService.setDefaultShipping(Integer.parseInt(id), user);
        return new ResponseEntity(HttpStatus.OK);
    }
}
