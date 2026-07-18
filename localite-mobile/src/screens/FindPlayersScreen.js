import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FindPlayersScreen({ navigation }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestedPlayers();
  }, []);

  const fetchSuggestedPlayers = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/matches/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPlayers(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Your Peer</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Curating the elite sports community. Connect with players who match your precision, schedule, and reputation.</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#775a19" style={{marginTop: 40}} />
        ) : (
          <View style={styles.grid}>
            {players.map((player) => (
              <View key={player.id} style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image 
                    source={{ uri: player.profilePhotoUrl || 'https://via.placeholder.com/150' }}
                    style={styles.cardImage}
                  />
                  <View style={styles.badge}>
                    <MaterialIcons name="star" size={14} color="#775a19" />
                    <Text style={styles.badgeText}>{((player.matchScore / 100) * 5).toFixed(1)}</Text>
                  </View>
                </View>

                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <View style={styles.avatarContainer}>
                      <Image 
                        source={{ uri: player.profilePhotoUrl || 'https://via.placeholder.com/50' }}
                        style={styles.avatarImage}
                      />
                    </View>
                    <View>
                      <Text style={styles.playerName}>{player.username}</Text>
                      <Text style={styles.playerTier}>{player.sportsInterests || 'Elite Member'}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.tagsContainer}>
                    <View style={styles.tag}>
                      <MaterialIcons name="verified-user" size={14} color="#775a19" />
                      <Text style={styles.tagText}>VERIFIED</Text>
                    </View>
                    <View style={styles.tag}>
                      <MaterialIcons name="location-on" size={14} color="#775a19" />
                      <Text style={styles.tagText}>{player.neighborhood || 'LOCAL'}</Text>
                    </View>
                  </View>

                  <View style={styles.actionContainer}>
                    <View>
                      <Text style={styles.statLabel}>MATCH SCORE</Text>
                      <Text style={styles.statValue}>{player.matchScore}%</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.requestBtn}
                      onPress={() => navigation.navigate('PublicProfile', { userId: player.id })}
                    >
                      <Text style={styles.requestBtnText}>VIEW PROFILE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(197, 198, 205, 0.3)',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000000',
  },
  placeholder: {
    width: 32,
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    marginBottom: 24,
  },
  grid: {
    gap: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  imageContainer: {
    height: 160,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 4,
  },
  badgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000000',
  },
  cardContent: {
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#775a19',
    padding: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  playerName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000000',
  },
  playerTier: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f5f3f3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(197, 198, 205, 0.3)',
    paddingTop: 16,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    textTransform: 'uppercase',
  },
  statValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000000',
  },
  requestBtn: {
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  requestBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1.2,
  },
});
