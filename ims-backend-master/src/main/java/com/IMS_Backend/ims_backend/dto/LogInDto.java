package com.IMS_Backend.ims_backend.dto;

public class LogInDto {
    private String email;
    private String password;

    public LogInDto() {
    }

 
    public LogInDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

   
    public String getemail() {
        return email;
    }

    public void setemail(String email) {
        this.email = email;
    }

 
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}