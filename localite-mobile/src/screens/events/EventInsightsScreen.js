import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Animated, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function EventInsightsScreen() {
  const navigation = useNavigation();
  const [animValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const getWidth = (percentage) => {
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
        <TouchableOpacity style={styles.avatarWrap}>
          <MaterialIcons name="person" size={24} color="#775a19" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Event Header Section */}
        <View style={styles.titleSection}>
          <Text style={styles.preTitle}>PERFORMANCE SUMMARY</Text>
          <Text style={styles.pageTitle}>Gala at The Glass House</Text>
          <View style={styles.dateWrap}>
            <MaterialIcons name="calendar-today" size={14} color="#44474d" />
            <Text style={styles.dateText}>OCTOBER 24, 2023</Text>
          </View>
        </View>

        {/* Engagement Rate Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardLabel}>ENGAGEMENT RATE</Text>
              <Text style={styles.cardTitle}>High Interaction</Text>
            </View>
            <View style={styles.trendBadge}>
              <MaterialIcons name="trending-up" size={16} color="#775a19" />
            </View>
          </View>
          
          <View style={styles.rateRow}>
            <Text style={styles.rateBig}>84<Text style={styles.ratePercent}>%</Text></Text>
            <Text style={styles.rateDesc}>+12% from previous event</Text>
          </View>

          <View style={styles.progressBarBg}>
            <Animated.View style={[styles.progressBarFill, { width: getWidth(84) }]} />
          </View>
        </View>

        <View style={styles.bentoRow}>
          {/* Satisfaction Score Card */}
          <View style={[styles.card, styles.bentoItem]}>
            <Text style={styles.cardLabelCenter}>SATISFACTION</Text>
            <View style={styles.circleGraph}>
              <Text style={styles.circleText}>4.7</Text>
            </View>
            <View style={styles.starsRow}>
              <MaterialIcons name="star" size={14} color="#775a19" />
              <MaterialIcons name="star" size={14} color="#775a19" />
              <MaterialIcons name="star" size={14} color="#775a19" />
              <MaterialIcons name="star" size={14} color="#775a19" />
              <MaterialIcons name="star-half" size={14} color="#775a19" />
            </View>
            <Text style={styles.reviewsText}>98 Reviews</Text>
          </View>

          {/* Safety Feedback Card */}
          <View style={[styles.card, styles.bentoItem, styles.cardDark]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardLabelLight}>SAFETY</Text>
              <MaterialIcons name="verified-user" size={16} color="#fff" />
            </View>
            <Text style={styles.cardTitleLight}>Exemplary</Text>
            <Text style={styles.cardDescLight}>No incidents reported. 100% felt secure.</Text>
          </View>
        </View>

        {/* Detailed Stats */}
        <View style={styles.card}>
          <View style={styles.statsGrid}>
            <View style={styles.statCell}>
              <Text style={styles.statLabel}>ATTENDEES</Text>
              <Text style={styles.statValue}>124</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.statLabel}>NET REVENUE</Text>
              <Text style={styles.statValue}>$12,450</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.statLabel}>AVG TIME</Text>
              <Text style={styles.statValue}>3h 45m</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.statLabel}>REFERRAL RATE</Text>
              <Text style={styles.statValue}>22%</Text>
            </View>
          </View>
        </View>

        {/* Top Moments */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Moments</Text>
          <TouchableOpacity style={styles.outlineBtn}>
            <Text style={styles.outlineBtnText}>VIEW GALLERY</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll} contentContainerStyle={{ paddingRight: 24 }}>
          <View style={styles.galleryItem}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUUJGYMIuSJnop6Y2lu57nBQhudB_JTtz4_I_utFyG2A2PjiXtTalHdKaFsZ7AjtAJiQj1nYcwOJLs6yvaUp_FQO5d-nTGCuw2eTsAounC8jVJq28aya3t0TC_hS6o9paCGeciBEvp6ylOSORLgKewHoGXGaqaEcmNmKQohlRxVJucAlxRHZe9lOWkCaWYyZwSBHhfe7Sn2AIqcQFVFdXoIZlFd8ScCDx_jB4zLpPhG7Ri52SnWYx5wA' }}
              style={styles.galleryImg}
            />
            <View style={styles.galleryOverlay}>
              <Text style={styles.galleryLikes}>42 Likes</Text>
              <Text style={styles.galleryQuote}>"The transition during sunset was the absolute highlight!"</Text>
            </View>
          </View>
          <View style={styles.galleryItem}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf64icVN45KHhZbT-65kg4Hc45GPKaJlAp5frK1AN-GEqnBqn3fbPh2TdWlcjPWCThj8xg0rDRyhCz5zIkc_h5KeDG6qDbYAjLgeML9HcX7Xa0bKe30njKgq1SXR4Y6DM3U3D4LSh0eydAIen_ElTUMsm8sV4Jc9yHNtnAwgWMpN8Upa9KtTO8cuZlwPUbjG4-JncuTQQ-3HAqMSQI38r5IFtA1j7oEAEwlWcLOvICsy3OzerAqzf5_Q' }}
              style={styles.galleryImg}
            />
            <View style={styles.galleryOverlay}>
              <Text style={styles.galleryLikes}>38 Likes</Text>
              <Text style={styles.galleryQuote}>"Stunning table arrangements, truly world-class."</Text>
            </View>
          </View>
        </ScrollView>

        {/* Recommendations */}
        <View style={styles.recommendationsCard}>
          <Text style={styles.sectionTitle}>Strategic Recommendations</Text>
          <View style={styles.recommendList}>
            <View style={styles.recommendRow}>
              <MaterialIcons name="lightbulb" size={20} color="#775a19" />
              <Text style={styles.recommendText}>The cocktail hour transition had the highest social media engagement. Consider extending this segment for the next event.</Text>
            </View>
            <View style={styles.recommendRow}>
              <MaterialIcons name="lightbulb" size={20} color="#775a19" />
              <Text style={styles.recommendText}>42% of attendees requested more information about the venue's history. Add a digital brochure for the next gathering.</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('OrganizerDashboard')}>
          <MaterialIcons name="dashboard" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="event" size={24} color="#775a19" />
          <Text style={styles.navTextActive}>EVENTS</Text>
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
    backgroundColor: 'rgba(251, 249, 248, 0.9)',
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
  titleSection: {
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
  dateWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  trendBadge: {
    backgroundColor: 'rgba(254, 212, 136, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 24,
  },
  rateBig: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 48,
    color: '#000',
    lineHeight: 56,
  },
  ratePercent: {
    fontSize: 24,
    color: '#775a19',
  },
  rateDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    marginBottom: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#efeded',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#775a19',
  },
  bentoRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  bentoItem: {
    flex: 1,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  cardLabelCenter: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 16,
    textAlign: 'center',
  },
  circleGraph: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#775a19',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  circleText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    color: '#000',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4,
  },
  reviewsText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
  },
  cardDark: {
    backgroundColor: '#000',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardLabelLight: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
  },
  cardTitleLight: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 8,
  },
  cardDescLight: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCell: {
    width: '45%',
    marginBottom: 8,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    color: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: '#775a19',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  outlineBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  galleryScroll: {
    marginHorizontal: -24,
    paddingLeft: 24,
    marginBottom: 24,
  },
  galleryItem: {
    width: 240,
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#000',
  },
  galleryImg: {
    width: '100%',
    height: '100%',
  },
  galleryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  galleryLikes: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    marginBottom: 4,
  },
  galleryQuote: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontStyle: 'italic',
  },
  recommendationsCard: {
    backgroundColor: 'rgba(254, 212, 136, 0.05)',
    borderRadius: 12,
    padding: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#775a19',
    marginBottom: 24,
  },
  recommendList: {
    marginTop: 16,
    gap: 16,
  },
  recommendRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  recommendText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
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
