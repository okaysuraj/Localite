import { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WS_URL } from '../config';

const WebSocketContext = createContext(null);
export const useWebSocket = () => useContext(WebSocketContext);

// Keep one connection per app and expose its live status to chat screens.
export function WebSocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [stompClient] = useState(
    () =>
      new Client({
        webSocketFactory: () =>
          Platform.OS === 'web' ? new SockJS(WS_URL) : new WebSocket(WS_URL.replace(/^http/, 'ws')),
        reconnectDelay: 10000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
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
