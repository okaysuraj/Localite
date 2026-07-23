import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, TextInput, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config';

export default function MessagesInboxScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('MESSAGES');
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const currentUserStr = await AsyncStorage.getItem('user');
      if (!token || !currentUserStr) return;
      
      const currentUser = JSON.parse(currentUserStr);

      const response = await fetch(`${API_URL}/messages/direct/conversations`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        const formatted = data.map(msg => {
          const isSender = msg.sender.id === currentUser.id;
          const otherUser = isSender ? msg.receiver : msg.sender;
          
          return {
            id: otherUser.id.toString(),
            user: {
              id: otherUser.id,
              username: otherUser.username,
              profileImageUrl: otherUser.profilePhotoUrl || 'https://via.placeholder.com/150'
            },
            lastMessage: msg.content,
            timestamp: new Date(msg.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            unread: false,
            online: false
          };
        });
        setConversations(formatted);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.conversationCard, item.unread && styles.unreadCard]}
      onPress={() => navigation.navigate('ChatScreen1x1', { user: item.user })}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.user.profileImageUrl }} style={styles.avatar} />
        {item.online && <View style={styles.onlineDot} />}
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.username, item.unread && styles.unreadText]}>{item.user.username}</Text>
          <Text style={[styles.timestamp, item.unread && styles.unreadText]}>{item.timestamp}</Text>
        </View>
        <Text style={[styles.lastMessage, item.unread && styles.unreadMessageText]} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inbox</Text>
        <TouchableOpacity style={styles.newChatBtn} onPress={() => navigation.navigate('NewConversation')}>
          <Ionicons name="add" size={20} color="#ffffff" />
          <Text style={styles.newChatText}>New Chat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#75777e" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search conversations..."
          placeholderTextColor="#75777e"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'MESSAGES' && styles.activeTab]}
          onPress={() => setActiveTab('MESSAGES')}
        >
          <Text style={[styles.tabText, activeTab === 'MESSAGES' && styles.activeTabText]}>MESSAGES</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'REQUESTS' && styles.activeTab]}
          onPress={() => setActiveTab('REQUESTS')}
        >
          <Text style={[styles.tabText, activeTab === 'REQUESTS' && styles.activeTabText]}>REQUESTS</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000000" style={{ marginTop: 24 }} />
      ) : conversations.length === 0 ? (
        <View style={{ padding: 24, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'PlusJakartaSans_400Regular', color: '#75777e' }}>No conversations yet.</Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    color: '#000000',
  },
  newChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  newChatText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eae8e7',
    marginHorizontal: 24,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#1b1c1c',
    paddingVertical: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  tabText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#75777e',
    letterSpacing: 1,
  },
  activeTabText: {
    color: '#000000',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  conversationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  unreadCard: {
    backgroundColor: '#ffffff',
    borderLeftWidth: 4,
    borderLeftColor: '#775a19',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    backgroundColor: '#22c55e',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  username: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#1b1c1c',
  },
  timestamp: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    textTransform: 'uppercase',
  },
  lastMessage: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
  },
  unreadText: {
    color: '#000000',
  },
  unreadMessageText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#1b1c1c',
  }
});
