# Inventory Management System – Full Stack Project

## 🧾 Overview

This is a full-stack Inventory Management System built using **Spring Boot** (backend) and **React** (frontend). The application supports role-based access control and real-time updates, and integrates several AWS services to create a scalable, event-driven architecture.

## 🎯 Features

- **Role Management**
  - **Admin**: Creates companies and registers managers.
  - **Manager**: Manages employees under their company.
  - **Employee**: Assigned roles under the manager’s supervision.

- **Tech Stack**
  - **Frontend**: React, Vite, WebSocket (SockJS + STOMP)
  - **Backend**: Spring Boot, Spring Security, JWT, JPA
  - **Database**: Amazon Aurora (MySQL-compatible) with separate **read/write endpoints**
  - **Authentication**: Secure JWT token-based authentication system

## ☁️ AWS Integration

This project utilizes several AWS services:

- **Amazon RDS (Aurora MySQL)**  
  - Configured with **separate datasources** for read and write operations.

- **Amazon S3**  
  - Used to **upload and store images** (e.g., company logo and profile pictures).

- **AWS Lambda**  
  - Triggered on S3 upload events to process and relay messages.

- **Amazon SQS (Simple Queue Service)**  
  - Receives messages from Lambda and queues them for processing.

- **Amazon SNS (Simple Notification Service)**  
  - Sends out notifications (e.g., email alerts) when inventory items are uploaded.

- **WebSocket + STOMP**  
  - Real-time inventory updates pushed to frontend from backend.

## 🔐 Security

- JWT authentication with Spring Security.
- Role-based authorization with access control for Admin, Manager, and Employee.
- CORS and CSRF configuration (where applicable for production).

