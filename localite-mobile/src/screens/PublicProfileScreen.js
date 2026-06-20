import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function PublicProfileScreen({ route, navigation }) {
  const { userId } = route.params;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchProfile();
    checkFollowing();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setProfile(await response.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkFollowing = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/users/${userId}/is-following`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setIsFollowing(await response.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollowToggle = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const method = isFollowing ? 'DELETE' : 'POST';
      const endpoint = isFollowing ? 'unfollow' : 'follow';
      
      const response = await fetch(`${API_URL}/users/${userId}/${endpoint}`, {
        method,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading || !profile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ccff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>OPERATOR PROFILE</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView contentContainerStyle={{padding: 20}}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color="#ccff00" />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 15}}>
            <Text style={styles.username}>{profile.username}</Text>
            {profile.isVerified && <Ionicons name="checkmark-circle" size={18} color="#ccff00" />}
          </View>
          <Text style={styles.bio}>{profile.bio || 'No biography configured.'}</Text>
          
          <TouchableOpacity 
            style={[styles.followBtn, isFollowing && styles.unfollowBtn]} 
            onPress={handleFollowToggle}
          >
            <Text style={[styles.followBtnText, isFollowing && styles.unfollowBtnText]}>
              {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{profile.trustScore}</Text>
            <Text style={styles.statLabel}>TRUST SCORE</Text>
          </View>
          <View style={styles.statBox}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
              <Text style={styles.statValue}>{(profile.averageRating || 0).toFixed(1)}</Text>
              <Ionicons name="star" size={12} color="#ccff00" />
            </View>
            <Text style={styles.statLabel}>RATING</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{profile.eventsHosted}</Text>
            <Text style={styles.statLabel}>HOSTED</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{profile.eventsAttended}</Text>
            <Text style={styles.statLabel}>ATTENDED</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  loadingContainer: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60, backgroundColor: '#1e293b', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  headerTitle: { color: 'white', fontFamily: 'monospace', fontSize: 16, letterSpacing: 2 },
  backBtn: { padding: 5 },
  profileHeader: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(204,255,0,0.1)', borderWidth: 2, borderColor: '#ccff00', justifyContent: 'center', alignItems: 'center' },
  username: { color: 'white', fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase' },
  bio: { color: '#94a3b8', textAlign: 'center', marginTop: 10, paddingHorizontal: 20, fontSize: 14 },
  followBtn: { backgroundColor: '#ccff00', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20, marginTop: 20 },
  followBtnText: { color: '#0f172a', fontFamily: 'monospace', fontWeight: 'bold' },
  unfollowBtn: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ef4444' },
  unfollowBtnText: { color: '#ef4444' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  statBox: { width: '48%', backgroundColor: '#1e293b', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  statValue: { color: '#ccff00', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#94a3b8', fontSize: 10, fontFamily: 'monospace', marginTop: 5 }
});
