import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Animated, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RevenueDashboardScreen() {
  const navigation = useNavigation();
  const [animValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const getBarHeight = (percentage) => {
    return animValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', `${percentage}%`]
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.openDrawer && navigation.openDrawer()} style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileSetupFinalSteps')} style={styles.avatarWrap}>
          <MaterialIcons name="person" size={24} color="#775a19" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Total Earnings */}
        <View style={styles.earningsSection}>
          <View>
            <Text style={styles.earningsLabel}>TOTAL EARNINGS</Text>
            <Text style={styles.earningsTotal}>$24,850.00</Text>
          </View>
          <View style={styles.trendWrap}>
            <MaterialIcons name="trending-up" size={16} color="#775a19" />
            <Text style={styles.trendText}>+12.4% from last month</Text>
          </View>
        </View>

        {/* Premium Bar Graph */}
        <View style={styles.graphCard}>
          <View style={styles.graphContainer}>
            {[ 
              { month: 'JAN', height: 60, color: 'rgba(119, 90, 25, 0.4)' },
              { month: 'FEB', height: 45, color: 'rgba(119, 90, 25, 0.4)' },
              { month: 'MAR', height: 75, color: 'rgba(119, 90, 25, 0.6)' },
              { month: 'APR', height: 90, color: '#000' },
              { month: 'MAY', height: 55, color: 'rgba(119, 90, 25, 0.4)' },
              { month: 'JUN', height: 70, color: 'rgba(119, 90, 25, 0.5)' }
            ].map((item, idx) => (
              <View key={idx} style={styles.graphBarCol}>
                <View style={styles.graphBarBg}>
                  <Animated.View style={[styles.graphBarFill, { height: getBarHeight(item.height), backgroundColor: item.color }]} />
                </View>
                <Text style={[styles.graphMonth, item.month === 'APR' && styles.graphMonthActive]}>{item.month}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Revenue Breakdown */}
        <View style={styles.breakdownGrid}>
          {/* Ticket Sales */}
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownHeader}>
              <MaterialIcons name="confirmation-number" size={20} color="#775a19" />
              <Text style={styles.breakdownLabel}>TICKET SALES</Text>
            </View>
            <Text style={styles.breakdownValue}>$18,420</Text>
            <Text style={styles.breakdownDesc}>74% of total revenue</Text>
          </View>

          {/* Add-ons */}
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownHeader}>
              <MaterialIcons name="stars" size={20} color="#775a19" />
              <Text style={styles.breakdownLabel}>ADD-ONS</Text>
            </View>
            <Text style={styles.breakdownValue}>$4,120</Text>
            <Text style={styles.breakdownDesc}>VIP & Concierge services</Text>
          </View>

          {/* Tips */}
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownHeader}>
              <MaterialIcons name="volunteer-activism" size={20} color="#775a19" />
              <Text style={styles.breakdownLabel}>TIPS/GRADES</Text>
            </View>
            <Text style={styles.breakdownValue}>$2,310</Text>
            <Text style={styles.breakdownDesc}>Host appreciation</Text>
          </View>
        </View>

        {/* Recent Payouts */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Payouts</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>EXPORT CSV</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.payoutsCard}>
          <View style={styles.payoutHeaderRow}>
            <Text style={[styles.payoutCol, { flex: 1.5 }]}>DATE</Text>
            <Text style={[styles.payoutCol, { flex: 1 }]}>AMOUNT</Text>
            <Text style={[styles.payoutCol, { flex: 1, textAlign: 'right' }]}>STATUS</Text>
          </View>
          
          {[
            { date: 'Oct 14, 2023', amount: '$4,250.00', status: 'Processing', processing: true },
            { date: 'Oct 07, 2023', amount: '$3,840.00', status: 'Deposited', processing: false },
            { date: 'Sep 30, 2023', amount: '$5,110.00', status: 'Deposited', processing: false },
            { date: 'Sep 23, 2023', amount: '$2,950.00', status: 'Deposited', processing: false },
          ].map((item, idx) => (
            <View key={idx} style={styles.payoutRow}>
              <Text style={[styles.payoutDataText, { flex: 1.5 }]}>{item.date}</Text>
              <Text style={[styles.payoutDataBold, { flex: 1 }]}>{item.amount}</Text>
              <View style={[styles.statusWrap, { flex: 1, alignItems: 'flex-end' }]}>
                <View style={[styles.statusBadge, item.processing ? styles.statusBadgeProcessing : styles.statusBadgeSuccess]}>
                  <Text style={[styles.statusText, item.processing ? styles.statusTextProcessing : styles.statusTextSuccess]}>{item.status}</Text>
                </View>
              </View>
            </View>
          ))}
          
          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllBtnText}>VIEW ALL HISTORY</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('OrganizerDashboard')}>
          <MaterialIcons name="dashboard" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('EventsList')}>
          <MaterialIcons name="event" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>EVENTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="payments" size={24} color="#775a19" />
          <Text style={styles.navTextActive}>REVENUE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MyProfilePublicView')}>
          <MaterialIcons name="person" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>PROFILE</Text>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    letterSpacing: -0.5,
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(254, 212, 136, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  earningsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  earningsLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  earningsTotal: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 36,
    color: '#000',
    marginTop: 4,
  },
  trendWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  trendText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#775a19',
  },
  graphCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.2)',
    marginBottom: 32,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  graphContainer: {
    height: 200,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  graphBarCol: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    marginHorizontal: 4,
  },
  graphBarBg: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(119, 90, 25, 0.1)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  graphBarFill: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  graphMonth: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    marginTop: 8,
  },
  graphMonthActive: {
    color: '#000',
  },
  breakdownGrid: {
    gap: 16,
    marginBottom: 32,
  },
  breakdownCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.2)',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  breakdownLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  },
  breakdownValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  breakdownDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 10,
    color: '#75777e',
    marginTop: 8,
    letterSpacing: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  sectionAction: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    textDecorationLine: 'underline',
  },
  payoutsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.2)',
    overflow: 'hidden',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  payoutHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f3f3',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  payoutCol: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
  },
  payoutRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(197, 198, 205, 0.2)',
    alignItems: 'center',
  },
  payoutDataText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#000',
  },
  payoutDataBold: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000',
  },
  statusWrap: {
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusBadgeProcessing: {
    backgroundColor: 'rgba(254, 212, 136, 0.2)',
    borderColor: 'rgba(254, 212, 136, 0.4)',
  },
  statusBadgeSuccess: {
    backgroundColor: '#ecfdf5',
    borderColor: '#d1fae5',
  },
  statusText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
  },
  statusTextProcessing: {
    color: '#785a1a',
  },
  statusTextSuccess: {
    color: '#047857',
  },
  viewAllBtn: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  viewAllBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000',
    letterSpacing: 1,
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
