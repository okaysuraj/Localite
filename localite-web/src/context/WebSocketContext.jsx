import { createContext, useContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { WS_URL } from '../config';

const WebSocketContext = createContext(null);
export const useWebSocket = () => useContext(WebSocketContext);

// Keep one connection per app and expose its live status to chat screens.
export function WebSocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [stompClient] = useState(
    () =>
      new Client({
        webSocketFactory: () => new SockJS(WS_URL),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => setIsConnected(true),
        onDisconnect: () => setIsConnected(false),
        onWebSocketClose: () => setIsConnected(false),
        onStompError: () => setIsConnected(false),
      })
  );

  useEffect(() => {
    stompClient.activate();
    return () => {
      void stompClient.deactivate();
    };
  }, [stompClient]);

  return (
    <WebSocketContext.Provider value={{ stompClient, isConnected }}>{children}</WebSocketContext.Provider>
  );
}
