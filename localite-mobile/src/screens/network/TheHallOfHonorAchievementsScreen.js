import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TheHallOfHonorAchievementsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.avatarWrap}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxjBpf-o7Kn4chTVefFEV1C1UsZOGNSqYMGIQUj4AnS-5nr2zI3gz1raDzCevqW--p798V9VMj8NXVL-iHqmXt7HSFUyJ2kD8tucM3g9yMvk0YUNiZxki-GrouVaPL4q9zH7JsjHLBUujuJ06bUYQOprd3xuziVMjeWKELWYPQmrfcJAM0eL8qufDgdCcxQ3axhlpzZC6g_bO68OM0s-i49o0QXn6GsWEGd6Y5ZfAmdq920B7Vrf1Jxg' }} 
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
        
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pagePreTitle}>ACHIEVEMENTS</Text>
          <Text style={styles.pageTitle}>The Hall of Honor</Text>
          <Text style={styles.pageDesc}>
            A record of your distinguished contributions and mastery within the Localite community.
          </Text>
        </View>

        {/* Featured Milestone Card */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredImageWrap}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRQSkqyP6cYiMA3GMdF2j4VxB3OLtVQqWpx07YZCUIik_O_VDLsSsj4iQCD-lYOvWFImDn4nMAuRP9UZfhA8tFczou5af8GGuiJLJ_dlSezngo1iIVK_0qSHXN8k7Rw3F9EAcEmqy0dKykyskQer-T7M9AVGW8rKa5tYla386kofqotB79hePNa7-IoeYw4mW_kIwptjcgdphjDvp-NVEVVABJROhKoZIV52vPbp4RhKdcSXBvN9mpOg' }} 
              style={styles.featuredImage} 
            />
          </View>
          <View style={styles.featuredInfo}>
            <View style={styles.featuredTag}>
              <Text style={styles.featuredTagText}>NEXT MILESTONE</Text>
            </View>
            <Text style={styles.featuredTitle}>Grand Slam Curator</Text>
            <Text style={styles.featuredDesc}>Organize 2 more high-tier tennis events to earn this mark.</Text>
            
            <View style={styles.progressWrap}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '80%' }]} />
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.progressPercent}>80% COMPLETE</Text>
                <Text style={styles.progressText}>8/10 Events</Text>
              </View>
            </View>

            <View style={styles.rewardBox}>
              <Text style={styles.rewardLabel}>REWARD</Text>
              <Text style={styles.rewardValue}>+500 XP</Text>
              <TouchableOpacity style={styles.rewardBtn}>
                <Text style={styles.rewardBtnText}>GO TO HUBS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Achievements Grid */}
        <View style={styles.gridContainer}>
          
          {/* Unlocked 1 */}
          <View style={styles.gridItem}>
            <View style={styles.medalWrap}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb578-grgUZxGsSZAXYO8fsiG3wQeWj-XZdyKXTOf8LtoeDHyyfedype7cjxSMSGfFLlasjC25qca-y-a5StltqNagJHrEs3TBrxBy_izt1E5kCgbGNmVi_dRTVLuZ1_6sEJ94FxAUmhRoYhCTvZvgknqnXv-Ys23EdM0tluPfpiuP0m23xAgtUSWASeTHVuFl6ZMfOhMfHwEnz43iZhSb_7UbWmBZtEhpP2jPxVJUh3AWz5XU8ePrUQ' }} 
                style={styles.medalImg} 
              />
            </View>
            <Text style={styles.medalTitle}>Master of the Court</Text>
            <Text style={styles.medalRankGold}>GOLD RANK</Text>
            <Text style={styles.medalDate}>UNLOCKED JAN 2024</Text>
          </View>

          {/* Unlocked 2 */}
          <View style={styles.gridItem}>
            <View style={styles.medalWrap}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLsb-Q4IEVWHjH7LUGpToCb0dwuvX1PunM2VgT6tzepCluvsdHmKojblHAJA6NNSzxXnkkx1wBWB3I2flqqZAFAK408DYYWREP-PbfPd7AwTVQBjce9LNi2f8KNkr8K02fb-YONwS3a48tMwuTuT3YXc_y3M2WQdjDwoTIV2VguxLDbdux-aX32CBb3ujmYF-81p7i4P79r4E54lfY_ayzG48l5r3HuDCigwkDkOaoGFYHRFFXV7KX_g' }} 
                style={styles.medalImg} 
              />
            </View>
            <Text style={styles.medalTitle}>Elite Host</Text>
            <Text style={styles.medalRankSilver}>SILVER RANK</Text>
            <Text style={styles.medalDate}>UNLOCKED MAR 2024</Text>
          </View>

          {/* Unlocked 3 */}
          <View style={styles.gridItem}>
            <View style={styles.medalWrap}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZi9PIJ3K__5Lb_TOYsocutsVVcXmAHo26m6KhVnqs-XxQ5b8Io7yIGEa4g71R-z8EBLW6s3jqxzM7H3CyPbeRgnzzyeIYNfJg-YWKp0d5b5fC8TypaTBwt8DFcwzJKmeyZyeZoxPIFlqjR8pRdkCTuKlCufxYebGDRmp7loxGnI3tsz5jbfgxM45-Kwwq3cVUB6xLLGmEhNXnd4mgEmq_bI8awCL2lM-JqKZao4z8JCHPyF5yklRhvg' }} 
                style={styles.medalImg} 
              />
            </View>
            <Text style={styles.medalTitle}>Constant Companion</Text>
            <Text style={styles.medalRankBronze}>BRONZE RANK</Text>
            <Text style={styles.medalDate}>UNLOCKED APR 2024</Text>
          </View>

          {/* Locked 1 */}
          <View style={styles.gridItemLocked}>
            <View style={styles.medalWrapLocked}>
              <MaterialIcons name="lock" size={24} color="#75777e" />
            </View>
            <Text style={styles.medalTitleLocked}>Social Catalyst</Text>
            <Text style={styles.medalRankLocked}>LOCKED</Text>
            <Text style={styles.medalDateLocked}>INITIATE 5 GROUP TALKS</Text>
          </View>

        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>TOTAL BADGES</Text>
            <Text style={styles.statValue}>12 / 48</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>GLOBAL RANK</Text>
            <Text style={styles.statValueAlt}>Top 5%</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>PRESTIGE POINTS</Text>
            <Text style={styles.statValue}>4,850</Text>
          </View>
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
    gap: 8,
  },
  iconBtn: { padding: 4 },
  avatarWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
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
    fontSize: 20,
    color: '#000',
    fontStyle: 'italic',
  },
  levelBadge: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelBadgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    letterSpacing: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  pageHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  pagePreTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
    marginBottom: 8,
  },
  pageTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  pageDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#eae8e7',
    overflow: 'hidden',
  },
  featuredImageWrap: {
    width: '100%',
    height: 160,
    backgroundColor: '#fbf9f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  featuredInfo: {
    padding: 20,
    alignItems: 'center',
  },
  featuredTag: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  featuredTagText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#e9c176',
    letterSpacing: 1,
  },
  featuredTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  featuredDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressWrap: {
    width: '100%',
    marginBottom: 20,
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: '#eae8e7',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#775a19',
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressPercent: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  progressText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000',
    letterSpacing: 1,
  },
  rewardBox: {
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    paddingTop: 16,
  },
  rewardLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  rewardValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#775a19',
    marginBottom: 16,
  },
  rewardBtn: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  rewardBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    letterSpacing: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eae8e7',
    marginBottom: 16,
  },
  medalWrap: {
    width: 64,
    height: 64,
    marginBottom: 12,
  },
  medalImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  medalTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  medalRankGold: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
    marginBottom: 8,
  },
  medalRankSilver: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 8,
  },
  medalRankBronze: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#b9c7e4',
    letterSpacing: 1,
    marginBottom: 8,
  },
  medalDate: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#75777e',
    letterSpacing: 1,
  },
  gridItemLocked: {
    width: '48%',
    backgroundColor: '#f5f3f3',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c5c6cd',
    borderStyle: 'dashed',
    marginBottom: 16,
    opacity: 0.7,
  },
  medalWrapLocked: {
    width: 64,
    height: 64,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medalTitleLocked: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#75777e',
    textAlign: 'center',
    marginBottom: 4,
  },
  medalRankLocked: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 8,
  },
  medalDateLocked: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#75777e',
    letterSpacing: 1,
    textAlign: 'center',
  },
  statsSection: {
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    paddingTop: 24,
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
  },
  statValueAlt: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#775a19',
  }
});
