package com.bookstore.controller;

import com.bookstore.config.SecurityConfig;
import com.bookstore.config.SecurityUtility;
import com.bookstore.entity.User;
import com.bookstore.entity.security.Role;
import com.bookstore.entity.security.UserRole;
import com.bookstore.service.UserService;
import com.bookstore.utility.MailConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.jws.soap.SOAPBinding;
import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MailConstructor mailConstructor;

    @Autowired
    private JavaMailSender mailSender;

    @RequestMapping(value = "/newUser", method = RequestMethod.POST)
    public ResponseEntity newUser(HttpServletRequest request, @RequestBody HashMap<String,String> mapper) {
        String username = mapper.get("username");
        String userEmail = mapper.get("email");

        if (userService.findByUsername(username) != null){
            return new ResponseEntity("usernameExists", HttpStatus.BAD_REQUEST);
        }
        if (userService.findByEmail(userEmail) != null){
            return new ResponseEntity("emailExists", HttpStatus.BAD_REQUEST);
        }

        User user  = new User();
        user.setUsername(username);
        user.setEmail(userEmail);
        String password = SecurityUtility.randomPassword();
        String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);
        user.setPassword(encryptedPassword);

        Role role = new Role();
        role.setRoleId(1);
        role.setName("ROLE_USER");
        Set<UserRole> userRoles = new HashSet<>();
        userRoles.add(new UserRole(user, role));
        userService.createUser(user, userRoles);

        SimpleMailMessage email = mailConstructor.constructNewUserEmail(user, password);
        mailSender.send(email);

        return new ResponseEntity("User added Successfully!", HttpStatus.OK);
    }

    @RequestMapping(value = "/forgetPassword", method = RequestMethod.POST)
    public ResponseEntity forgetPassword(HttpServletRequest request, @RequestBody  HashMap<String,String> mapper) {
        User user = userService.findByEmail(mapper.get("email"));

        if (user == null){
            return new ResponseEntity("Email not found", HttpStatus.BAD_REQUEST);
        }

        String password = SecurityUtility.randomPassword();
        String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);
        user.setPassword(encryptedPassword);
        userService.save(user);

        SimpleMailMessage newEmail = mailConstructor.constructNewUserEmail(user, password);
        mailSender.send(newEmail);

        return new ResponseEntity("Email sent!", HttpStatus.OK);
    }

    @RequestMapping("/getCurrentUser")
    public User getUser(Principal principal) {
        String username = principal.getName();
        User user = new User();
        if (username != null) {
            user = userService.findByUsername(username);
        }
        return user;
    }

    @RequestMapping(value = "/updateUserInfo", method = RequestMethod.POST)
    public ResponseEntity updateUser(@RequestBody HashMap<String, Object> mapper) throws Exception {

        int id = (int) mapper.get("id");
        String username = (String) mapper.get("username");
        String email = (String) mapper.get("email");
        String firstName = (String) mapper.get("firstName");
        String lastName = (String) mapper.get("lastName");
        String password = (String) mapper.get("currentPassword");
        String newPassword = (String) mapper.get("newPassword");

        User user = userService.findById(id);

        if (user == null) {
            throw new Exception("User not found");
        }
        if (userService.findByUsername(username) != null){
            if (userService.findByUsername(username).getId() != user.getId()){
                return new ResponseEntity("User not found", HttpStatus.BAD_REQUEST);
            }
        }

        if (userService.findByEmail(email) != null){
            if (userService.findByEmail(email).getId() != user.getId()){
                return new ResponseEntity("Email not found", HttpStatus.BAD_REQUEST);
            }
        }

        SecurityConfig securityConfig =new SecurityConfig();
        BCryptPasswordEncoder passwordEncoder = SecurityUtility.passwordEncoder();
            String dbPassword = user.getPassword();
            if (password != null)
            if (passwordEncoder.matches(password, dbPassword)) {
                if (newPassword != null && !newPassword.isEmpty() && !newPassword.equals("")) {
                    user.setPassword(passwordEncoder.encode(newPassword));
                }
                user.setEmail(email);
            } else {
                return new ResponseEntity("Incorrect current Password", HttpStatus.BAD_REQUEST);
            }

        user.setUsername(username);
        user.setFirstName(firstName);
        user.setLastName(lastName);

        userService.save(user);

        return new ResponseEntity(HttpStatus.OK);
    }
}
