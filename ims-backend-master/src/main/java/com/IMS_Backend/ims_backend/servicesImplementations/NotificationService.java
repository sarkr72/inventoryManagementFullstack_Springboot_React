package com.IMS_Backend.ims_backend.servicesImplementations;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.dto.NotificationMessage;

@Service
public class NotificationService {

    private SimpMessagingTemplate messagingTemplate;

    public NotificationService(SimpMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}



	public void sendNotification(String msg) {
		System.out.println("insidenotification");
		if(msg.length() > 4) {
			NotificationMessage notification = new NotificationMessage(msg);
	        messagingTemplate.convertAndSend("/topic/notifications", notification);
		}
        
    }
}
