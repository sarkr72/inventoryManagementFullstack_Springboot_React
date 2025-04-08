package com.IMS_Backend.ims_backend.security;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.model.Employee;
import com.IMS_Backend.ims_backend.model.Role;
import com.IMS_Backend.ims_backend.repository.EmployeeRepository;

@Service
public class CustomerUserDetailsService implements UserDetailsService {


	private EmployeeRepository userRepository;
	
	@Autowired
	public CustomerUserDetailsService(EmployeeRepository userRepository) {
		this.userRepository = userRepository;
	}



	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		Employee user = userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("user does not exist by email: " + email));

		Set<GrantedAuthority> authorities = user.getRoles().stream()
				.map((role) -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());

		return new org.springframework.security.core.userdetails.User(email, user.getPassword(), authorities);

	}
}