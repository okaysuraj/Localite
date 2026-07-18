import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLeaderboard } from '../services/api';

export default function LeaderboardScreen({ navigation }) {
  const [sport, setSport] = useState('Tennis');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const sports = ['Tennis', 'Basketball', 'Soccer', 'Golf', 'Volleyball', 'Pickleball'];

  useEffect(() => {
    fetchLeaderboardData();
  }, [sport]);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    try {
      const data = await getLeaderboard(sport);
      setLeaderboard(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const renderPlayer = ({ item, index }) => (
    <View style={styles.playerRow}>
      <View style={styles.rankContainer}>
        {index === 0 ? <Ionicons name="medal" size={24} color="#facc15" /> : 
         index === 1 ? <Ionicons name="medal" size={20} color="#cbd5e1" /> :
         index === 2 ? <Ionicons name="medal" size={20} color="#b45309" /> :
         <Text style={styles.rankText}>{index + 1}</Text>}
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{item.username}</Text>
        <Text style={styles.playerSkill}>{item.skillLevel} • {item.wins}W - {item.losses}L</Text>
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>{item.points}</Text>
        <Text style={styles.pointsLabel}>PTS</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#f8fafc" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={{width: 30}} />
      </View>

      <View style={styles.sportSelector}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sports}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.sportTab, sport === item && styles.sportTabActive]}
              onPress={() => setSport(item)}
            >
              <Text style={[styles.sportTabText, sport === item && styles.sportTabTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#ccff00" />
        </View>
      ) : (
        <FlatList
          data={leaderboard}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPlayer}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No ranked players for this sport yet.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: 1 },
  sportSelector: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  sportTab: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginHorizontal: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  sportTabActive: { borderColor: '#ccff00', backgroundColor: 'rgba(204,255,0,0.1)' },
  sportTabText: { color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  sportTabTextActive: { color: '#ccff00', fontWeight: 'bold' },
  listContainer: { padding: 15 },
  playerRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  rankContainer: { width: 40, alignItems: 'center' },
  rankText: { color: '#94a3b8', fontSize: 18, fontWeight: 'bold' },
  playerInfo: { flex: 1, marginLeft: 10 },
  playerName: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  playerSkill: { color: '#ccff00', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 },
  pointsContainer: { alignItems: 'flex-end' },
  pointsText: { color: '#ccff00', fontSize: 20, fontWeight: 'bold' },
  pointsLabel: { color: '#64748b', fontSize: 8, textTransform: 'uppercase', letterSpacing: 1 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#64748b', textAlign: 'center', marginTop: 50, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }
});
