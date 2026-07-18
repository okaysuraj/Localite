import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LiveEventPollScreen() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [time, setTime] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const options = [
    { id: 'a', title: 'Secret Garden Tour', percent: 42 },
    { id: 'b', title: 'Cognac & Cigars', percent: 28 },
    { id: 'c', title: 'Late Night Piano', percent: 30 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Royal Assemblage</Text>
        <View style={styles.avatar}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatarImg} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.heroLabel}>ACTIVE ASSEMBLY POLL</Text>
          <Text style={styles.heroTitle}>What should we do next?</Text>
          <Text style={styles.heroSubtitle}>Your preference shapes the evening's final chapter. Choose with intention.</Text>
        </View>

        <View style={styles.optionsContainer}>
          {options.map((opt) => {
            const isActive = selectedOption === opt.id;
            return (
              <TouchableOpacity 
                key={opt.id} 
                style={[styles.optionCard, isActive && styles.optionCardActive]}
                onPress={() => setSelectedOption(opt.id)}
                activeOpacity={0.8}
              >
                <View style={styles.optionTop}>
                  <Text style={styles.optionTitle}>{opt.title}</Text>
                  <Text style={styles.optionPercent}>{opt.percent}%</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${opt.percent}%`, backgroundColor: isActive ? '#775a19' : '#fed488' }]} />
                </View>
                {isActive && (
                  <View style={styles.activeIcon}>
                    <MaterialIcons name="check-circle" size={20} color="#775a19" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialIcons name="groups" size={28} color="#775a19" />
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>PARTICIPATION</Text>
              <Text style={styles.statValue}>124 Guests</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="verified" size={28} color="#775a19" />
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>STATUS</Text>
              <Text style={styles.statValue}>Verified Votes</Text>
            </View>
          </View>
        </View>

        <View style={styles.timerContainer}>
          <View style={styles.timerBadge}>
            <MaterialIcons name="timer" size={16} color="#fff" />
            <Text style={styles.timerText}>VOTE ENDS IN {timeString}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
    backgroundColor: '#fbf9f8',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eae8e7',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    gap: 32,
  },
  heroSection: {
    alignItems: 'center',
    textAlign: 'center',
  },
  heroLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optionCardActive: {
    borderColor: '#775a19',
  },
  optionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  optionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000',
    letterSpacing: 1,
  },
  optionPercent: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#775a19',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#f5f3f3',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  activeIcon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  statsContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    padding: 16,
    borderRadius: 12,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  statValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    marginTop: 2,
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d1c32',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  timerText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    letterSpacing: 2,
  },
});
