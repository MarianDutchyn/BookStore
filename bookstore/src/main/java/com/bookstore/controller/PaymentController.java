package com.bookstore.controller;

import com.bookstore.entity.User;
import com.bookstore.entity.UserBilling;
import com.bookstore.entity.UserPayment;
import com.bookstore.service.UserPaymentService;
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
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private UserPaymentService userPaymentService;
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity addNewUserPayment(@RequestBody UserPayment userPayment, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        UserBilling userBilling = userPayment.getUserBilling();
        userService.updateUserPayment(userPayment, userBilling, user);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping("/getUserPaymentList")
    public List<UserPayment> getUserPaymentList(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        List<UserPayment> userPaymentList = user.getUserPaymentList();
        return userPaymentList;
    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public ResponseEntity removeUserPayment(@RequestBody String id, Principal principal) {
    userPaymentService.remove(Integer.parseInt(id));
    return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/setDefault", method = RequestMethod.POST)
    public ResponseEntity setDefaultPayment(@RequestBody String userPaymentId, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        userService.setDefaultUserPayment(Integer.parseInt(userPaymentId), user);
        return new ResponseEntity(HttpStatus.OK);
    }
}
