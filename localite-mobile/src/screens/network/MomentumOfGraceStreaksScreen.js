import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MomentumOfGraceStreaksScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarWrap}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD80ZZCOcKkXuWeDEGnBhLILL_DRpTe9ifasygUG1vzo6Y6Geirq-V_q1mIdP5xESZ94B0FtXlnHfeXSiyIaX_NJJoTOpthwkp3Z5qrb1Wijj3fItxut62XVU8-yUROy9q7r4VD2JGMH2bxoLmAcU6xIj_Ev-ms6u2pCfkRu7zaMCw-EDTrBNgsLMTL0x1lHBjcEgbtlL7jigrlbBrFcFrrgIjWZ__d4ImQ5RjxXe1lhZUfl1enIyKKsw' }} 
              style={styles.avatarImg} 
            />
          </View>
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>LVL 24</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Momentum of Grace</Text>
          <Text style={styles.heroSubtitle}>CONSISTENCY IS THE ULTIMATE HALLMARK OF NOBILITY.</Text>
        </View>

        {/* Streak Visualizer */}
        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <View>
              <Text style={styles.streakTitle}>12 Day Streak</Text>
              <Text style={styles.streakNext}>Next Milestone: 14 Days</Text>
            </View>
            <Text style={styles.streakNumber}>12</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.calendarScroll}>
            {/* Past */}
            <View style={[styles.dayCard, { opacity: 0.6 }]}>
              <Text style={styles.dayName}>MON</Text>
              <Text style={styles.dayNumber}>01</Text>
            </View>
            <View style={[styles.dayCard, { opacity: 0.6 }]}>
              <Text style={styles.dayName}>TUE</Text>
              <Text style={styles.dayNumber}>02</Text>
            </View>
            
            {/* Active */}
            <View style={[styles.dayCardActive, styles.dayCardTransform]}>
              <View style={styles.activeStarWrap}>
                <MaterialIcons name="star" size={16} color="#775a19" />
              </View>
              <Text style={styles.dayNameActive}>WED</Text>
              <Text style={styles.dayNumberActive}>12</Text>
              <View style={styles.activeDot} />
            </View>

            {/* Future */}
            <View style={styles.dayCardFuture}>
              <Text style={styles.dayNameFuture}>THU</Text>
              <Text style={styles.dayNumberFuture}>13</Text>
            </View>
            <View style={styles.dayCardFuture}>
              <Text style={styles.dayNameFuture}>FRI</Text>
              <Text style={styles.dayNumberFuture}>14</Text>
            </View>
            <View style={styles.dayCardFuture}>
              <Text style={styles.dayNameFuture}>SAT</Text>
              <Text style={styles.dayNumberFuture}>15</Text>
            </View>
          </ScrollView>
        </View>

        <Text style={styles.sectionHeading}>STREAK BENEFITS</Text>

        {/* Benefit 1 */}
        <View style={styles.benefitCardLeft}>
          <View style={styles.benefitHeaderRow}>
            <MaterialIcons name="trending-up" size={16} color="#775a19" />
            <Text style={styles.benefitTag}>PRESTIGE BOOST</Text>
          </View>
          <Text style={styles.benefitTitle}>2x Prestige Multiplier</Text>
          <Text style={styles.benefitDesc}>Your contribution to local hubs earns double reputation points during your active streak.</Text>
        </View>

        {/* Benefit 2 */}
        <View style={styles.benefitCardSolid}>
          <View style={styles.benefitHeaderRow}>
            <MaterialIcons name="workspace-premium" size={16} color="#e9c176" />
            <Text style={[styles.benefitTag, { color: '#e9c176' }]}>EXCLUSIVE ACCESS</Text>
          </View>
          <Text style={[styles.benefitTitle, { color: '#fff' }]}>The Gilded Lounge</Text>
          <Text style={[styles.benefitDesc, { color: '#b9c7e4' }]}>Access unlocked. You are now invited to the Tier 1 private community hubs for 7 days.</Text>
        </View>

        {/* Benefit 3 */}
        <View style={[styles.benefitCardLeft, { marginBottom: 32 }]}>
          <View style={styles.benefitHeaderFlex}>
            <View>
              <View style={styles.benefitHeaderRow}>
                <MaterialIcons name="shield" size={16} color="#775a19" />
                <Text style={styles.benefitTag}>GRACE PERIOD</Text>
              </View>
              <Text style={styles.benefitTitle}>1 Saved Recovery</Text>
            </View>
            <View style={styles.activeTag}>
              <Text style={styles.activeTagText}>ACTIVE</Text>
            </View>
          </View>
          <Text style={styles.benefitDesc}>A 10-day streak grants one 'Absence of Grace'. Miss a day without losing your momentum.</Text>
        </View>

        {/* Quote Section */}
        <View style={styles.quoteSection}>
          <MaterialIcons name="format-quote" size={32} color="#775a19" style={{ opacity: 0.5, marginBottom: 12 }} />
          <Text style={styles.quoteText}>
            "Consistency is not a chain of burdens, but a tapestry of character woven one day at a time."
          </Text>
          <Text style={styles.quoteAuthor}>— THE PROTOCOL, SECTION IV</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fbf9f8',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  levelBadge: {
    backgroundColor: '#ffdea5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelBadgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000',
    letterSpacing: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 2,
    textAlign: 'center',
  },
  streakCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    marginBottom: 32,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  streakTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 4,
  },
  streakNext: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
  },
  streakNumber: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 48,
    color: '#775a19',
    lineHeight: 48,
  },
  calendarScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 8,
    paddingTop: 12,
  },
  dayCard: {
    width: 64,
    height: 80,
    backgroundColor: '#f5f3f3',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    marginBottom: 4,
  },
  dayNumber: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    color: '#1b1c1c',
  },
  dayCardActive: {
    width: 64,
    height: 96,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffdea5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  dayCardTransform: {
    transform: [{ translateY: -8 }],
  },
  activeStarWrap: {
    position: 'absolute',
    top: -12,
  },
  dayNameActive: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    marginBottom: 4,
  },
  dayNumberActive: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    color: '#000',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#775a19',
    marginTop: 4,
  },
  dayCardFuture: {
    width: 64,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNameFuture: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    marginBottom: 4,
  },
  dayNumberFuture: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    color: '#75777e',
  },
  sectionHeading: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 2,
    marginBottom: 16,
  },
  benefitCardLeft: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#775a19',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    marginBottom: 16,
  },
  benefitHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  benefitTag: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  benefitTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    marginBottom: 8,
  },
  benefitDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
  },
  benefitCardSolid: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 16,
  },
  benefitHeaderFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  activeTag: {
    backgroundColor: '#ffdea5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  activeTagText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#5d4201',
  },
  quoteSection: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(197, 198, 205, 0.3)',
    paddingTop: 32,
    marginTop: 16,
  },
  quoteText: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#1b1c1c',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 28,
    marginBottom: 16,
  },
  quoteAuthor: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 2,
  }
});
