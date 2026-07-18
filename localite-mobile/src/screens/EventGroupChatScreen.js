import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, Platform, KeyboardAvoidingView, Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getEventMessages, sendEventMessage, getEventById } from '../services/api';
import { useWebSocket } from '../context/WebSocketContext';
import { useAuth } from '../context/AuthContext';

export default function EventGroupChatScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { eventId } = route.params || {};

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [eventData, setEventData] = useState(route.params?.event || { title: 'Loading...', membersOnline: 0 });
  const { stompClient, isConnected } = useWebSocket();
  const { currentUser } = useAuth();
  const scrollViewRef = useRef();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (eventId) {
          const ev = await getEventById(eventId);
          setEventData({ title: ev.title, membersOnline: ev.attendees });
          const msgs = await getEventMessages(eventId);
          setMessages(msgs);
        }
      } catch (err) {
        console.error('Error fetching chat data:', err);
      }
    };
    fetchInitialData();
  }, [eventId]);

  useEffect(() => {
    let subscription = null;
    if (isConnected && stompClient && eventId) {
      subscription = stompClient.subscribe(`/topic/events/${eventId}`, (msgFrame) => {
        const newMsg = JSON.parse(msgFrame.body);
        setMessages((prev) => {
          if (prev.find(m => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
      });
    }
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [isConnected, stompClient, eventId]);

  const handleSendMessage = async () => {
    if (!message.trim() || !eventId) return;
    const content = message;
    setMessage('');
    Keyboard.dismiss();
    try {
      const sentMsg = await sendEventMessage(eventId, content);
      setMessages((prev) => {
        if (prev.find(m => m.id === sentMsg.id)) return prev;
        return [...prev, sentMsg];
      });
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.appBarSafe}>
        <View style={styles.appBar}>
          <View style={styles.appBarLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
              <Ionicons name="arrow-back" size={24} color="#000000" />
            </TouchableOpacity>
            
            <View style={styles.avatarGroup}>
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6YM4gYgEQOeArG7LRZUu9H8YqE8q6AHLTvek7WwHUySITQ7buzF6qOUizIB_QDiJW77F_RA6hLHA-vF1YvMWCbOm-wq3zJKdLzzrYJiH_L7BvkVWE2iAPhdXTaJtEtL8lwRouWeFIEVSyvX9S-9AR5X9IhRAhybqFA_uNfenUqghwkrpexnMbAX1PtZpjTQoSkkZtw3TVjrZHJ862L4aaz_EPOXuEHLykwkIK7BCNDkT9OZft0Spovw' }} style={[styles.groupAvatar, { zIndex: 3 }]} />
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-wUWWPiUJFbdWTbfAKzwJsZJeo0ZfNIgSV6cKtLweWcEFqegsmE6B4Gubqho_xAPSc-CBYnGgYYMbt3Jnumg5Gwz47XxMXn53WyOvrrWoPCjU6y5jlahMm7YsxQffdl6JW8U2PSfc1GZ_V4yWriZzjj2yUPctpLZyt7rNM7U-S8ME3yMo1C84mEeqgvkTAY1ovKsQ92xuConSR4153ng5e5ZfyjJV2Vq6jEu1oU0PyNGUDqlqau0hNQ' }} style={[styles.groupAvatar, { zIndex: 2, marginLeft: -12 }]} />
              <View style={[styles.groupAvatarMore, { zIndex: 1, marginLeft: -12 }]}>
                <Text style={styles.groupAvatarMoreText}>+22</Text>
              </View>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.titleText} numberOfLines={1}>{eventData.title}</Text>
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, { backgroundColor: isConnected ? '#22c55e' : '#ef4444' }]} />
                <Text style={styles.statusText}>{isConnected ? 'LIVE' : 'DISCONNECTED'} • {eventData.membersOnline} MEMBERS</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.appBarRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="search" size={24} color="#75777e" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="ellipsis-vertical" size={24} color="#75777e" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, idx) => {
            const isMe = msg.sender === currentUser?.username || msg.sender === currentUser?.email;
            
            if (isMe) {
              return (
                <View key={idx} style={styles.messageRowUser}>
                  <View style={styles.bubbleContainerUser}>
                    <Text style={styles.senderNameUser}>YOU • {formatTime(msg.sentAt)}</Text>
                    <View style={styles.bubbleUser}>
                      <Text style={styles.messageTextUser}>{msg.content}</Text>
                    </View>
                  </View>
                  <Image source={{ uri: `https://api.dicebear.com/7.x/notionists/svg?seed=${msg.sender}&backgroundColor=b9c7e4` }} style={styles.messageAvatarRight} />
                </View>
              );
            }

            return (
              <View key={idx} style={styles.messageRowPartner}>
                <Image source={{ uri: `https://api.dicebear.com/7.x/notionists/svg?seed=${msg.sender}&backgroundColor=b9c7e4` }} style={styles.messageAvatar} />
                <View style={styles.bubbleContainerPartner}>
                  <Text style={styles.senderName}>{msg.sender} • {formatTime(msg.sentAt)}</Text>
                  <View style={styles.bubblePartner}>
                    <Text style={styles.messageTextPartner}>{msg.content}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={[styles.inputArea, { paddingBottom: Platform.OS === 'ios' ? insets.bottom || 16 : 16 }]}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.attachBtnCircle}>
              <Ionicons name="add" size={24} color="#75777e" />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.textInput}
                placeholder="Craft a message..."
                placeholderTextColor="#75777e"
                value={message}
                onChangeText={setMessage}
                multiline
              />
              <TouchableOpacity style={styles.emojiBtn}>
                <Ionicons name="happy-outline" size={24} color="#75777e" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
              <Ionicons name="send" size={16} color="#ffffff" style={{ marginLeft: 2 }} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  appBarSafe: {
    backgroundColor: 'rgba(251, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
    zIndex: 10,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBtn: {
    padding: 8,
    marginLeft: -8,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 12,
  },
  groupAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: '#eae8e7',
  },
  groupAvatarMore: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: '#775a19',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupAvatarMoreText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#ffffff',
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
  },
  statusText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 8,
    color: '#75777e',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  appBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 8,
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  chatContent: {
    padding: 16,
    paddingBottom: 40,
  },
  systemBadgeContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  systemBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  systemBadgeText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#ffffff',
    letterSpacing: 1,
  },
  messageRowPartner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 24,
    gap: 12,
    maxWidth: '85%',
  },
  messageRowUser: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 24,
    gap: 12,
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 4,
  },
  messageAvatarRight: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 4,
  },
  bubbleContainerPartner: {
    flex: 1,
  },
  bubbleContainerUser: {
    alignItems: 'flex-end',
    flex: 1,
  },
  senderName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9,
    color: '#75777e',
    marginLeft: 8,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  senderNameUser: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9,
    color: '#75777e',
    marginRight: 8,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bubblePartner: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 4,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#efeded',
  },
  bubblePartnerImage: {
    backgroundColor: '#ffffff',
    padding: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 4,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#efeded',
  },
  attachedImage: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 12,
  },
  imageCaption: {
    padding: 12,
  },
  bubbleUser: {
    backgroundColor: '#000000',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  messageTextPartner: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 15,
    color: '#1b1c1c',
    lineHeight: 22,
  },
  messageTextUser: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 15,
    color: '#ffffff',
    lineHeight: 22,
  },
  dateSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e4e2e2',
  },
  dateSeparatorText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9,
    color: '#75777e',
    letterSpacing: 1,
  },
  systemLogContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  systemLogText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9,
    color: '#c5c6cd',
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  inputArea: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  attachBtnCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f5f3f3',
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
  },
  textInput: {
    flex: 1,
    minHeight: 32,
    maxHeight: 120,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 15,
    color: '#1b1c1c',
    paddingTop: 8,
    paddingBottom: 8,
  },
  emojiBtn: {
    padding: 6,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  }
});
