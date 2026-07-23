import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function OrganizerDashboardScreen() {
  const navigation = useNavigation();

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
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw4OwSAInhKbSwUq0NWC-ucVyvod4lsSoMJMwkxPc0GdS9CD-51Q6t0lnarpJsQtBeq0mcYSllPR395oSm8QwX6pCPOeUiH6rq5qILDOXV3fzmOaRohIHnRtgAhHfTsJsBPUmo-RKO7yyeUQllxofMyu3qH6orTiYLHIuCOsP7QiatIFAeE5XZnQ2MeRy0WGp0Q9B9uOgmT2FIj1EDmKipj86EhU9vjNGgXAwvXafnVEjI_6TbnXfkVA' }}
            style={styles.avatarImg}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.preTitle}>HOST DASHBOARD</Text>
          <Text style={styles.pageTitle}>Good Morning, Alexander</Text>
          <Text style={styles.welcomeDesc}>Your upcoming Polo match event has 12 new applicants today. Here is the overview of your curated community.</Text>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeaderRow}>
              <MaterialIcons name="dashboard" size={20} color="#775a19" />
              <View style={styles.metricBadge}>
                <Text style={styles.metricBadgeText}>+2 Today</Text>
              </View>
            </View>
            <Text style={styles.metricLabel}>ACTIVE EVENTS</Text>
            <Text style={styles.metricValue}>08</Text>
            <View style={styles.metricFooter}>
              <Text style={styles.metricFooterText}>3 private matches, 5 socials</Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeaderRow}>
              <MaterialIcons name="groups" size={20} color="#775a19" />
              <View style={styles.metricBadge}>
                <Text style={styles.metricBadgeText}>+14%</Text>
              </View>
            </View>
            <Text style={styles.metricLabel}>TOTAL ATTENDEES</Text>
            <Text style={styles.metricValue}>1,248</Text>
            <View style={styles.metricFooter}>
              <Text style={styles.metricFooterText}>Verified elite network</Text>
            </View>
          </View>

          <View style={[styles.metricCard, styles.metricCardDark]}>
            <View style={styles.metricHeaderRow}>
              <MaterialIcons name="payments" size={20} color="#fed488" />
            </View>
            <Text style={[styles.metricLabel, { color: '#b9c7e4' }]}>RECENT REVENUE</Text>
            <Text style={[styles.metricValue, { color: '#ffdea5' }]}>€14,820</Text>
            <View style={[styles.metricFooter, { borderTopColor: '#39475f' }]}>
              <Text style={[styles.metricFooterText, { color: '#b9c7e4' }]}>Month-to-date settlements</Text>
            </View>
          </View>
        </View>

        {/* Tasks Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>VIEW CALENDAR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.taskList}>
          <TouchableOpacity style={styles.taskItem}>
            <View style={styles.taskIconWrap}>
              <MaterialIcons name="assignment-turned-in" size={20} color="#000" />
            </View>
            <View style={styles.taskBody}>
              <Text style={styles.taskTitle}>Finalize Guest List for Polo Match</Text>
              <Text style={styles.taskDesc}>Deadline: Today at 4:00 PM • 12 pending reviews</Text>
            </View>
            <View style={styles.taskBtn}>
              <Text style={styles.taskBtnText}>START</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.taskItem}>
            <View style={styles.taskIconWrap}>
              <MaterialIcons name="mark-chat-unread" size={20} color="#000" />
            </View>
            <View style={styles.taskBody}>
              <Text style={styles.taskTitle}>Approve 3 Message Requests</Text>
              <Text style={styles.taskDesc}>Urgent: Partnership inquiries for Summer Soirée</Text>
            </View>
            <View style={styles.taskBtn}>
              <Text style={styles.taskBtnText}>VIEW</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityCard}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            
            <View style={styles.activityRow}>
              <View style={[styles.activityDot, { backgroundColor: '#775a19' }]} />
              <View style={styles.activityBody}>
                <Text style={styles.activityTitle}>Premium Booking</Text>
                <Text style={styles.activityDesc}>Julian S. joined 'Wine Degustation'</Text>
                <Text style={styles.activityTime}>2 MINS AGO</Text>
              </View>
            </View>

            <View style={styles.activityRow}>
              <View style={[styles.activityDot, { backgroundColor: '#fed488' }]} />
              <View style={styles.activityBody}>
                <Text style={styles.activityTitle}>New Partnership Request</Text>
                <Text style={styles.activityDesc}>Veuve Clicquot sent a message</Text>
                <Text style={styles.activityTime}>45 MINS AGO</Text>
              </View>
            </View>

          </View>
          <TouchableOpacity style={styles.reportBtn}>
            <Text style={styles.reportBtnText}>DOWNLOAD REVENUE REPORT</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Asset */}
        <View style={styles.featuredAsset}>
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredPre}>NETWORK INSIGHTS</Text>
            <Text style={styles.featuredTitle}>Elevate your next gathering.</Text>
            <Text style={styles.featuredDesc}>Use our new AI-driven seat mapping tool to optimize guest interactions.</Text>
            <TouchableOpacity style={styles.featuredBtn}>
              <Text style={styles.featuredBtnText}>EXPLORE TOOL</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateEventBasicInfo')}>
        <MaterialIcons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="dashboard" size={24} color="#775a19" />
          <Text style={styles.navTextActive}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('EventsList')}>
          <MaterialIcons name="event" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>EVENTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RevenueDashboard')}>
          <MaterialIcons name="payments" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>REVENUE</Text>
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
    borderWidth: 2,
    borderColor: 'rgba(254, 212, 136, 0.3)',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  welcomeSection: {
    marginBottom: 24,
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
    marginBottom: 8,
  },
  welcomeDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
  },
  metricsGrid: {
    gap: 16,
    marginBottom: 32,
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(254, 212, 136, 0.2)',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  metricCardDark: {
    backgroundColor: '#000',
    borderBottomColor: '#000',
  },
  metricHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricBadge: {
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  metricBadgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#16a34a',
  },
  metricLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  metricValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 16,
  },
  metricFooter: {
    borderTopWidth: 1,
    borderTopColor: '#efeded',
    paddingTop: 12,
  },
  metricFooterText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
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
  taskList: {
    gap: 12,
    marginBottom: 32,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#775a19',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  taskIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#efeded',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  taskBody: {
    flex: 1,
  },
  taskTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  taskDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
  },
  taskBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 12,
  },
  taskBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
  },
  activityCard: {
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e4e2e2',
    marginBottom: 32,
  },
  activityList: {
    marginTop: 24,
    gap: 24,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  activityBody: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000',
  },
  activityDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
    marginTop: 2,
  },
  activityTime: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    marginTop: 4,
    letterSpacing: 1,
  },
  reportBtn: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: 'rgba(254, 212, 136, 0.1)',
    borderWidth: 1,
    borderColor: '#775a19',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  reportBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  featuredAsset: {
    height: 200,
    borderRadius: 12,
    backgroundColor: '#000', // Mock gradient start
    overflow: 'hidden',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  featuredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 24,
    justifyContent: 'center',
  },
  featuredPre: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#ffdea5',
    letterSpacing: 1,
    marginBottom: 8,
  },
  featuredTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
  },
  featuredDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#b9c7e4',
    marginBottom: 16,
  },
  featuredBtn: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  featuredBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000',
  },
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 90,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 20,
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
