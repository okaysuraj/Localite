import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MyActivityStatsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="location-on" size={24} color="#000" />
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.profileBtn}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-Xe0uRqNil6OUUkIU88qUX7Mo9MAIlOSDNuNE5rF2QNruHLEwpNLM1CEodOXTOwrsFzRTwFbaEvt3daim3whsaNR6KTcEWypjkihanw41ZChn4xhm7fgyNvCmhk0y6QKRdnrml_zB-ktJP6GgNEcByvsnF0IhkpL9wEb54dfl10Q7OxykM6n-9U9kOl3zcuGFJz_-IBTNfrAg45-jupB7ORqYqQPe90qI7SJf4nEvRYouE0vmKYi5kA' }} 
              style={styles.profileImg} 
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageLabel}>MEMBER DASHBOARD</Text>
          <Text style={styles.pageTitle}>Your Engagement</Text>
          <TouchableOpacity style={styles.downloadBtn}>
            <Text style={styles.downloadBtnText}>DOWNLOAD REPORT</Text>
          </TouchableOpacity>
        </View>

        {/* KPI Grid */}
        <View style={styles.kpiGrid}>
          {/* Events Attended */}
          <View style={styles.kpiCard}>
            <View style={styles.kpiTop}>
              <View style={styles.kpiIconWrap}>
                <MaterialIcons name="event-available" size={20} color="#775a19" />
              </View>
              <View style={styles.badgeSuccess}>
                <Text style={styles.badgeSuccessText}>+12%</Text>
              </View>
            </View>
            <Text style={styles.kpiLabel}>EVENTS ATTENDED</Text>
            <Text style={styles.kpiValue}>42</Text>
          </View>

          {/* Events Hosted */}
          <View style={styles.kpiCard}>
            <View style={styles.kpiTop}>
              <View style={styles.kpiIconWrap}>
                <MaterialIcons name="campaign" size={20} color="#775a19" />
              </View>
              <View style={styles.badgePrimary}>
                <Text style={styles.badgePrimaryText}>Pro Tier</Text>
              </View>
            </View>
            <Text style={styles.kpiLabel}>EVENTS HOSTED</Text>
            <Text style={styles.kpiValue}>08</Text>
          </View>
        </View>

        <View style={styles.kpiGrid}>
          {/* Connections Made */}
          <View style={styles.kpiCard}>
            <View style={styles.kpiTop}>
              <View style={styles.kpiIconWrap}>
                <MaterialIcons name="group-add" size={20} color="#775a19" />
              </View>
              <View style={styles.badgeSuccess}>
                <Text style={styles.badgeSuccessText}>+154</Text>
              </View>
            </View>
            <Text style={styles.kpiLabel}>CONNECTIONS MADE</Text>
            <Text style={styles.kpiValue}>284</Text>
          </View>

          {/* Hubs Joined */}
          <View style={styles.kpiCard}>
            <View style={styles.kpiTop}>
              <View style={styles.kpiIconWrap}>
                <MaterialIcons name="hub" size={20} color="#775a19" />
              </View>
              <View style={styles.badgeNeutral}>
                <Text style={styles.badgeNeutralText}>Active</Text>
              </View>
            </View>
            <Text style={styles.kpiLabel}>HUBS JOINED</Text>
            <Text style={styles.kpiValue}>15</Text>
          </View>
        </View>

        {/* Activity Chart (Simplified UI) */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Activity Overview</Text>
              <Text style={styles.chartSubtitle}>Comparison of hosting vs attending over the last 6 months.</Text>
            </View>
          </View>
          
          <View style={styles.chartArea}>
            {/* Simple Bar Chart Mockup */}
            <View style={styles.chartCol}>
              <View style={styles.barsWrap}>
                <View style={[styles.barPrimary, { height: '40%' }]} />
                <View style={[styles.barSecondary, { height: '20%' }]} />
              </View>
              <Text style={styles.chartMonth}>JAN</Text>
            </View>
            <View style={styles.chartCol}>
              <View style={styles.barsWrap}>
                <View style={[styles.barPrimary, { height: '65%' }]} />
                <View style={[styles.barSecondary, { height: '35%' }]} />
              </View>
              <Text style={styles.chartMonth}>FEB</Text>
            </View>
            <View style={styles.chartCol}>
              <View style={styles.barsWrap}>
                <View style={[styles.barPrimary, { height: '50%' }]} />
                <View style={[styles.barSecondary, { height: '45%' }]} />
              </View>
              <Text style={styles.chartMonth}>MAR</Text>
            </View>
            <View style={styles.chartCol}>
              <View style={styles.barsWrap}>
                <View style={[styles.barPrimary, { height: '85%' }]} />
                <View style={[styles.barSecondary, { height: '60%' }]} />
              </View>
              <Text style={styles.chartMonth}>APR</Text>
            </View>
            <View style={styles.chartCol}>
              <View style={styles.barsWrap}>
                <View style={[styles.barPrimary, { height: '70%' }]} />
                <View style={[styles.barSecondary, { height: '30%' }]} />
              </View>
              <Text style={styles.chartMonth}>MAY</Text>
            </View>
            <View style={styles.chartCol}>
              <View style={styles.barsWrap}>
                <View style={[styles.barPrimary, { height: '95%' }]} />
                <View style={[styles.barSecondary, { height: '75%' }]} />
              </View>
              <Text style={styles.chartMonth}>JUN</Text>
            </View>
          </View>

          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#000' }]} />
              <Text style={styles.legendText}>Events Attended</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#775a19' }]} />
              <Text style={styles.legendText}>Events Hosted</Text>
            </View>
          </View>
        </View>

        {/* Top Performing Hubs */}
        <View style={styles.hubsSection}>
          <View style={styles.hubsHeader}>
            <Text style={styles.hubsTitle}>Top Performing Hubs</Text>
            <TouchableOpacity>
              <Text style={styles.hubsLink}>Browse More Hubs</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.hubCard}>
            <View style={styles.hubImageWrap}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA29wfZB7dGleVI3Z2uHhTS1QokVdxgwnkDSFwGbpWVYiKcx57oVbYBVAmPzwo4J5yp3zhOsWLA77putSyuvfMd6FBQvB626KzgsZM5hqnximJKrC4okZcDLiFBsabpLq3Ol1q1uDWl3YYLsPOkOhoxusneU8omOnfz7YRBsOGnvWZWB2EtPO6zK3vf9NWOP5mEJ2AOoBJXHoHcZYY6oTb_zCftruuvz2BGUAz-7RcEHcJdcUpl0fRByQ' }} 
                style={styles.hubImage} 
              />
              <View style={styles.hubBadge}>
                <Text style={styles.hubBadgeText}>TOP 1% PARTICIPANT</Text>
              </View>
            </View>
            <View style={styles.hubInfo}>
              <Text style={styles.hubName}>Urban Sophisticates</Text>
              <View style={styles.hubStats}>
                <Text style={styles.hubStatText}>12 Events Attended</Text>
                <Text style={styles.hubStatLevel}>Level 4 Member</Text>
              </View>
            </View>
          </View>

          <View style={styles.hubCard}>
            <View style={styles.hubImageWrap}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBniztRbFJxdHbU0xmNuGK2fqJj1CYatFddEscU_dPMqckZiqLtmHECHXE9NVqdN2DB7MctysU-oEMDGJ1EE7KwbDIEHBY1D2_uwq3nNIJCiruqKg2WzxPAnI5z8Lc-slsoz_5RrUBxc6ytV_bDopZeGntsUjamZpvnutZnONQf93oaOVeA6_6wJATAziGGT176wg-FxjQ8VTR6bS-9y-KPp31G3xcFhR6MStfq3BW5j0w94S-2b4xauw' }} 
                style={styles.hubImage} 
              />
            </View>
            <View style={styles.hubInfo}>
              <Text style={styles.hubName}>Elite Athletics Club</Text>
              <View style={styles.hubStats}>
                <Text style={styles.hubStatText}>8 Events Attended</Text>
                <Text style={styles.hubStatLevel}>Level 2 Member</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="explore" size={24} color="#44474d" />
          <Text style={styles.navLabel}>Hubs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="event-note" size={24} color="#44474d" />
          <Text style={styles.navLabel}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="insights" size={24} color="#775a19" />
          <Text style={styles.navLabelActive}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="group" size={24} color="#44474d" />
          <Text style={styles.navLabel}>Social</Text>
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
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    paddingBottom: 16,
    backgroundColor: '#fbf9f8',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    overflow: 'hidden',
    backgroundColor: '#e4e2e2',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120, // Space for fab and bottom nav
  },
  pageHeader: {
    marginBottom: 24,
  },
  pageLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
    marginBottom: 8,
  },
  pageTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 36,
    color: '#000',
    marginBottom: 16,
  },
  downloadBtn: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  downloadBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    letterSpacing: 1,
  },
  kpiGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
  },
  kpiTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  kpiIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#efeded',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeSuccess: {
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeSuccessText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#16a34a',
  },
  badgePrimary: {
    backgroundColor: 'rgba(254, 212, 136, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgePrimaryText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
  },
  badgeNeutral: {
    backgroundColor: '#e4e2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeNeutralText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
  },
  kpiLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    marginBottom: 4,
  },
  kpiValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000',
  },
  chartSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
    marginBottom: 24,
  },
  chartHeader: {
    marginBottom: 24,
  },
  chartTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 200,
    alignItems: 'flex-end',
    marginBottom: 24,
    paddingTop: 20,
  },
  chartCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    gap: 12,
  },
  barsWrap: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 4,
  },
  barPrimary: {
    width: 12,
    backgroundColor: '#000',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  barSecondary: {
    width: 12,
    backgroundColor: '#775a19',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  chartMonth: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e4e2e2',
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
    color: '#44474d',
  },
  hubsSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
  },
  hubsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  hubsTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
  },
  hubsLink: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    textDecorationLine: 'underline',
  },
  hubCard: {
    borderWidth: 1,
    borderColor: '#e4e2e2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  hubImageWrap: {
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
  },
  hubImage: {
    width: '100%',
    height: '100%',
  },
  hubBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  hubBadgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#fff',
  },
  hubName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  hubStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hubStatText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
  },
  hubStatLevel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
  },
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 80,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#775a19',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 8,
    zIndex: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e4e2e2',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 10,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navItemActive: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
  },
  navLabelActive: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
  }
});
