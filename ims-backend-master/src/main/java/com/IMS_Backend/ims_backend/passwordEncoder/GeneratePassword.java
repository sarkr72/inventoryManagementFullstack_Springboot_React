package com.IMS_Backend.ims_backend.passwordEncoder;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class GeneratePassword {

	public static void main(String[] args) {
		 PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	        System.out.println(passwordEncoder.encode("rinku"));
	        System.out.println(passwordEncoder.encode("enoch"));
	        System.out.println(passwordEncoder.encode("daniel"));
	}

}

