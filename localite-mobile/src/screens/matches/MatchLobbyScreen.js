import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, ActivityIndicator, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { API_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MatchLobbyScreen({ route, navigation }) {
  const { matchId } = route.params || { matchId: 1 }; // Default for demo
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    // Simulated fetch
    setTimeout(() => {
      setMatch({
        id: matchId,
        title: 'Championship Finals: London North vs. South',
        location: 'The Regent\'s Polo Grounds',
        time: '18:30',
        teamAlpha: [
          { id: 1, name: 'Arthur Montgomery', role: 'CAPTAIN', status: 'Arrived', ready: true },
          { id: 2, name: 'Elena Rossi', role: 'STRIKER', status: 'Arrived', ready: true },
        ],
        teamBravo: [
          { id: 3, name: 'Sienna Blake', role: 'CAPTAIN', status: 'Arrived', ready: true },
          { id: 4, name: 'Marcus Vane', role: 'STRIKER', status: 'In Transit', ready: false },
        ]
      });
      setLoading(false);
    }, 1000);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            clearInterval(timer);
            return prev;
          }
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [matchId]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#775a19" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pre-Game Lobby</Text>
        <View style={{width: 32}} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.briefingContainer}>
          <Text style={styles.subtitle}>MATCH COMMENCES IN</Text>
          <View style={styles.timerContainer}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeValue}>{String(timeLeft.minutes).padStart(2, '0')}</Text>
              <Text style={styles.timeLabel}>MINS</Text>
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeBlock}>
              <Text style={styles.timeValue}>{String(timeLeft.seconds).padStart(2, '0')}</Text>
              <Text style={styles.timeLabel}>SECS</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.confirmBtn}>
            <Text style={styles.confirmBtnText}>CONFIRM ATTENDANCE</Text>
          </TouchableOpacity>
        </View>

        {/* Teams */}
        <View style={styles.teamContainer}>
          <View style={styles.teamHeader}>
            <Text style={styles.teamName}>TEAM ALPHA <Text style={{fontWeight: 'normal', color: '#75777e'}}>(RANK 1)</Text></Text>
            <Text style={styles.teamStatus}>2/2 READY</Text>
          </View>
          {match.teamAlpha.map(player => (
            <View key={player.id} style={styles.playerRow}>
              <View style={styles.playerInfo}>
                <Image source={{uri: 'https://via.placeholder.com/50'}} style={styles.playerAvatar} />
                <View>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerRole}>{player.role} • {player.status.toUpperCase()}</Text>
                </View>
              </View>
              {player.ready ? (
                <MaterialIcons name="check-circle" size={20} color="#775a19" />
              ) : (
                <MaterialIcons name="schedule" size={20} color="#75777e" />
              )}
            </View>
          ))}
        </View>

        <View style={styles.teamContainer}>
          <View style={styles.teamHeader}>
            <Text style={styles.teamName}>TEAM BRAVO <Text style={{fontWeight: 'normal', color: '#75777e'}}>(RANK 3)</Text></Text>
            <Text style={[styles.teamStatus, {color: '#ba1a1a'}]}>1/2 READY</Text>
          </View>
          {match.teamBravo.map(player => (
            <View key={player.id} style={styles.playerRow}>
              <View style={styles.playerInfo}>
                <Image source={{uri: 'https://via.placeholder.com/50'}} style={[styles.playerAvatar, !player.ready && {opacity: 0.5}]} />
                <View>
                  <Text style={[styles.playerName, !player.ready && {opacity: 0.5}]}>{player.name}</Text>
                  <Text style={[styles.playerRole, !player.ready && {opacity: 0.5}]}>{player.role} • {player.status.toUpperCase()}</Text>
                </View>
              </View>
              {player.ready ? (
                <MaterialIcons name="check-circle" size={20} color="#775a19" />
              ) : (
                <MaterialIcons name="schedule" size={20} color="#75777e" />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Chat Input Placeholder */}
      <View style={styles.chatInputContainer}>
        <TextInput 
          placeholder="Type a message..."
          style={styles.chatInput}
        />
        <TouchableOpacity style={styles.sendBtn}>
          <MaterialIcons name="send" size={24} color="#775a19" />
        </TouchableOpacity>
      </View>
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
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  briefingContainer: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 24,
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1.2,
    marginBottom: 16,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  timeBlock: {
    alignItems: 'center',
  },
  timeValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 36,
    color: '#000000',
  },
  timeLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
  },
  timeSeparator: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 36,
    color: '#000000',
    marginBottom: 16,
  },
  confirmBtn: {
    backgroundColor: '#000000',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  confirmBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1.2,
  },
  teamContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 24,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fbf9f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e2e2',
  },
  teamName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000000',
    letterSpacing: 1.2,
  },
  teamStatus: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e2e2',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  playerName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  playerRole: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
  },
  chatInputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e4e2e2',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#f5f3f3',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
  },
  sendBtn: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
