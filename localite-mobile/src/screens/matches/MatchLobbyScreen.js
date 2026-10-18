import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, ActivityIndicator, TextInput, KeyboardAvoidingView 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

export default function MatchLobbyScreen({ route, navigation }) {
  const { matchId = '1' } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });
  const [chatMessage, setChatMessage] = useState('');
  const [chatList, setChatList] = useState([
    {
      id: 1,
      sender: 'Marcus Chen',
      time: '14:42',
      isMe: false,
      text: 'Are we playing 3 sets or best of 5 for badminton doubles?',
    },
    {
      id: 2,
      sender: 'You',
      time: '14:45',
      isMe: true,
      text: 'Best of 3 sets to 21 points. Shuttlecocks are ready on Court 4.',
    },
  ]);

  const match = {
    id: matchId,
    title: 'Badminton Doubles: Court 4',
    location: 'Heritage Sports Complex, Court 4',
    time: '18:30',
    sport: 'Badminton',
    teamAlpha: [
      { id: 1, name: 'Marcus Chen', role: 'CAPTAIN', status: 'Arrived', ready: true },
      { id: 2, name: 'You', role: 'PARTNER', status: 'Arrived', ready: true },
    ],
    teamBravo: [
      { id: 3, name: 'Sophia Valente', role: 'CAPTAIN', status: 'Arrived', ready: true },
      { id: 4, name: 'Julian Knight', role: 'PARTNER', status: 'In Transit', ready: false },
    ]
  };

  useEffect(() => {
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
  }, []);

  const handleSendChat = () => {
    if (!chatMessage.trim()) return;
    setChatList(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'You',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        text: chatMessage.trim(),
      }
    ]);
    setChatMessage('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Match Lobby</Text>
          <Text style={styles.headerSubtitle}>{match.title}</Text>
        </View>
        <TouchableOpacity 
          style={styles.liveNavBtn} 
          onPress={() => navigation.navigate('LiveMatch', { matchId })}
        >
          <MaterialIcons name="play-circle-outline" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Countdown Briefing */}
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
          <TouchableOpacity 
            style={styles.confirmBtn}
            onPress={() => navigation.navigate('LiveMatch', { matchId })}
          >
            <Text style={styles.confirmBtnText}>ENTER LIVE MATCH</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>

        {/* Venue Information */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={18} color={colors.accent} />
            <Text style={styles.infoText}>{match.location}</Text>
          </View>
          <View style={[styles.infoRow, { marginTop: 8 }]}>
            <MaterialIcons name="sports-tennis" size={18} color={colors.accent} />
            <Text style={styles.infoText}>Best of 3 sets • 21 points • Feather Shuttles</Text>
          </View>
        </View>

        {/* Teams */}
        <View style={styles.teamContainer}>
          <View style={styles.teamHeader}>
            <Text style={styles.teamName}>TEAM ALPHA</Text>
            <Text style={[styles.teamStatus, { color: colors.accent }]}>2/2 READY</Text>
          </View>
          {match.teamAlpha.map(player => (
            <View key={player.id} style={styles.playerRow}>
              <View style={styles.playerInfo}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarInitial}>{player.name[0]}</Text>
                </View>
                <View>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerRole}>{player.role} • {player.status.toUpperCase()}</Text>
                </View>
              </View>
              <MaterialIcons name="check-circle" size={20} color={colors.accent} />
            </View>
          ))}
        </View>

        <View style={styles.teamContainer}>
          <View style={styles.teamHeader}>
            <Text style={styles.teamName}>TEAM BRAVO</Text>
            <Text style={[styles.teamStatus, { color: '#E67E22' }]}>1/2 READY</Text>
          </View>
          {match.teamBravo.map(player => (
            <View key={player.id} style={styles.playerRow}>
              <View style={styles.playerInfo}>
                <View style={[styles.avatarCircle, !player.ready && { opacity: 0.6 }]}>
                  <Text style={styles.avatarInitial}>{player.name[0]}</Text>
                </View>
                <View>
                  <Text style={[styles.playerName, !player.ready && { opacity: 0.6 }]}>{player.name}</Text>
                  <Text style={[styles.playerRole, !player.ready && { opacity: 0.6 }]}>{player.role} • {player.status.toUpperCase()}</Text>
                </View>
              </View>
              {player.ready ? (
                <MaterialIcons name="check-circle" size={20} color={colors.accent} />
              ) : (
                <MaterialIcons name="schedule" size={20} color="#9CA3AF" />
              )}
            </View>
          ))}
        </View>

        {/* Live Lobby Chat List */}
        <View style={styles.chatSection}>
          <Text style={styles.chatSectionTitle}>LOBBY CHAT</Text>
          {chatList.map(msg => (
            <View key={msg.id} style={[styles.chatBubble, msg.isMe ? styles.chatBubbleMe : styles.chatBubbleOther]}>
              <View style={styles.chatMeta}>
                <Text style={styles.chatSender}>{msg.sender}</Text>
                <Text style={styles.chatTime}>{msg.time}</Text>
              </View>
              <Text style={styles.chatText}>{msg.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Chat Input Bar */}
      <View style={styles.chatInputContainer}>
        <TextInput 
          placeholder="Message players in lobby..."
          placeholderTextColor="#9CA3AF"
          style={styles.chatInput}
          value={chatMessage}
          onChangeText={setChatMessage}
          onSubmitEditing={handleSendChat}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSendChat}>
          <MaterialIcons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6F3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 56 : 36,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  backButton: {
    padding: 6,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#6B6B6B',
    marginTop: 2,
  },
  liveNavBtn: {
    padding: 6,
  },
  content: {
    padding: 18,
    paddingBottom: 24,
  },
  briefingContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B6B6B',
    letterSpacing: 1,
    marginBottom: 12,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  timeBlock: {
    alignItems: 'center',
  },
  timeValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  timeLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B6B6B',
    marginTop: 2,
  },
  timeSeparator: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  confirmBtn: {
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  confirmBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  teamContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
    marginBottom: 16,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F7F6F3',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  teamName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  teamStatus: {
    fontSize: 11,
    fontWeight: '700',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F6F3',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EDF5F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1A6B4A',
  },
  avatarInitial: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A6B4A',
  },
  playerName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  playerRole: {
    fontSize: 10,
    color: '#6B6B6B',
    marginTop: 2,
  },
  chatSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 14,
    marginBottom: 16,
  },
  chatSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B6B6B',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  chatBubble: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  chatBubbleMe: {
    backgroundColor: '#EDF5F0',
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  chatBubbleOther: {
    backgroundColor: '#F7F6F3',
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  chatMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 4,
  },
  chatSender: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1A6B4A',
  },
  chatTime: {
    fontSize: 9,
    color: '#6B6B6B',
  },
  chatText: {
    fontSize: 12,
    color: '#1A1A1A',
    lineHeight: 16,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    gap: 10,
  },
  chatInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F7F6F3',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#1A1A1A',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
