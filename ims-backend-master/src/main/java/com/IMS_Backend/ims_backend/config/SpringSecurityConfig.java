package com.IMS_Backend.ims_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import com.IMS_Backend.ims_backend.security.JwtAuthFilter;
import com.IMS_Backend.ims_backend.security.JwtAuthenticationEntryPoint;
//import com.amazonaws.regions.Region;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
@EnableMethodSecurity
public class SpringSecurityConfig {

	private final JwtAuthFilter jwtAuthFilter;
	private final UserDetailsService userDetailsService;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	public SpringSecurityConfig(JwtAuthFilter jwtAuthFilter, UserDetailsService userDetailsService,
			JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint) {
		this.jwtAuthFilter = jwtAuthFilter;
		this.userDetailsService = userDetailsService;
		this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
	}

	@Bean
	public static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

//	@Bean
//	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http.csrf(csrf -> csrf.disable()).authorizeHttpRequests(authorize -> {
//			authorize.requestMatchers(HttpMethod.GET, "/api/**").permitAll();
//			authorize.requestMatchers("/api/auth/**").permitAll();
//			authorize.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
//			authorize.requestMatchers("/api/auth/register", "/api/auth/login").permitAll();
//			authorize.anyRequest().authenticated();
//		}).httpBasic(Customizer.withDefaults()).sessionManagement(session -> session.sessionFixation().migrateSession()
//				.maximumSessions(1).expiredUrl("/api/auth/session-expired"));
//
//		return http.build();
//	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).authorizeHttpRequests(auth -> {
			auth.requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll();
			auth.requestMatchers("/api/auth/register", "/api/auth/login").permitAll();
			auth.requestMatchers("/actuator/health").permitAll();
			auth.requestMatchers(HttpMethod.GET, "/api/**").permitAll();
			auth.requestMatchers(HttpMethod.GET, "/api/files/**").permitAll();
			auth.requestMatchers(HttpMethod.POST, "/api/files/**").permitAll();
			auth.requestMatchers("/ws/**").permitAll();
			auth.requestMatchers("/api/auth/**").permitAll();
			auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
			auth.anyRequest().authenticated();
		}).sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		http.exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint));

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}

	@Bean
	public HttpSessionEventPublisher httpSessionEventPublisher() {
		return new HttpSessionEventPublisher();
	}

//	@Configuration
//	public class S3Config {
//
//		@Bean
//		public AmazonS3 amazonS3() {
//			return AmazonS3ClientBuilder.standard().withRegion("US_EAST_2").build();
//		}
//	}
	
	@Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .region(Region.US_EAST_2)
                .build();
    }

}
