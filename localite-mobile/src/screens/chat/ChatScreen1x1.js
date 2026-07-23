import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, Platform, KeyboardAvoidingView, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config';

export default function ChatScreen1x1({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { user } = route.params || {};
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const scrollViewRef = useRef();

  useEffect(() => {
    if (!user || !user.id) return;
    fetchMessages();
  }, [user]);

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const cuStr = await AsyncStorage.getItem('user');
      if (cuStr) setCurrentUser(JSON.parse(cuStr));

      const res = await fetch(`${API_URL}/messages/direct/${user.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      const token = await AsyncStorage.getItem('userToken');
      const payload = { content: message.trim() };
      setMessage(''); // Optimistic clear

      const res = await fetch(`${API_URL}/messages/direct/${user.id}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        const newMsg = await res.json();
        setMessages(prev => [...prev, newMsg]);
        setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.appBarSafe}>
        <View style={styles.appBar}>
          <View style={styles.appBarLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
              <Ionicons name="arrow-back" size={24} color="#000000" />
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: user.profileImageUrl }} style={styles.avatar} />
                <View style={styles.onlineDot} />
              </View>
              <View>
                <Text style={styles.username}>{user.username}</Text>
                <View style={styles.statusRow}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Online</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.appBarRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="videocam-outline" size={24} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="settings-outline" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: false})}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#000000" style={{marginTop: 40}} />
          ) : (
            messages.map((msg, idx) => {
              const isMe = msg.sender.id === currentUser?.id;
              const timeStr = new Date(msg.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
              
              if (isMe) {
                return (
                  <View key={msg.id || idx} style={styles.messageRowUser}>
                    <View style={styles.bubbleUser}>
                      <Text style={styles.messageTextUser}>{msg.content}</Text>
                      <Text style={styles.timeTextUser}>{timeStr}</Text>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View key={msg.id || idx} style={styles.messageRowPartner}>
                    <Image source={{ uri: user.profileImageUrl }} style={styles.messageAvatar} />
                    <View style={styles.bubblePartner}>
                      <Text style={styles.messageTextPartner}>{msg.content}</Text>
                      <Text style={styles.timeTextPartner}>{timeStr}</Text>
                    </View>
                  </View>
                );
              }
            })
          )}
        </ScrollView>

        <View style={[styles.inputArea, { paddingBottom: Platform.OS === 'ios' ? insets.bottom || 16 : 16 }]}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachBtn}>
              <Ionicons name="add-circle-outline" size={24} color="#75777e" />
            </TouchableOpacity>
            <TextInput 
              style={styles.textInput}
              placeholder="Craft your message..."
              placeholderTextColor="#75777e"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={styles.emojiBtn}>
              <Ionicons name="happy-outline" size={24} color="#75777e" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
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
    backgroundColor: '#fbf9f8',
  },
  appBarSafe: {
    backgroundColor: '#ffffff',
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
    gap: 12,
  },
  iconBtn: {
    padding: 8,
    marginLeft: -8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: '#22c55e',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  username: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#1b1c1c',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
  },
  statusText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    textTransform: 'uppercase',
  },
  appBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: 20,
    paddingBottom: 40,
  },
  dateBadgeContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  dateBadge: {
    backgroundColor: '#f5f3f3',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
  },
  dateText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#44474d',
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
    marginBottom: 24,
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 4,
  },
  bubblePartner: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 4,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#efeded',
  },
  bubbleUser: {
    backgroundColor: '#0d1c32',
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 24,
    maxWidth: '85%',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  bubbleTyping: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#efeded',
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#775a19',
    opacity: 0.5,
  },
  messageTextPartner: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#1b1c1c',
    lineHeight: 24,
  },
  messageTextUser: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
  },
  timeTextPartner: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 10,
    color: '#75777e',
    textAlign: 'right',
    marginTop: 8,
  },
  timeTextUser: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 10,
    color: '#b9c7e4',
    textAlign: 'right',
    marginTop: 8,
  },
  attachmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e4e2e2',
  },
  attachmentIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#ffdea5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  attachmentInfo: {
    flex: 1,
  },
  attachmentName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#000000',
  },
  attachmentMeta: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  inputArea: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#eae8e7',
    padding: 6,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  attachBtn: {
    padding: 10,
  },
  emojiBtn: {
    padding: 10,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#1b1c1c',
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 8,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    marginRight: 2,
  }
});
