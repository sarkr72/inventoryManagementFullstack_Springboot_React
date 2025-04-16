package com.IMS_Backend.ims_backend.servicesImplementations;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.dto.JwtAuthResponse;
import com.IMS_Backend.ims_backend.dto.LogInDto;
import com.IMS_Backend.ims_backend.dto.RegisterDto;
import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.Employee;
import com.IMS_Backend.ims_backend.model.Role;
import com.IMS_Backend.ims_backend.repository.EmployeeRepository;
import com.IMS_Backend.ims_backend.repository.RoleRepository;
import com.IMS_Backend.ims_backend.security.JwtUtil;
import com.IMS_Backend.ims_backend.services.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

	private EmployeeRepository userRepository;
	private RoleRepository roleRepository;
	private PasswordEncoder passwordEncoder;
	private AuthenticationManager authenticationManager;
	private JwtUtil jwtUtil;
	
	public AuthServiceImpl(EmployeeRepository userRepository, RoleRepository roleRepository,
			PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtUtil = jwtUtil;
	}

	@Override
	public RegisterDto register(RegisterDto registerDto) {
		System.out.println("registerserice");
		if (userRepository.existsByEmail(registerDto.getEmail())) {
			throw new NotFoundException("Email is already exists!.");
		}

		Set<Role> roles = new HashSet<>();
		Role userRole = roleRepository.findByName(registerDto.getRole());
		if (userRole == null) {
			throw new NotFoundException("Role doesn't exist");
		}
		
		Employee user = new Employee();
		user.setFirstName(registerDto.getFirstName());
		user.setLastName(registerDto.getLastName());
		user.setEmail(registerDto.getEmail());
		user.setPhone(registerDto.getPhone());
		user.setCompany(registerDto.getCompany());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
		if(registerDto.getProfileUrl().length() > 5) {
			user.setProfileUrl(registerDto.getProfileUrl());
		}
		System.out.println("registerserice2");
		roles.add(userRole);

		user.setRoles(roles);
		Employee emp = userRepository.save(user);
		registerDto.setId(emp.getId());
		return registerDto;
	}

	@Override
	public JwtAuthResponse login(LogInDto loginDto) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getemail(), loginDto.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String username = authentication.getName();
		String accessToken = jwtUtil.generateAccessToken(username);
		
		Optional<Employee> employeeOptional = userRepository.findByEmail(loginDto.getemail());
		String role = null;
		if(employeeOptional.isPresent()) {
			Employee emp = employeeOptional.get();
			Optional<Role> roleOptional = emp.getRoles().stream().findFirst();
			if(roleOptional.isPresent()) {
				Role userRole = roleOptional.get();
				role = userRole.getName();
			}
		}
		String refreshTk = jwtUtil.generateRefreshToken(username);
		JwtAuthResponse jwtR = new JwtAuthResponse();
		jwtR.setAccessToken(accessToken);
		jwtR.setRefreshToken(refreshTk);
		jwtR.setRole(role);
	
		return jwtR;
	}
}