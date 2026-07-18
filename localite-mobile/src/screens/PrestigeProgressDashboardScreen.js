import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Animated, Easing, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function PrestigeProgressDashboardScreen() {
  const navigation = useNavigation();
  const [animatedValue] = useState(new Animated.Value(0));

  const radius = 90;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = 0.83; // 12450 / 15000 = 83%

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progressPercent * circumference,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [animatedValue, circumference]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, circumference],
    outputRange: [circumference, circumference - (progressPercent * circumference)],
  });

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
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALU9r1nL-VPl_Ty7VdALhkL3zg2fe_6d9JmA3k7AnQdkU0Reuvm0dn0YtLHAdniRzIusYBM-vu9XgLYCI1G5EndgF77Vq0Xp1ChwPRzWZt5iTjg4xEM_n0kT2-bI4DpFk02emPWK27xZiKPZtYIZlfaqIJK_mZUbC4d0FxocyeOhT8rnZJBupAwQW4f3oA38Q5wiMjHd_Ha-ruZVOB3digA_UoZO15pGs3ySYIb360BsXM2kt7F27ctw' }} 
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
          <Text style={styles.heroPreTitle}>YOUR EMINENCE</Text>
          <Text style={styles.heroTitle}>Prestige Progress</Text>
          
          <View style={styles.progressRingContainer}>
            <Svg height="240" width="240" viewBox="0 0 240 240">
              <Circle
                cx="120"
                cy="120"
                r={radius}
                stroke="#efeded"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <AnimatedCircle
                cx="120"
                cy="120"
                r={radius}
                stroke="#775a19"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 120 120)"
              />
            </Svg>
            <View style={styles.progressCenter}>
              <Text style={styles.progressCenterTitle}>CURRENT STATUS</Text>
              <Text style={styles.progressCenterStatus}>Gold Tier</Text>
              <View style={styles.progressCenterXpRow}>
                <Text style={styles.progressCenterXpValue}>12,450</Text>
                <Text style={styles.progressCenterXpTotal}>/ 15,000 XP</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Breakdown Section */}
        <View style={styles.breakdownContainer}>
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownHeader}>
              <MaterialIcons name="workspace-premium" size={20} color="#775a19" />
              <Text style={styles.breakdownTrend}>+12% MoM</Text>
            </View>
            <Text style={styles.breakdownTitle}>SPORTSMANSHIP</Text>
            <Text style={styles.breakdownValue}>4,200 <Text style={styles.breakdownValueUnit}>XP</Text></Text>
            <View style={styles.breakdownBarBg}>
              <View style={[styles.breakdownBarFill, { width: '85%' }]} />
            </View>
          </View>

          <View style={styles.breakdownCard}>
            <View style={styles.breakdownHeader}>
              <MaterialIcons name="celebration" size={20} color="#775a19" />
              <Text style={styles.breakdownTrend}>+8% MoM</Text>
            </View>
            <Text style={styles.breakdownTitle}>HOSTING</Text>
            <Text style={styles.breakdownValue}>3,850 <Text style={styles.breakdownValueUnit}>XP</Text></Text>
            <View style={styles.breakdownBarBg}>
              <View style={[styles.breakdownBarFill, { width: '65%' }]} />
            </View>
          </View>

          <View style={styles.breakdownCard}>
            <View style={styles.breakdownHeader}>
              <MaterialIcons name="groups" size={20} color="#775a19" />
              <Text style={styles.breakdownTrend}>+15% MoM</Text>
            </View>
            <Text style={styles.breakdownTitle}>PARTICIPATION</Text>
            <Text style={styles.breakdownValue}>4,400 <Text style={styles.breakdownValueUnit}>XP</Text></Text>
            <View style={styles.breakdownBarBg}>
              <View style={[styles.breakdownBarFill, { width: '92%' }]} />
            </View>
          </View>
        </View>

        {/* Recent Accolades */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Accolades</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.accoladeRow}>
            <View style={styles.accoladeIconWrap}>
              <MaterialIcons name="stars" size={24} color="#775a19" />
            </View>
            <View style={styles.accoladeInfo}>
              <Text style={styles.accoladeTitle}>Elite Host Award</Text>
              <Text style={styles.accoladeDesc}>Successfully hosted 'Polo & Pimms' Afternoon</Text>
            </View>
            <View style={styles.accoladeRight}>
              <Text style={styles.accoladeXp}>+500 XP</Text>
              <Text style={styles.accoladeTime}>2H AGO</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.accoladeRow}>
            <View style={styles.accoladeIconWrap}>
              <MaterialIcons name="military-tech" size={24} color="#775a19" />
            </View>
            <View style={styles.accoladeInfo}>
              <Text style={styles.accoladeTitle}>Fair Play Medal</Text>
              <Text style={styles.accoladeDesc}>Voted Most Sportsmanlike at Tennis Open</Text>
            </View>
            <View style={styles.accoladeRight}>
              <Text style={styles.accoladeXp}>+250 XP</Text>
              <Text style={styles.accoladeTime}>YESTERDAY</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.accoladeRow}>
            <View style={styles.accoladeIconWrap}>
              <MaterialIcons name="diamond" size={24} color="#775a19" />
            </View>
            <View style={styles.accoladeInfo}>
              <Text style={styles.accoladeTitle}>Golden Circle Participation</Text>
              <Text style={styles.accoladeDesc}>Attended 10 consecutive Hub Gatherings</Text>
            </View>
            <View style={styles.accoladeRight}>
              <Text style={styles.accoladeXp}>+1,200 XP</Text>
              <Text style={styles.accoladeTime}>3 DAYS AGO</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Tier Privileges */}
        <View style={styles.privilegeCard}>
          <View style={styles.privilegeHeader}>
            <View>
              <Text style={styles.privilegeTitle}>Gold Tier Privileges</Text>
              <Text style={styles.privilegeSubtitle}>Benefits unlocked for your current standing.</Text>
            </View>
            <MaterialIcons name="verified" size={40} color="#e9c176" />
          </View>

          <View style={styles.privilegeList}>
            <View style={styles.privilegeItem}>
              <MaterialIcons name="check-circle" size={16} color="#e9c176" style={styles.privilegeIcon} />
              <Text style={styles.privilegeItemText}>Early access to Hub Events</Text>
            </View>
            <View style={styles.privilegeItem}>
              <MaterialIcons name="check-circle" size={16} color="#e9c176" style={styles.privilegeIcon} />
              <Text style={styles.privilegeItemText}>Premium Profile Badging</Text>
            </View>
            <View style={styles.privilegeItem}>
              <MaterialIcons name="check-circle" size={16} color="#e9c176" style={styles.privilegeIcon} />
              <Text style={styles.privilegeItemText}>Priority Waitlist Positioning</Text>
            </View>
            <View style={styles.privilegeItem}>
              <MaterialIcons name="lock" size={16} color="#e9c176" style={[styles.privilegeIcon, { opacity: 0.6 }]} />
              <Text style={[styles.privilegeItemText, { opacity: 0.6 }]}>Elite Hub Access (Platinum)</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.claimBtn}>
            <Text style={styles.claimBtnText}>CLAIM MONTHLY REWARD</Text>
          </TouchableOpacity>
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
    borderColor: '#e9c176',
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
    backgroundColor: '#0d1c32',
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
    padding: 20,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroPreTitle: {
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
    marginBottom: 24,
  },
  progressRingContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCenterTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  progressCenterStatus: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#775a19',
    marginBottom: 4,
  },
  progressCenterXpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  progressCenterXpValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
  },
  progressCenterXpTotal: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  breakdownContainer: {
    gap: 16,
    marginBottom: 32,
  },
  breakdownCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eae8e7',
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  breakdownTrend: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  breakdownTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  breakdownValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 8,
  },
  breakdownValueUnit: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#75777e',
  },
  breakdownBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: '#efeded',
    borderRadius: 2,
    overflow: 'hidden',
  },
  breakdownBarFill: {
    height: '100%',
    backgroundColor: '#775a19',
    borderRadius: 2,
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
    paddingBottom: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
  },
  sectionLink: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  accoladeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  accoladeIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(119, 90, 25, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accoladeInfo: {
    flex: 1,
  },
  accoladeTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000',
    marginBottom: 2,
  },
  accoladeDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
  },
  accoladeRight: {
    alignItems: 'flex-end',
  },
  accoladeXp: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    marginBottom: 4,
  },
  accoladeTime: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#75777e',
    letterSpacing: 1,
  },
  privilegeCard: {
    backgroundColor: '#0d1c32',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  privilegeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  privilegeTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 4,
  },
  privilegeSubtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  privilegeList: {
    gap: 12,
    marginBottom: 24,
  },
  privilegeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  privilegeItemText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#fff',
  },
  claimBtn: {
    backgroundColor: '#e9c176',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
  },
  claimBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#0d1c32',
    letterSpacing: 1,
  }
});
