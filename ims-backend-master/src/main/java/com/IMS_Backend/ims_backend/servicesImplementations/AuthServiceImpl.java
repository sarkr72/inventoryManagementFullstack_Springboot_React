package com.IMS_Backend.ims_backend.servicesImplementations;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.dto.LogInDto;
import com.IMS_Backend.ims_backend.dto.RegisterDto;
import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.Employee;
import com.IMS_Backend.ims_backend.model.Role;
import com.IMS_Backend.ims_backend.repository.EmployeeRepository;
import com.IMS_Backend.ims_backend.repository.RoleRepository;
import com.IMS_Backend.ims_backend.services.AuthService;


@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
    private EmployeeRepository userRepository;
	
	@Autowired
    private RoleRepository roleRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
    private AuthenticationManager authenticationManager;


    @Override
    public String register(RegisterDto registerDto) {

        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new NotFoundException( "Email is already exists!.");
        }

        Employee user = new Employee();
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setEmail(registerDto.getEmail());
        user.setPhone(registerDto.getPhone());
        user.setCompany(registerDto.getCompany());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(registerDto.getRole());
        roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);

        return "User Registered Successfully!.";
    }

	@Override
	public String login(LogInDto loginDto) {
		
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginDto.getemail(),
				loginDto.getPassword()
				));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		return "User logged-in successfully";
	}
}