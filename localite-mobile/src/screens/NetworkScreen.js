import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { useFocusEffect } from '@react-navigation/native';

export default function NetworkScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNetworkData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      // Fetch users
      const usersRes = await fetch(`${API_URL}/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (usersRes.ok) {
        setUsers(await usersRes.json());
      }

      // Fetch pending requests
      const pendingRes = await fetch(`${API_URL}/users/connections/pending`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (pendingRes.ok) {
        setPendingRequests(await pendingRes.json());
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNetworkData();
    }, [])
  );

  const handleConnect = async (userId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/users/${userId}/connect`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        Alert.alert('Success', 'Connection request sent!');
      } else {
        const text = await response.text();
        Alert.alert('Notice', text);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (connectionId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/users/connections/${connectionId}/accept`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        Alert.alert('Success', 'Connection established!');
        fetchNetworkData(); // Refresh list
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderPendingRequest = ({ item }) => (
    <View style={styles.pendingCard}>
      <View>
        <Text style={styles.userName}>{item.requesterName}</Text>
        <Text style={styles.subText}>Wants to connect</Text>
      </View>
      <TouchableOpacity style={styles.acceptBtn} onPress={() => handleAccept(item.connectionId)}>
        <Ionicons name="checkmark" size={16} color="white" />
        <Text style={styles.acceptBtnText}>ACCEPT</Text>
      </TouchableOpacity>
    </View>
  );

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userHeader}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={styles.userName}>{item.username}</Text>
            {item.isVerified && <Ionicons name="checkmark-circle" size={16} color="#ccff00" />}
          </View>
          <Text style={styles.neighborhood}>{item.neighborhood || 'Sector Unknown'}</Text>
        </View>
        <View style={styles.avatarIcon}>
          <Ionicons name="person" size={20} color="#94a3b8" />
          <View style={{position: 'absolute', bottom: -5, right: -5, backgroundColor: '#0f172a', paddingHorizontal: 4, borderRadius: 10, borderWidth: 1, borderColor: '#ccff00'}}>
            <Text style={{color: '#ccff00', fontSize: 8, fontWeight: 'bold'}}>{item.trustScore}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.bio} numberOfLines={2}>
        {item.bio || 'No operational biography available.'}
      </Text>
      
      <View style={styles.skillsContainer}>
        <Text style={styles.skillsLabel}>Specializations</Text>
        <Text style={styles.skillsText}>{item.sportsInterests || 'None'}</Text>
      </View>

      <View style={{flexDirection: 'row', gap: 10}}>
        <TouchableOpacity style={[styles.connectBtn, {flex: 1}]} onPress={() => handleConnect(item.id)}>
          <Ionicons name="person-add" size={16} color="#ccff00" />
          <Text style={styles.connectBtnText}>CONNECT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.connectBtn, {flex: 1, borderColor: '#64748b'}]} onPress={() => navigation.navigate('DirectMessage', { recipient: item })}>
          <Ionicons name="chatbubbles" size={16} color="#94a3b8" />
          <Text style={[styles.connectBtnText, {color: '#94a3b8'}]}>MESSAGE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LOCAL <Text style={{color: '#ccff00'}}>NETWORK</Text></Text>
        <Text style={styles.headerSub}>Connect with operatives in your sector</Text>
      </View>

      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#ccff00" />
          <Text style={styles.loadingText}>SCANNING NETWORK...</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUser}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            pendingRequests.length > 0 ? (
              <View style={styles.pendingSection}>
                <Text style={styles.sectionTitle}>PENDING CONNECTIONS</Text>
                <FlatList
                  data={pendingRequests}
                  keyExtractor={(item) => item.connectionId.toString()}
                  renderItem={renderPendingRequest}
                  scrollEnabled={false}
                />
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { padding: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: 1 },
  headerSub: { fontSize: 14, color: '#94a3b8', marginTop: 5 },
  listContainer: { padding: 20, paddingBottom: 100 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#ccff00', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 15 },
  pendingSection: { marginBottom: 30 },
  pendingCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(236,72,153,0.1)', borderWidth: 1, borderColor: 'rgba(236,72,153,0.5)', padding: 15, borderRadius: 12, marginBottom: 10 },
  subText: { color: '#94a3b8', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },
  acceptBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ccff00', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8, gap: 5 },
  acceptBtnText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  userCard: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderRadius: 15, padding: 20, marginBottom: 15 },
  userHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  userName: { fontSize: 18, fontWeight: 'bold', color: 'white', textTransform: 'uppercase', letterSpacing: 0.5 },
  neighborhood: { color: '#ccff00', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },
  avatarIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(15,23,42,0.8)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  bio: { color: '#94a3b8', fontSize: 14, marginBottom: 15, minHeight: 40 },
  skillsContainer: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 15, marginBottom: 20 },
  skillsLabel: { color: '#64748b', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5 },
  skillsText: { color: '#f8fafc', fontSize: 14 },
  connectBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(204,255,0,0.5)', paddingVertical: 12, borderRadius: 10, gap: 8 },
  connectBtnText: { color: '#f8fafc', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#ccff00', fontSize: 12, fontWeight: 'bold', marginTop: 15, textTransform: 'uppercase', letterSpacing: 2 }
});
