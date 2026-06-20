import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { useFocusEffect } from '@react-navigation/native';

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await fetch(`${API_URL}/notifications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setNotifications(await res.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [])
  );

  const markAsRead = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await fetch(`${API_URL}/notifications/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderNotification = ({ item }) => (
    <View style={[styles.notificationCard, item.read ? styles.readCard : styles.unreadCard]}>
      <View style={styles.contentContainer}>
        <Ionicons 
          name={item.type === 'CONNECTION' ? 'people' : item.type === 'EVENT' ? 'calendar' : 'notifications'} 
          size={24} 
          color={item.read ? '#64748b' : '#ccff00'} 
        />
        <View style={styles.textContainer}>
          <Text style={[styles.messageText, item.read ? styles.readText : styles.unreadText]}>
            {item.message}
          </Text>
          <Text style={styles.timeText}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
      </View>
      {!item.read && (
        <TouchableOpacity style={styles.checkBtn} onPress={() => markAsRead(item.id)}>
          <Ionicons name="checkmark" size={18} color="#10b981" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#f8fafc" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ALERTS</Text>
        <View style={{width: 30}} />
      </View>

      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#ccff00" />
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotification}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No active alerts in your sector.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: 1 },
  listContainer: { padding: 20 },
  notificationCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1 },
  unreadCard: { backgroundColor: 'rgba(30,41,59,0.8)', borderColor: 'rgba(204,255,0,0.5)' },
  readCard: { backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.05)' },
  contentContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 15 },
  textContainer: { flex: 1 },
  messageText: { fontSize: 14, marginBottom: 5 },
  unreadText: { color: 'white', fontWeight: 'bold' },
  readText: { color: '#94a3b8' },
  timeText: { color: '#64748b', fontSize: 10, textTransform: 'uppercase' },
  checkBtn: { padding: 10, backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: 20 },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#64748b', textAlign: 'center', marginTop: 50, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }
});
