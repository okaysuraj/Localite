import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import 'fast-text-encoding';
import { Client } from '@stomp/stompjs';

export default function ChatScreen({ route, navigation }) {
  const { eventId, eventTitle } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const flatListRef = useRef(null);
  const stompClientRef = useRef(null);

  useEffect(() => {
    loadUserAndMessages();
  const loadUserAndMessages = async () => {
    const user = await AsyncStorage.getItem('username');
    setCurrentUser(user);
    
    // Fetch initial messages
    fetchMessages();
    
    // Setup WebSocket
    const token = await AsyncStorage.getItem('userToken');
    const wsUrl = API_URL.replace(/^http/, 'ws').replace('/api', '/ws');
    
    const client = new Client({
      brokerURL: wsUrl,
      connectHeaders: {
         // Some backends check token in header for STOMP, but here we can just pass it if needed
      },
      onConnect: () => {
        client.subscribe(`/topic/events/${eventId}`, (message) => {
          if (message.body) {
            const newMsg = JSON.parse(message.body);
            setMessages((prev) => {
               if (prev.find(m => m.id === newMsg.id)) return prev;
               return [...prev, newMsg];
            });
          }
        });
      }
    });
    
    client.activate();
    stompClientRef.current = client;
  };
  
  useEffect(() => {
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/events/${eventId}/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (stompClientRef.current && stompClientRef.current.connected) {
         stompClientRef.current.publish({
            destination: `/app/events/${eventId}/sendMessage`,
            headers: { 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ content: newMessage })
         });
         setNewMessage('');
      } else {
        const response = await fetch(`${API_URL}/events/${eventId}/messages`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: newMessage })
        });
        
        if (response.ok) {
          setNewMessage('');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderMessage = ({ item }) => {
    const isMe = item.sender === currentUser;
    
    return (
      <View style={[styles.messageWrapper, isMe ? styles.messageWrapperMe : styles.messageWrapperOther]}>
        {!isMe && <Text style={styles.senderName}>{item.sender}</Text>}
        <View style={[styles.messageBubble, isMe ? styles.messageBubbleMe : styles.messageBubbleOther]}>
          <Text style={[styles.messageText, isMe ? styles.messageTextMe : styles.messageTextOther]}>
            {item.content}
          </Text>
        </View>
        <Text style={styles.timeText}>
          {new Date(item.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#f8fafc" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle} numberOfLines={1}>{eventTitle}</Text>
            <Text style={styles.headerSub}>Locker Room (Comms)</Text>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({animated: true})}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Secure channel empty. Start the transmission.</Text>
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Transmit message..."
            placeholderTextColor="#64748b"
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendBtn, !newMessage.trim() && styles.sendBtnDisabled]} 
            onPress={handleSend}
            disabled={!newMessage.trim()}
          >
            <Ionicons name="send" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15,23,42,0.9)' },
  backBtn: { padding: 5, marginRight: 15 },
  headerTitleContainer: { flex: 1 },
  headerTitle: { color: '#ccff00', fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  headerSub: { color: '#94a3b8', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },
  messageList: { padding: 15, paddingBottom: 20 },
  messageWrapper: { marginBottom: 15, maxWidth: '85%' },
  messageWrapperMe: { alignSelf: 'flex-end' },
  messageWrapperOther: { alignSelf: 'flex-start' },
  senderName: { color: '#94a3b8', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4, marginLeft: 4 },
  messageBubble: { padding: 12, borderRadius: 16 },
  messageBubbleMe: { backgroundColor: '#ccff00', borderTopRightRadius: 4 },
  messageBubbleOther: { backgroundColor: 'rgba(30,41,59,0.8)', borderTopLeftRadius: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  messageText: { fontSize: 15 },
  messageTextMe: { color: 'white' },
  messageTextOther: { color: '#f8fafc' },
  timeText: { color: 'rgba(148,163,184,0.5)', fontSize: 9, marginTop: 4, alignSelf: 'flex-end', marginRight: 4 },
  emptyText: { color: '#64748b', textAlign: 'center', marginTop: 50, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  inputContainer: { flexDirection: 'row', padding: 15, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15,23,42,0.9)', alignItems: 'center' },
  input: { flex: 1, backgroundColor: 'rgba(30,41,59,0.8)', color: 'white', borderRadius: 20, paddingHorizontal: 15, paddingTop: 12, paddingBottom: 12, maxHeight: 100, minHeight: 45, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  sendBtn: { backgroundColor: '#ccff00', width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  sendBtnDisabled: { backgroundColor: 'rgba(204,255,0,0.3)' }
});
