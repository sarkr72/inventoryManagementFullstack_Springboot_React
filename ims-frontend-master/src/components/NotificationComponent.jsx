import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const NotificationComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new SockJS(import.meta.env.VITE_API_URL_LB);
    
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe("/topic/notifications", (message) => {
          try {
            const body = JSON.parse(message.body);
            toast.success(body.content);
            console.log(body, "notification");
            setMessages((prev) => [...prev, body.content]);
          } catch (error) {
            console.error("Error parsing message body:", error);
            toast.error("Error processing notification");
          }
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
        toast.error("STOMP protocol error occurred");
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
        toast.error("WebSocket connection error occurred");
      },
      onError: (error) => {
        console.error("Error:", error);
        toast.error("An error occurred while connecting to the WebSocket");
      }
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <div>
      {/* <h3>Notifications</h3> */}
      <ToastContainer />
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
