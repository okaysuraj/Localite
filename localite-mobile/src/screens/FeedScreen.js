import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import EventCard from '../components/EventCard';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function FeedScreen() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/feed`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setFeedItems(await response.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeed();
  };

  const handleUserClick = (userId) => {
    navigation.navigate('PublicProfile', { userId });
  };

  const handleManage = (event) => {
    navigation.navigate('Create', { editEvent: event }); // Mock manage
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ccff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NETWORK FEED</Text>
      </View>

      {feedItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={64} color="rgba(255,255,255,0.1)" />
          <Text style={styles.emptyText}>No activity in your network yet. Start following operators!</Text>
        </View>
      ) : (
        <FlatList
          data={feedItems}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ccff00" />}
          renderItem={({ item }) => (
            <View style={styles.feedCard}>
              <Text style={styles.feedAction}>
                <Text style={styles.feedActor} onPress={() => handleUserClick(item.actor.id)}>
                  {item.actor.username}
                </Text> {item.action.toLowerCase()} an event
              </Text>
              <EventCard 
                item={item.event} 
                isHost={false} // Will need proper isHost checking, simplified for now
                onManage={() => handleManage(item.event)}
                onUserClick={handleUserClick}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  loadingContainer: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, paddingTop: 60, backgroundColor: '#1e293b', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', alignItems: 'center' },
  headerTitle: { color: 'white', fontFamily: 'monospace', fontSize: 16, letterSpacing: 2 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { color: '#94a3b8', textAlign: 'center', marginTop: 20, fontFamily: 'monospace', textTransform: 'uppercase' },
  feedCard: { backgroundColor: '#1e293b', padding: 15, borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  feedAction: { color: '#ccff00', fontFamily: 'monospace', fontSize: 12, marginBottom: 15, textTransform: 'uppercase' },
  feedActor: { color: 'white', fontWeight: 'bold', textDecorationLine: 'underline' }
});
