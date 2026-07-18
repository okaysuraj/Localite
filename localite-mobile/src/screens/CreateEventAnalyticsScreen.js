import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CreateEventAnalyticsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Localite</Text>
        <View style={styles.avatarWrap}>
          {/* Avatar placeholder */}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.preTitle}>CURATED INSIGHTS</Text>
          <Text style={styles.pageTitle}>Event Analytics</Text>
          <View style={styles.titleDivider} />
        </View>

        {/* Interest Score Card */}
        <View style={styles.scoreCard}>
          <Text style={styles.cardLabel}>INTEREST SCORE</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreValue}>8.4</Text>
            <Text style={styles.scoreMax}>/10</Text>
          </View>
          <View style={styles.scoreBottomRow}>
            <View>
              <Text style={styles.scoreTrend}>+12% vs last month</Text>
              <Text style={styles.scoreTag}>High Demand</Text>
            </View>
            <MaterialIcons name="trending-up" size={32} color="rgba(119, 90, 25, 0.2)" />
          </View>
        </View>

        {/* Projected Attendance */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={styles.cardLabel}>PROJECTED ATTENDANCE</Text>
              <Text style={styles.cardMainValue}>450 - 520</Text>
            </View>
            <View style={styles.tagWrap}>
              <Text style={styles.tagText}>PEAK: FRIDAY</Text>
            </View>
          </View>

          {/* Simple Mock Chart */}
          <View style={styles.chartArea}>
            {[40, 55, 45, 70, 95, 80, 60].map((h, i) => (
              <View 
                key={i} 
                style={[
                  styles.chartBar, 
                  { height: `${h}%` },
                  h === 95 && styles.chartBarActive
                ]} 
              />
            ))}
          </View>

          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#775a19' }]} />
              <Text style={styles.legendText}>CONFIRMED</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#e4e2e2' }]} />
              <Text style={styles.legendText}>WAITLISTED</Text>
            </View>
          </View>
        </View>

        {/* Ideal Ticket Price */}
        <View style={styles.darkCard}>
          <Text style={styles.darkCardLabel}>IDEAL TICKET PRICE</Text>
          <View style={styles.darkCardValueRow}>
            <Text style={styles.darkCardValue}>$145</Text>
            <Text style={styles.darkCardValueSub}>Per Guest</Text>
          </View>
          <Text style={styles.darkCardDesc}>Optimized for Elite Tier saturation in the Chelsea District.</Text>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>ADJUST PRICING</Text>
          </TouchableOpacity>
        </View>

        {/* Demographics */}
        <View style={styles.card}>
          <Text style={styles.cardMainValue}>Demographics</Text>
          <View style={styles.demoRow}>
            <View style={styles.demoItem}>
              <View style={[styles.legendDot, { backgroundColor: '#775a19' }]} />
              <Text style={styles.demoLabel}>Elite Members</Text>
            </View>
            <Text style={styles.demoValue}>70%</Text>
          </View>
          <View style={styles.demoRow}>
            <View style={styles.demoItem}>
              <View style={[styles.legendDot, { backgroundColor: '#000' }]} />
              <Text style={styles.demoLabel}>Newcomers</Text>
            </View>
            <Text style={styles.demoValue}>30%</Text>
          </View>
          <View style={styles.quoteWrap}>
            <Text style={styles.quoteText}>“Your audience values exclusive access and artisanal food pairings.”</Text>
          </View>
        </View>

        {/* Recommendation */}
        <View style={styles.recommendationCard}>
          <View style={styles.recHeader}>
            <MaterialIcons name="auto-awesome" size={20} color="#775a19" />
            <Text style={styles.recTitle}>Strategic Recommendation</Text>
          </View>
          <Text style={styles.recDesc}>
            Based on current pre-event momentum, we suggest launching a Limited Early-Access tier for Elite Members. This will likely secure 60% of your revenue goals within the first 48 hours.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="dashboard" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="event" size={24} color="#775a19" />
          <Text style={styles.navTextActive}>EVENTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="payments" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>REVENUE</Text>
        </TouchableOpacity>
      </View>
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
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    letterSpacing: -0.5,
  },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eae8e7',
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  titleSection: {
    marginBottom: 32,
  },
  preTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
    marginBottom: 4,
  },
  pageTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 12,
  },
  titleDivider: {
    width: 48,
    height: 4,
    backgroundColor: '#775a19',
    borderRadius: 2,
  },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(119, 90, 25, 0.05)',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 4,
    marginBottom: 16,
  },
  cardLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
  },
  scoreMax: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#75777e',
    marginLeft: 4,
  },
  scoreBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 16,
  },
  scoreTrend: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
  },
  scoreTag: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(119, 90, 25, 0.05)',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 4,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  cardMainValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  tagWrap: {
    backgroundColor: 'rgba(254, 212, 136, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
  },
  chartArea: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  chartBar: {
    flex: 1,
    backgroundColor: '#efeded',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  chartBarActive: {
    backgroundColor: '#775a19',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#efeded',
    paddingTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  darkCard: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 6,
  },
  darkCardLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#b9c7e4',
    letterSpacing: 1,
    marginBottom: 12,
  },
  darkCardValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 12,
  },
  darkCardValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#fff',
  },
  darkCardValueSub: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#b9c7e4',
  },
  darkCardDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#b9c7e4',
    lineHeight: 20,
    marginBottom: 24,
  },
  actionBtn: {
    backgroundColor: '#fed488',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  actionBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#785a1a',
    letterSpacing: 1,
  },
  demoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  demoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  demoLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000',
  },
  demoValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#775a19',
  },
  quoteWrap: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#efeded',
  },
  quoteText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#75777e',
    fontStyle: 'italic',
  },
  recommendationCard: {
    backgroundColor: 'rgba(254, 212, 136, 0.1)',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(119, 90, 25, 0.2)',
    marginBottom: 24,
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  recTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
  },
  recDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    paddingTop: 16,
    paddingHorizontal: 24,
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(254, 212, 136, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  navText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: 'rgba(68, 71, 77, 0.6)',
    marginTop: 4,
  },
  navTextActive: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    marginTop: 4,
  }
});
