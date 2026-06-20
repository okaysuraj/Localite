import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function DirectMessageScreen({ route, navigation }) {
  const { recipient } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const flatListRef = useRef();

  useEffect(() => {
    fetchCurrentUser();
    const interval = setInterval(fetchMessages, 3000);
    fetchMessages();
    return () => clearInterval(interval);
  }, []);

  const fetchCurrentUser = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const res = await fetch(`${API_URL}/users/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      setCurrentUser(await res.json());
    }
  };

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await fetch(`${API_URL}/messages/direct/${recipient.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMessages(await res.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await fetch(`${API_URL}/messages/direct/${recipient.id}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newMessage })
      });
      if (res.ok) {
        setNewMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderMessage = ({ item }) => {
    const isMe = currentUser && item.sender.id === currentUser.id;
    return (
      <View style={[styles.messageBubble, isMe ? styles.myBubble : styles.theirBubble]}>
        <Text style={[styles.messageText, isMe ? styles.myText : styles.theirText]}>
          {item.content}
        </Text>
        <Text style={[styles.timeText, isMe ? styles.myTime : styles.theirTime]}>
          {new Date(item.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#f8fafc" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{recipient.username}</Text>
        <View style={{width: 30}} />
      </View>

      <KeyboardAvoidingView 
        style={styles.chatContainer} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Send a secure message to {recipient.username}</Text>
          }
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Encrypting..."
            placeholderTextColor="#64748b"
          />
          <TouchableOpacity 
            style={[styles.sendBtn, !newMessage.trim() && { opacity: 0.5 }]} 
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: 1 },
  chatContainer: { flex: 1 },
  messageList: { padding: 20, paddingBottom: 10 },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 15, marginBottom: 10 },
  myBubble: { alignSelf: 'flex-end', backgroundColor: '#ccff00', borderBottomRightRadius: 5 },
  theirBubble: { alignSelf: 'flex-start', backgroundColor: '#1e293b', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderBottomLeftRadius: 5 },
  messageText: { fontSize: 16 },
  myText: { color: 'white' },
  theirText: { color: '#f8fafc' },
  timeText: { fontSize: 10, marginTop: 5, textTransform: 'uppercase' },
  myTime: { color: 'rgba(255,255,255,0.7)', textAlign: 'right' },
  theirTime: { color: '#64748b' },
  inputContainer: { flexDirection: 'row', padding: 15, backgroundColor: '#1e293b', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  input: { flex: 1, backgroundColor: '#0f172a', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, color: 'white', marginRight: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  sendBtn: { backgroundColor: '#ccff00', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#64748b', textAlign: 'center', marginTop: 50, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }
});
