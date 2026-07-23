import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function LiveMatchScreen({ navigation }) {
  const [matchData, setMatchData] = useState({
    time: "74:22",
    homeTeam: "Oxford United",
    awayTeam: "Cambridge Blues",
    homeScore: 2,
    awayScore: 1,
    stats: {
      possession: { home: 54, away: 46 },
      shots: { home: 8, away: 3 },
      corners: { home: 5, away: 2 },
      fouls: { home: 12, away: 14 }
    },
    timeline: [
      { id: 1, minute: 62, type: 'GOAL', team: 'HOME', player: 'Sebastian Sterling', extra: 'ASSIST: MARCUS VANCE' },
      { id: 2, minute: 54, type: 'YELLOW_CARD', team: 'AWAY', player: 'Arthur Pendragon', extra: 'UNSPORTSMANLIKE CONDUCT' },
      { id: 3, minute: 45, type: 'SUBSTITUTION', team: 'HOME', playerIn: 'Julian Knight', playerOut: 'Henry Thorne' },
      { id: 4, minute: 45, type: 'HALF_TIME', team: null, player: 'End of First Half' }
    ]
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Royal Sports</Text>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="notifications" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Scoreboard */}
        <View style={styles.scoreboard}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE • 2ND HALF</Text>
          </View>
          <Text style={styles.leagueText}>The Championship Finals</Text>

          <View style={styles.teamsRow}>
            <View style={styles.teamInfo}>
              <View style={styles.teamLogo}>
                <MaterialIcons name="shield" size={32} color="#000000" />
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
                <MaterialIcons name="adjust" size={32} color="#000000" />
              </View>
              <Text style={styles.teamName}>{matchData.awayTeam}</Text>
              <Text style={styles.teamRole}>AWAY</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>POSSESSION</Text>
            <Text style={styles.statValue}>{matchData.stats.possession.home}% - {matchData.stats.possession.away}%</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>SHOTS</Text>
            <Text style={styles.statValue}>{matchData.stats.shots.home} - {matchData.stats.shots.away}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>CORNERS</Text>
            <Text style={styles.statValue}>{matchData.stats.corners.home} - {matchData.stats.corners.away}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>FOULS</Text>
            <Text style={styles.statValue}>{matchData.stats.fouls.home} - {matchData.stats.fouls.away}</Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Live Timeline</Text>
          
          <View style={styles.timeline}>
            <View style={styles.timelineLine} />
            
            {matchData.timeline.map((event, index) => (
              <View key={event.id} style={styles.timelineEvent}>
                <View style={[
                  styles.eventIconContainer, 
                  event.type === 'GOAL' ? {backgroundColor: '#000000'} : 
                  event.type === 'YELLOW_CARD' ? {backgroundColor: '#FFD700'} : 
                  event.type === 'SUBSTITUTION' ? {backgroundColor: '#efeded'} :
                  {backgroundColor: '#e4e2e2'}
                ]}>
                  <MaterialIcons 
                    name={
                      event.type === 'GOAL' ? 'sports-soccer' : 
                      event.type === 'YELLOW_CARD' ? 'style' : 
                      event.type === 'SUBSTITUTION' ? 'sync' : 'timer'
                    } 
                    size={16} 
                    color={event.type === 'GOAL' || event.type === 'HALF_TIME' ? '#ffffff' : '#000000'} 
                  />
                </View>

                <View style={styles.eventCard}>
                  <View style={styles.eventHeader}>
                    <Text style={styles.eventMinute}>{event.minute}' {event.type.replace('_', ' ')}</Text>
                    {event.team && <Text style={styles.eventTeam}>{event.team}</Text>}
                  </View>
                  
                  {event.type === 'SUBSTITUTION' ? (
                    <View>
                      <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                        <MaterialIcons name="arrow-downward" size={12} color="#ba1a1a" />
                        <Text style={styles.eventPlayerSub}>{event.playerOut}</Text>
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                        <MaterialIcons name="arrow-upward" size={12} color="#775a19" />
                        <Text style={styles.eventPlayer}>{event.playerIn}</Text>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.eventPlayer}>{event.player}</Text>
                      {event.extra && <Text style={styles.eventExtra}>{event.extra}</Text>}
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

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
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  scoreboard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.3)',
    marginBottom: 24,
    alignItems: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(254, 212, 136, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ba1a1a',
    marginRight: 8,
  },
  liveText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1.2,
  },
  leagueText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    marginBottom: 24,
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
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f5f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#c5c6cd',
  },
  teamName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  teamRole: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
  },
  scoreInfo: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  scoreText: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000000',
    marginBottom: 8,
  },
  timerBadge: {
    backgroundColor: 'rgba(255, 222, 165, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timerText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1.2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.3)',
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#000000',
  },
  timelineSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 16,
  },
  timeline: {
    paddingLeft: 16,
  },
  timelineLine: {
    position: 'absolute',
    left: 31,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#c5c6cd',
  },
  timelineEvent: {
    flexDirection: 'row',
    marginBottom: 24,
    position: 'relative',
  },
  eventIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 4,
    borderColor: '#fbf9f8',
    zIndex: 1,
  },
  eventCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.3)',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  eventMinute: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
  },
  eventTeam: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
  },
  eventPlayer: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000000',
  },
  eventPlayerSub: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    textDecorationLine: 'line-through',
  },
  eventExtra: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    marginTop: 4,
  }
});
