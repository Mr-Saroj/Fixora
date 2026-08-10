import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useWebSocket = (technicianId, onNotification) => {

  const clientRef = useRef(null);

  useEffect(() => {
    if (!technicianId) return;

    // connect to WebSocket
    const client = new Client({
      webSocketFactory: () =>
        new SockJS('http://localhost:8080/ws'),  // ← your backend URL

      onConnect: () => {
        console.log('WebSocket connected ✅');

        // subscribe to this technician's notification channel
        client.subscribe(
          `/topic/notifications/${technicianId}`,
          (message) => {
            const notification = JSON.parse(message.body);
            console.log('New notification received:', notification);
            onNotification(notification);  // ← callback to update UI
          }
        );
      },

      onDisconnect: () => {
        console.log('WebSocket disconnected');
      },

      onStompError: (error) => {
        console.error('WebSocket error:', error);
      },

      reconnectDelay: 5000,  // reconnect after 5 sec if disconnected
    });

    client.activate();
    clientRef.current = client;

    // cleanup on unmount
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };

  }, [technicianId]);
};

export default useWebSocket;