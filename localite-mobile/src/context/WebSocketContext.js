import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WS_URL, API_URL } from '../config';

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let client = null;
    try {
      const rawUrl = WS_URL || (API_URL ? API_URL.replace(/\/api\/?$/, '/ws') : null);
      if (!rawUrl) return;
      const wsUrl = rawUrl.replace(/^http/, 'ws');

      client = new Client({
        webSocketFactory: () => {
          if (Platform.OS !== 'web' && typeof WebSocket !== 'undefined') {
            return new WebSocket(wsUrl);
          }
          return new SockJS(rawUrl);
        },
        reconnectDelay: 10000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
        onConnect: () => {
          console.log('Connected to WebSocket');
          setIsConnected(true);
        },
        onStompError: (frame) => {
          console.warn('STOMP broker error:', frame?.headers?.['message']);
        },
        onWebSocketError: () => {
          console.log('WebSocket connection error (backend offline)');
        },
        onDisconnect: () => {
          console.log('Disconnected from WebSocket');
          setIsConnected(false);
        }
      });

      client.activate();
      setStompClient(client);
    } catch (err) {
      console.warn('Failed to start WebSocket client:', err);
    }

    return () => {
      try {
        if (client) client.deactivate();
      } catch (err) {
        // ignore
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ stompClient, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};
