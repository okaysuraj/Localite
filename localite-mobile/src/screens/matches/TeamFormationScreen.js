import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TeamFormationScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('RESERVE');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tactical Command</Text>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="notifications" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.subtitle}>Match Week 12 • Arena Alpha</Text>
          <Text style={styles.mainTitle}>Team Tactics</Text>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'RESERVE' && styles.activeTab]}
            onPress={() => setActiveTab('RESERVE')}
          >
            <Text style={[styles.tabText, activeTab === 'RESERVE' && styles.activeTabText]}>RESERVE ROSTER</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'TEAMS' && styles.activeTab]}
            onPress={() => setActiveTab('TEAMS')}
          >
            <Text style={[styles.tabText, activeTab === 'TEAMS' && styles.activeTabText]}>ACTIVE TEAMS</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'RESERVE' ? (
          <View style={styles.reserveSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>RESERVE ROSTER (12)</Text>
            </View>
            
            <View style={styles.playerList}>
              {/* Player Item */}
              <TouchableOpacity style={styles.playerCard}>
                <View style={styles.playerInfo}>
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>AM</Text>
                  </View>
                  <View>
                    <Text style={styles.playerName}>A. Miller</Text>
                    <Text style={styles.playerStats}>ST • REP: 88</Text>
                  </View>
                </View>
                <MaterialIcons name="drag-indicator" size={24} color="#75777e" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.playerCard}>
                <View style={styles.playerInfo}>
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>JL</Text>
                  </View>
                  <View>
                    <Text style={styles.playerName}>J. Laurent</Text>
                    <Text style={styles.playerStats}>GK • REP: 92</Text>
                  </View>
                </View>
                <MaterialIcons name="drag-indicator" size={24} color="#75777e" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.playerCard}>
                <View style={styles.playerInfo}>
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>SK</Text>
                  </View>
                  <View>
                    <Text style={styles.playerName}>S. Knight</Text>
                    <Text style={styles.playerStats}>MD • REP: 84</Text>
                  </View>
                </View>
                <MaterialIcons name="drag-indicator" size={24} color="#75777e" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.teamsSection}>
            {/* Team Crest */}
            <View style={[styles.teamContainer, {borderTopColor: '#000000'}]}>
              <View style={styles.teamHeader}>
                <View>
                  <Text style={styles.teamName}>Team Crest</Text>
                  <Text style={styles.teamStats}>EST. SCORE: <Text style={{color: '#000000', fontWeight: 'bold'}}>442</Text></Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={styles.captainLabel}>CAPTAIN</Text>
                  <Text style={styles.captainName}>Pending...</Text>
                </View>
              </View>
              
              <View style={styles.slotsContainer}>
                <View style={styles.emptySlot}>
                  <Text style={styles.emptySlotText}>DRAG PLAYER HERE</Text>
                </View>
                
                <View style={[styles.filledSlot, {backgroundColor: '#000000'}]}>
                  <View style={styles.playerInfo}>
                    <View style={[styles.avatarPlaceholder, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
                      <Text style={[styles.avatarText, {color: '#ffffff'}]}>DB</Text>
                    </View>
                    <View>
                      <Text style={[styles.playerName, {color: '#ffffff'}]}>D. Beckham</Text>
                      <Text style={[styles.playerStats, {color: 'rgba(255,255,255,0.7)'}]}>CAPTAIN • MD</Text>
                    </View>
                  </View>
                  <MaterialIcons name="star" size={20} color="#775a19" />
                </View>
              </View>
            </View>

            {/* Team Sovereign */}
            <View style={[styles.teamContainer, {borderTopColor: '#775a19'}]}>
              <View style={styles.teamHeader}>
                <View>
                  <Text style={[styles.teamName, {color: '#775a19'}]}>Team Sovereign</Text>
                  <Text style={styles.teamStats}>EST. SCORE: <Text style={{color: '#775a19', fontWeight: 'bold'}}>418</Text></Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={styles.captainLabel}>CAPTAIN</Text>
                  <Text style={styles.captainName}>L. Hamilton</Text>
                </View>
              </View>
              
              <View style={styles.slotsContainer}>
                <View style={[styles.filledSlot, {backgroundColor: '#775a19'}]}>
                  <View style={styles.playerInfo}>
                    <View style={[styles.avatarPlaceholder, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
                      <Text style={[styles.avatarText, {color: '#ffffff'}]}>LH</Text>
                    </View>
                    <View>
                      <Text style={[styles.playerName, {color: '#ffffff'}]}>L. Hamilton</Text>
                      <Text style={[styles.playerStats, {color: 'rgba(255,255,255,0.7)'}]}>CAPTAIN • MD</Text>
                    </View>
                  </View>
                  <MaterialIcons name="star" size={20} color="#000000" />
                </View>
                
                <View style={styles.emptySlot}>
                  <Text style={styles.emptySlotText}>DRAG PLAYER HERE</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Balance Indicator */}
        <View style={styles.balanceContainer}>
          <View style={styles.balanceHeader}>
            <Text style={[styles.balanceLabel, {color: '#000000'}]}>CREST (52%)</Text>
            <Text style={[styles.balanceLabel, {color: '#775a19'}]}>SOVEREIGN (48%)</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, {width: '52%', backgroundColor: '#000000'}]} />
            <View style={[styles.progressBarFill, {width: '48%', backgroundColor: '#775a19'}]} />
          </View>
          <Text style={styles.balanceText}>Analysis: Teams are well-matched. Advantage slightly favors Team Crest due to mid-field reputation density.</Text>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>FINALIZE TEAMS</Text>
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
  titleSection: {
    marginBottom: 24,
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  mainTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000000',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e4e2e2',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 4,
  },
  activeTab: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#44474d',
  },
  activeTabText: {
    color: '#000000',
  },
  reserveSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#75777e',
  },
  playerList: {
    gap: 12,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f3f3',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c5c6cd',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e4e2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000000',
  },
  playerName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000000',
  },
  playerStats: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 10,
    color: '#75777e',
  },
  teamsSection: {
    gap: 24,
    marginBottom: 24,
  },
  teamContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(245, 243, 243, 0.5)',
    borderBottomWidth: 1,
    borderBottomColor: '#c5c6cd',
  },
  teamName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 4,
  },
  teamStats: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
  },
  captainLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  captainName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000000',
  },
  slotsContainer: {
    padding: 16,
    gap: 12,
    minHeight: 200,
  },
  emptySlot: {
    height: 64,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#c5c6cd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySlotText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
  },
  filledSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  balanceContainer: {
    backgroundColor: '#e4e2e2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  balanceLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#efeded',
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
  },
  balanceText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#75777e',
    fontStyle: 'italic',
  },
  footer: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(197, 198, 205, 0.3)',
  },
  primaryButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#ffffff',
  },
});
