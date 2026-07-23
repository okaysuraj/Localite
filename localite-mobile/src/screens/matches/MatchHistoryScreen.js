import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function MatchHistoryScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('ALL MATCHES');
  const filters = ['ALL MATCHES', 'TENNIS', 'POLO', 'SQUASH'];

  const matchHistory = [
    {
      id: 1,
      date: 'AUGUST 14, 2023',
      location: 'THE ROYAL CLUB',
      title: 'Lawn Tennis Invitational',
      result: 'WIN',
      score: '6-4, 7-5',
      mvp: 'YOU',
      opponent: 'J. STERLING',
      notes: '"Exceptional backhand performance in the final set."',
      image: 'https://via.placeholder.com/400x200',
    },
    {
      id: 2,
      date: 'JULY 28, 2023',
      location: 'GREENWICH FIELDS',
      title: 'Polo Summer Cup',
      result: 'LOSS',
      score: '3 - 5',
      mvp: 'M. VANDERBILT',
      opponent: 'TEAM OAKLEY',
      notes: '"Challenging terrain affected the final chukker speed."',
      image: 'https://via.placeholder.com/400x200',
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Match History</Text>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="notifications" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>TOTAL MATCHES</Text>
            <Text style={styles.statValue}>42</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>WIN RATE</Text>
            <Text style={[styles.statValue, {color: '#775a19'}]}>68%</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>MVP TITLES</Text>
            <Text style={styles.statValue}>12</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>ACTIVE STREAK</Text>
            <Text style={[styles.statValue, {color: '#775a19'}]}>4 Wins</Text>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map(filter => (
              <TouchableOpacity 
                key={filter} 
                style={[styles.filterBtn, activeFilter === filter && styles.filterBtnActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.filterBtnText, activeFilter === filter && styles.filterBtnTextActive]}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Match List */}
        <View style={styles.matchList}>
          {matchHistory.map((match) => (
            <TouchableOpacity key={match.id} style={styles.matchCard}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: match.image }} style={styles.cardImage} />
                <View style={[styles.resultBadge, match.result === 'LOSS' && {backgroundColor: '#44474d'}]}>
                  <Text style={[styles.resultText, match.result === 'LOSS' && {color: '#ffffff'}]}>{match.result}</Text>
                </View>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={{flex: 1}}>
                    <Text style={styles.matchDate}>{match.date} • {match.location}</Text>
                    <Text style={styles.matchTitle}>{match.title}</Text>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <Text style={styles.scoreLabel}>FINAL SCORE</Text>
                    <Text style={styles.matchScore}>{match.score}</Text>
                  </View>
                </View>

                <View style={styles.detailsRow}>
                  <View style={styles.detailItem}>
                    <MaterialIcons name="stars" size={14} color="#775a19" />
                    <Text style={styles.detailText}>MVP: {match.mvp}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialIcons name="groups" size={14} color="#75777e" />
                    <Text style={styles.detailText}>OPPONENT: {match.opponent}</Text>
                  </View>
                </View>

                <View style={styles.notesContainer}>
                  <Text style={styles.notesText}>{match.notes}</Text>
                  <MaterialIcons name="arrow-forward" size={16} color="#000000" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
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
    fontSize: 24,
    color: '#000000',
  },
  filtersContainer: {
    marginBottom: 24,
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    marginRight: 12,
  },
  filterBtnActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#44474d',
  },
  filterBtnTextActive: {
    color: '#ffffff',
  },
  matchList: {
    gap: 16,
  },
  matchCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.3)',
  },
  imageContainer: {
    height: 160,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  resultBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#775a19',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  resultText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#ffffff',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  matchDate: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    marginBottom: 4,
  },
  matchTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#000000',
  },
  scoreLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    marginBottom: 4,
  },
  matchScore: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#000000',
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
  },
  notesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(197, 198, 205, 0.5)',
  },
  notesText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    fontStyle: 'italic',
    flex: 1,
    marginRight: 16,
  },
});
