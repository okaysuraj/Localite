import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

export default function LiveMatchScreen({ navigation }) {
  const [matchData, setMatchData] = useState({
    time: "74:22",
    homeTeam: "Kensington United",
    awayTeam: "Belgravia Rovers",
    homeScore: 2,
    awayScore: 1,
    stats: {
      possession: { home: 58, away: 42 },
      shots: { home: 12, away: 8 },
      shotsOnTarget: { home: 7, away: 3 },
      passAccuracy: { home: 89, away: 81 },
      corners: { home: 6, away: 3 },
    },
    timeline: [
      { id: 1, minute: 68, type: 'GOAL', team: 'HOME', player: 'Sebastian Sterling', extra: 'ASSIST: MARCUS CHEN' },
      { id: 2, minute: 54, type: 'YELLOW_CARD', team: 'AWAY', player: 'Julian Knight', extra: 'TACTICAL FOUL' },
      { id: 3, minute: 45, type: 'SUBSTITUTION', team: 'HOME', playerIn: 'David Park', playerOut: 'Alex Wong' },
      { id: 4, minute: 32, type: 'GOAL', team: 'AWAY', player: 'Sophia Valente', extra: 'HEADER FROM CORNER' },
      { id: 5, minute: 18, type: 'GOAL', team: 'HOME', player: 'Sebastian Sterling', extra: 'PENALTY' }
    ]
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setMatchData((prev) => {
        let [mins, secs] = prev.time.split(':').map(Number);
        secs++;
        if (secs >= 60) {
          mins++;
          secs = 0;
        }
        return {
          ...prev,
          time: `${mins}:${String(secs).padStart(2, '0')}`
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Match Tracker</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Scoreboard Card */}
        <View style={styles.scoreboard}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE • 2ND HALF</Text>
          </View>
          <Text style={styles.leagueText}>Community Football Championship</Text>

          <View style={styles.teamsRow}>
            <View style={styles.teamInfo}>
              <View style={styles.teamLogo}>
                <MaterialIcons name="shield" size={28} color={colors.accent} />
              </View>
              <Text style={styles.teamName}>{matchData.homeTeam}</Text>
              <Text style={styles.teamRole}>HOME</Text>
            </View>

            <View style={styles.scoreInfo}>
              <Text style={styles.scoreText}>{matchData.homeScore} : {matchData.awayScore}</Text>
              <View style={styles.timerBadge}>
                <Text style={styles.timerText}>{matchData.time}</Text>
              </View>
            </View>

            <View style={styles.teamInfo}>
              <View style={styles.teamLogo}>
                <MaterialIcons name="shield" size={28} color="#4B5563" />
              </View>
              <Text style={styles.teamName}>{matchData.awayTeam}</Text>
              <Text style={styles.teamRole}>AWAY</Text>
            </View>
          </View>
        </View>

        {/* Match Statistics */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>MATCH STATISTICS</Text>
          
          {/* Possession Bar */}
          <View style={styles.statRow}>
            <View style={styles.statHeader}>
              <Text style={styles.statValLeft}>{matchData.stats.possession.home}%</Text>
              <Text style={styles.statLabel}>Ball Possession</Text>
              <Text style={styles.statValRight}>{matchData.stats.possession.away}%</Text>
            </View>
            <View style={styles.statBarTrack}>
              <View style={[styles.statBarFill, { width: `${matchData.stats.possession.home}%`, backgroundColor: colors.accent }]} />
              <View style={[styles.statBarFill, { width: `${matchData.stats.possession.away}%`, backgroundColor: '#9CA3AF' }]} />
            </View>
          </View>

          {/* Shots */}
          <View style={styles.statRow}>
            <View style={styles.statHeader}>
              <Text style={styles.statValLeft}>{matchData.stats.shots.home}</Text>
              <Text style={styles.statLabel}>Total Shots</Text>
              <Text style={styles.statValRight}>{matchData.stats.shots.away}</Text>
            </View>
            <View style={styles.statBarTrack}>
              <View style={[styles.statBarFill, { width: `${(matchData.stats.shots.home / 20) * 100}%`, backgroundColor: colors.accent }]} />
            </View>
          </View>

          {/* Pass Accuracy */}
          <View style={styles.statRow}>
            <View style={styles.statHeader}>
              <Text style={styles.statValLeft}>{matchData.stats.passAccuracy.home}%</Text>
              <Text style={styles.statLabel}>Pass Accuracy</Text>
              <Text style={styles.statValRight}>{matchData.stats.passAccuracy.away}%</Text>
            </View>
            <View style={styles.statBarTrack}>
              <View style={[styles.statBarFill, { width: `${matchData.stats.passAccuracy.home}%`, backgroundColor: colors.accent }]} />
              <View style={[styles.statBarFill, { width: `${matchData.stats.passAccuracy.away}%`, backgroundColor: '#9CA3AF' }]} />
            </View>
          </View>

          {/* Corners */}
          <View style={styles.statRow}>
            <View style={styles.statHeader}>
              <Text style={styles.statValLeft}>{matchData.stats.corners.home}</Text>
              <Text style={styles.statLabel}>Corners</Text>
              <Text style={styles.statValRight}>{matchData.stats.corners.away}</Text>
            </View>
          </View>
        </View>

        {/* Live Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.sectionTitle}>EVENT TIMELINE</Text>
          {matchData.timeline.map((event) => (
            <View key={event.id} style={styles.timelineItem}>
              <View style={styles.minuteBadge}>
                <Text style={styles.minuteText}>{event.minute}'</Text>
              </View>
              <View style={styles.timelineDetail}>
                <View style={styles.timelineHeader}>
                  <Text style={styles.timelinePlayer}>{event.player}</Text>
                  <Text style={[styles.timelineType, event.type === 'GOAL' ? { color: colors.accent } : { color: '#E67E22' }]}>
                    {event.type}
                  </Text>
                </View>
                {event.extra ? (
                  <Text style={styles.timelineExtra}>{event.extra}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  content: {
    padding: 18,
    paddingBottom: 36,
  },
  scoreboard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EDF5F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.accent,
    letterSpacing: 0.5,
  },
  leagueText: {
    fontSize: 11,
    color: '#6B6B6B',
    marginBottom: 18,
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  teamInfo: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F7F6F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  teamName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  teamRole: {
    fontSize: 10,
    color: '#6B6B6B',
    marginTop: 2,
  },
  scoreInfo: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  timerBadge: {
    backgroundColor: '#F7F6F3',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 6,
  },
  timerText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accent,
    fontVariant: ['tabular-nums'],
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B6B6B',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  statRow: {
    marginBottom: 14,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  statValLeft: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 11,
    color: '#6B6B6B',
  },
  statValRight: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  statBarTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F6F3',
  },
  minuteBadge: {
    backgroundColor: '#F7F6F3',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  minuteText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  timelineDetail: {
    flex: 1,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelinePlayer: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  timelineType: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  timelineExtra: {
    fontSize: 10,
    color: '#6B6B6B',
    marginTop: 2,
  },
});
