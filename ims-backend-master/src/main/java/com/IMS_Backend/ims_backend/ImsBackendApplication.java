package com.IMS_Backend.ims_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.IMS_Backend.ims_backend.repository")
@EntityScan(basePackages = "com.IMS_Backend.ims_backend.model")
public class ImsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImsBackendApplication.class, args);
	}

}
