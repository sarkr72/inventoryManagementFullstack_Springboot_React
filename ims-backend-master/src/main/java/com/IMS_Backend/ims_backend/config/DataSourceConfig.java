package com.IMS_Backend.ims_backend.config;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.zaxxer.hikari.HikariDataSource;

import jakarta.persistence.EntityManagerFactory;

@Configuration
@EnableTransactionManagement
public class DataSourceConfig {

    @Value("${datasource.write.url}")
    private String writeUrl;

    @Value("${datasource.read.url}")
    private String readUrl;

    @Value("${datasource.username}")
    private String username;

    @Value("${datasource.password}")
    private String password;

    @Bean
    public DataSource dataSource() {
        DynamicRoutingDataSource dynamicDataSource = new DynamicRoutingDataSource();

        DataSource writeDataSource = createDataSource(writeUrl);
        DataSource readDataSource = createDataSource(readUrl);

        Map<Object, Object> targetDataSources = new HashMap<>();
        targetDataSources.put("write", writeDataSource);
        targetDataSources.put("read", readDataSource);

        dynamicDataSource.setDefaultTargetDataSource(writeDataSource);
        dynamicDataSource.setTargetDataSources(targetDataSources);

        return dynamicDataSource;
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
        factoryBean.setDataSource(dataSource);
        factoryBean.setPackagesToScan("com.IMS_Backend.ims_backend.model");
        factoryBean.setJpaProperties(hibernateProperties());
        factoryBean.setPersistenceProvider(new org.hibernate.jpa.HibernatePersistenceProvider());
        return factoryBean;
    }

    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }

    private DataSource createDataSource(String url) {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        return dataSource;
    }

    private java.util.Properties hibernateProperties() {
        java.util.Properties properties = new java.util.Properties();
        properties.put("hibernate.hbm2ddl.auto", "update");
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
        properties.put("hibernate.show_sql", "true");
        return properties;
    }
}
