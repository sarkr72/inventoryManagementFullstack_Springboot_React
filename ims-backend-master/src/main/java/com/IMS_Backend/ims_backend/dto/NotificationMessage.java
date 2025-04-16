package com.IMS_Backend.ims_backend.dto;

public class NotificationMessage {
    private String content;

    public NotificationMessage() {}
    
    public NotificationMessage(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
