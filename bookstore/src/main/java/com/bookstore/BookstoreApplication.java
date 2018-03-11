package com.bookstore;

import com.bookstore.config.SecurityUtility;
import com.bookstore.entity.User;
import com.bookstore.entity.security.Role;
import com.bookstore.entity.security.UserRole;
import com.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class BookstoreApplication  implements CommandLineRunner{

	@Autowired
	UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(BookstoreApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		User user1 = new User();
		user1.setFirstName("Test");
		user1.setLastName("Test");
		user1.setUsername("test");
		user1.setPassword(SecurityUtility.passwordEncoder().encode("t"));
		user1.setEmail("ewerdfsd@gmail.com");
		Set<UserRole> userRoles = new HashSet<>();
		Role role1 = new Role();
		role1.setRoleId(1);
		role1.setName("ROLE_USER");
		userRoles.add(new UserRole(user1, role1));

		userService.createUser(user1, userRoles);

		userRoles.clear();

		User user2 = new User();
		user2.setFirstName("Admin");
		user2.setLastName("Admin");
		user2.setUsername("admin");
		user2.setPassword(SecurityUtility.passwordEncoder().encode("a"));
		user2.setEmail("efgfdfgbgggbggcx@gmail.com");
		Role role2 = new Role();
		role2.setRoleId(0);
		role2.setName("ROLE_ADMIN");
		userRoles.add(new UserRole(user2, role2));

		userService.createUser(user2, userRoles);
	}
}
