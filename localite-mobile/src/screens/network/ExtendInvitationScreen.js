import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ExtendInvitationScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>LVL 24</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroLabel}>THE INNER CIRCLE</Text>
          <Text style={styles.heroTitle}>Extend the Invitation</Text>
          <Text style={styles.heroDesc}>
            A curated community grows by invitation only.
          </Text>
        </View>

        {/* Referral Code Card */}
        <View style={styles.referralCard}>
          <View style={styles.glow} />
          <View style={styles.referralContent}>
            <Text style={styles.referralLabel}>YOUR PERSONAL CIPHER</Text>
            
            <View style={styles.codeWrap}>
              <Text style={styles.codeText} selectable>LOCAL-MARQUIS-24</Text>
              <TouchableOpacity style={styles.copyBtn}>
                <MaterialIcons name="content-copy" size={20} color="#775a19" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.referralDesc}>
              Share this unique code with those who embody the modern nobility of our gathering.
            </Text>
            
            <TouchableOpacity style={styles.shareBtn}>
              <Text style={styles.shareBtnText}>SHARE INVITATION</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Tracker */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>Successful Attestations</Text>
              <Text style={styles.progressLabel}>2 of 3 Verified</Text>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressNumber}>2</Text>
            </View>
          </View>
          
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '66%' }]} />
          </View>
          
          <View style={styles.progressAvatars}>
            <View style={styles.avatarItem}>
              <MaterialIcons name="verified-user" size={20} color="#775a19" />
              <Text style={styles.avatarName}>Julian V.</Text>
            </View>
            <View style={styles.avatarItem}>
              <MaterialIcons name="verified-user" size={20} color="#775a19" />
              <Text style={styles.avatarName}>Elena R.</Text>
            </View>
            <View style={[styles.avatarItem, { opacity: 0.4 }]}>
              <MaterialIcons name="pending" size={20} color="#75777e" />
              <Text style={styles.avatarName}>Pending</Text>
            </View>
          </View>
        </View>

        {/* Reward Tiers */}
        <View style={styles.tiersSection}>
          <Text style={styles.tiersTitle}>Tiers of Influence</Text>
          
          <View style={styles.tiersGrid}>
            {/* Tier 1 */}
            <View style={styles.tierCard}>
              <View style={styles.tierTop}>
                <MaterialIcons name="workspace-premium" size={32} color="#775a19" />
                <View style={styles.badgeClaimed}>
                  <Text style={styles.badgeClaimedText}>CLAIMED</Text>
                </View>
              </View>
              <Text style={styles.tierName}>Sovereign Entry</Text>
              <Text style={styles.tierDesc}>Unlock early access to curated salon evenings.</Text>
              <Text style={styles.tierReq}>1 INVITE</Text>
            </View>
            
            {/* Tier 2 */}
            <View style={styles.tierCardActive}>
              <View style={styles.tierTop}>
                <MaterialIcons name="military-tech" size={32} color="#e9c176" />
                <View style={styles.badgeProgress}>
                  <Text style={styles.badgeProgressText}>IN PROGRESS</Text>
                </View>
              </View>
              <Text style={styles.tierNameActive}>Elite Status</Text>
              <Text style={styles.tierDescActive}>Waved entry fees and private concierge for all localite hubs.</Text>
              
              <View style={styles.tierBottomActive}>
                <Text style={styles.tierReqActive}>3 INVITES</Text>
                <MaterialIcons name="lock" size={16} color="rgba(255, 255, 255, 0.5)" />
              </View>
            </View>
          </View>
          
          {/* Tier 3 */}
          <View style={styles.tierCardFuture}>
            <View style={styles.tierFutureLeft}>
              <MaterialIcons name="stadium" size={36} color="#44474d" />
              <View style={styles.tierFutureText}>
                <Text style={styles.tierNameFuture}>Patron Circle</Text>
                <Text style={styles.tierDescFuture}>Lifetime platform access and limited edition physical token.</Text>
              </View>
            </View>
            <Text style={styles.tierReqFuture}>10 INVITES</Text>
          </View>
        </View>

        {/* Fine Print */}
        <View style={styles.finePrint}>
          <Text style={styles.finePrintText}>
            Invitations are non-transferable.{'\n'}
            All guests must undergo the standard vetting process for full activation.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
          <MaterialIcons name="grid-view" size={24} color="#44474d" />
          <Text style={styles.navLabel}>Hubs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="calendar-today" size={24} color="#44474d" />
          <Text style={styles.navLabel}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="group" size={24} color="#44474d" />
          <Text style={styles.navLabel}>Social</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="person" size={24} color="#775a19" />
          <Text style={styles.navLabelActive}>Profile</Text>
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
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    letterSpacing: -0.5,
  },
  levelBadge: {
    backgroundColor: 'rgba(254, 212, 136, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  levelText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100, // Space for bottom nav
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
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
    fontSize: 32,
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0.8,
  },
  referralCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#eae8e7',
    marginBottom: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: -48,
    right: -48,
    width: 128,
    height: 128,
    backgroundColor: 'rgba(254, 212, 136, 0.2)',
    borderRadius: 64,
  },
  referralContent: {
    position: 'relative',
    zIndex: 1,
    alignItems: 'center',
  },
  referralLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 2,
    marginBottom: 16,
  },
  codeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fbf9f8',
    borderWidth: 1,
    borderColor: 'rgba(119, 90, 25, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
    gap: 12,
  },
  codeText: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    letterSpacing: 2,
  },
  copyBtn: {
    padding: 4,
  },
  referralDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 24,
  },
  shareBtn: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  progressSection: {
    marginBottom: 32,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  progressTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    marginBottom: 4,
  },
  progressLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#775a19',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressNumber: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 16,
    color: '#000',
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#eae8e7',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#775a19',
    borderRadius: 4,
  },
  progressAvatars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarItem: {
    alignItems: 'center',
    gap: 4,
  },
  avatarName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
  },
  tiersSection: {
    marginBottom: 32,
  },
  tiersTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    marginBottom: 16,
  },
  tiersGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  tierCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eae8e7',
  },
  tierTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  badgeClaimed: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeClaimedText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#000',
  },
  tierName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#000',
    marginBottom: 8,
  },
  tierDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
    marginBottom: 16,
  },
  tierReq: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  tierCardActive: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'rgba(119, 90, 25, 0.5)',
  },
  badgeProgress: {
    backgroundColor: '#775a19',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeProgressText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#000',
  },
  tierNameActive: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  tierDescActive: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 16,
  },
  tierBottomActive: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tierReqActive: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#ffdea5',
    letterSpacing: 1,
  },
  tierCardFuture: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(234, 232, 231, 0.5)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    borderStyle: 'dashed',
    opacity: 0.6,
  },
  tierFutureLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  tierFutureText: {
    flex: 1,
  },
  tierNameFuture: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 16,
    color: '#000',
  },
  tierDescFuture: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 10,
    color: '#44474d',
  },
  tierReqFuture: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  },
  finePrint: {
    alignItems: 'center',
    paddingTop: 16,
  },
  finePrintText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: 16,
    textTransform: 'uppercase',
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
