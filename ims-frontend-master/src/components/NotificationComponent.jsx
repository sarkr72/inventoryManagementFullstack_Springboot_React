import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { ToastContainer, toast } from "react-toastify";

const NotificationComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe("/topic/notifications", (message) => {
          const body = JSON.parse(message.body);
          toast.success(body.content);
          setMessages((prev) => [...prev, body.content]);
        });
      },
    });

    stompClient.activate();
    return () => stompClient.deactivate();
  }, []);

  return (
    <div>
      <ToastContainer />
      {/* <h2>S3 Upload Notifications:</h2> */}
      {/* <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default NotificationComponent;
