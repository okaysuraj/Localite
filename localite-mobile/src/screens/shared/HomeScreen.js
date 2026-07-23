import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getEvents } from '../../services/api';

const { width } = Dimensions.get('window');

const RECOMMENDED_EVENTS = [
  {
    id: '1',
    category: 'EPICUREAN',
    title: 'Vintage Garden Soirée',
    date: 'OCT 14 • 7:00 PM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9HJ-SC0fDDQViO-zoNr16YJuh827URfenSy_zFwJFKzv15g34IRW4UJN_hyP1vOVtHdiy8uqACL_lVK_j8RIDeTHVUZfRlcrWuLgr_jb7gArdUcBQoPNEJA41BXKI5txUa0mrC67TEBFThc-eRoJSxZqChLYcff8mQ4mgy6M2JpLT1HWichlla8H22s4mRJILz5NkycST4JTPrWEHJrMsnmBsJ6FroOaWklpgjQWZbuzOvy-ih5PDHA',
  },
  {
    id: '2',
    category: 'CULTURE',
    title: 'Abstract Vernissage',
    date: 'OCT 16 • 6:30 PM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC45bMnjmTCrmml6Hj31wj3r7telY8hKAZFDTf4863iTDFn4PDzC-anilVpsjB8HxtQFf4TrbWGUCqBMrsXrZRwMI9Lu0GfUdRv7kr56KjdYn2TVBHX_G-fi43wWuyVG2rB_1KmhtG9oRZL0TB3mKMWGWvr_kqqH0p5p6dDfaYD3nXSSqXehFSWUtqwoclw53wS71i8dl9Mp375cXTahc3-ZZhh03AU6K8OQ9jq4zsTETFzn1cMS4GRWw',
  },
  {
    id: '3',
    category: 'WELLNESS',
    title: 'Sunrise Rooftop Yoga',
    date: 'OCT 18 • 8:00 AM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVcGX7PT2pccw4Z2a03MbRxEmMM-rIIZHghm37tSg7fBm8O8JWWrmjjJwhfNeUkVc6SOYy6ws5_KtudjrNVd9EoBmPsKJkGqyG_j2Ou6JgeQyQVzgJpgZ_8OLONDXmtPiBlN_I3yTRxm67I0SduMGGbQlp-ZYPmPXgfj_gVqecg8ZwJ4jlrsPs8xUubL08JbdsSZc6WbFlOl1z9o39XHlvBHT9c-aVUtgabV3L2NyGplFPxE6SmH8sbg',
  }
];

const COMMUNITY_PULSE = [
  {
    id: '1',
    user: 'Marcus Thorne',
    action: 'joined',
    target: 'Gourmet Guild',
    time: '2 HOURS AGO',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDnt6kUnzlfexewBWvx3qh0p6lGP1slZa_U49dNHJLaCXnwUUHQfSxdANjK83I-g5jOMkGy47jG46XcHbBwzdC142I8NvcdHgpYkTxoUPR7-AI_5lA8Sk1Oq4gvU080m_DeFJZo6UJkDDf9y7Ga92o_vnKhfw7qBRQzwzHKL-Zlc3nBw3mJ5fbKtQbnqlos66Nxl9dsNKuVQJLUMqOS-MCtU2sgoUQejgL6wMEkRxlGbHOWBHrdQ6jKA',
  },
  {
    id: '2',
    user: 'Elena Rossi',
    action: 'shared 4 photos from',
    target: 'Opera Night',
    time: '4 HOURS AGO',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGEtf87RxFZYk7qf9Yo6Yx4k7kNZkPb6ipuBeIhN40ZH7PR4HlKQ20JrwkFvs4Vus6iX6W-TSZTGZ-JRk3lkvQj2sr8uhNqf70Eqak2NFUQV_mMseVjK19T045vjTWAIy1rTQgGQIGUvoELDoEFCarIqkfIQZWFIOQVdwJxI2lnr4Fl-yItwFPxce8oFnq4Xo7ttFlC0awoFQhVV7WpQz5BWmMzf-WJVadfxpWiOOp1DfBuZ9W0rDGCQ',
  }
];

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <Ionicons name="location" size={24} color="#000000" />
          <Text style={styles.appBarTitle}>Localite</Text>
        </View>
        <View style={styles.appBarRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={24} color="#44474d" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileBtn}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc4T_g39vqB_ldG28B6LoYWkSXF5i6mMh9jXRL8DdJf7SiwftM1IwuTy-iPSfWtUYFBOTKzSCnyFmoNU7Nbx-Wr4MgWZ-SZrX3hgvKVYpGfUzHFAXuuzOxqaZJqH9j8wvyOodRN6GrYgpocjqc77ZeefHuu3Z6orMu6Jg5IltMaDmQOxEed9qVJTMrNFLgroQuadJMZ_07vPI1z-YWDM0Cc1fnxaP8Zp_GgJ4GfzkTRNomnMeXMdwe2A' }} 
              style={styles.profileImg} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Welcome */}
        <View style={styles.heroSection}>
          <Text style={styles.heroLabel}>CURATED SELECTION</Text>
          <Text style={styles.heroTitle}>Good Morning, Julian</Text>
          <Text style={styles.heroSubtitle}>
            Explore the most refined gatherings and distinguished community updates happening in your circle today.
          </Text>
        </View>

        {/* Recommended For You Carousel */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllBtn}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color="#775a19" style={{ marginVertical: 32 }} />
        ) : (
          <>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.carouselContainer}
            >
              {events.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.carouselCard} 
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
                >
                  <Image source={{ uri: item.imageUrl || item.image }} style={styles.cardImage} />
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.cardCategory}>{item.category || item.eventType}</Text>
                      <Ionicons name="bookmark-outline" size={20} color="#c5c6cd" />
                    </View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <View style={styles.cardDateRow}>
                      <Ionicons name="calendar-outline" size={16} color="#44474d" />
                      <Text style={styles.cardDate}>{item.date}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Trending Events Bento */}
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionTitle}>Trending Events</Text>
            </View>

            {events.length > 0 && (
              <TouchableOpacity 
                style={styles.largeFeatureCard} 
                activeOpacity={0.9}
                onPress={() => navigation.navigate('EventDetail', { eventId: events[0].id })}
              >
                <Image 
                  source={{ uri: events[0].imageUrl || events[0].image }} 
                  style={styles.largeFeatureImage} 
                />
                <View style={styles.largeFeatureOverlay}>
                  <View style={styles.featureBadge}>
                    <Text style={styles.featureBadgeText}>EXCLUSIVE HUB</Text>
                  </View>
                  <Text style={styles.featureTitle}>{events[0].title}</Text>
                  <Text style={styles.featureSubtitle} numberOfLines={2}>
                    {events[0].description}
                  </Text>
                  <TouchableOpacity style={styles.secureBtn}>
                    <Text style={styles.secureBtnText}>SECURE INVITE</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}

            {/* Secondary Feature Cards */}
            <View style={styles.secondaryCardsContainer}>
              {events.slice(1, 3).map((item) => (
                <TouchableOpacity 
                  key={`sec-${item.id}`} 
                  style={styles.secondaryCard} 
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
                >
                  <Image 
                    source={{ uri: item.imageUrl || item.image }} 
                    style={styles.secondaryCardImage} 
                  />
                  <View style={styles.secondaryCardContent}>
                    <Text style={styles.cardCategory}>{item.category || item.eventType}</Text>
                    <Text style={styles.secondaryCardTitle}>{item.title}</Text>
                    <Text style={styles.secondaryCardDesc} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Community Pulse */}
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionTitle}>Community Pulse</Text>
        </View>

        <View style={styles.pulseContainer}>
          {COMMUNITY_PULSE.map((item) => (
            <TouchableOpacity key={item.id} style={styles.pulseItem}>
              <View style={styles.pulseLeft}>
                <Image source={{ uri: item.avatar }} style={styles.pulseAvatar} />
                <View style={styles.pulseTextContainer}>
                  <Text style={styles.pulseText}>
                    <Text style={styles.pulseUser}>{item.user} </Text>
                    {item.action}{' '}
                    <Text style={styles.pulseTarget}>{item.target}</Text>
                  </Text>
                  <Text style={styles.pulseTime}>{item.time}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#c5c6cd" />
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.pulseItem}>
            <View style={styles.pulseLeft}>
              <View style={styles.pulseIconContainer}>
                <Ionicons name="checkmark-circle" size={24} color="#775a19" />
              </View>
              <View style={styles.pulseTextContainer}>
                <Text style={styles.pulseText}>
                  <Text style={styles.pulseUser}>New Member Highlight</Text>: Meet <Text style={styles.pulseTarget}>The Art Collective</Text>
                </Text>
                <Text style={styles.pulseTime}>YESTERDAY</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#c5c6cd" />
          </TouchableOpacity>
        </View>
        
        {/* Padding for Bottom Tabs */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fbf9f8',
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#0a192f',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appBarTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 28,
    color: '#000000',
    marginLeft: 8,
    letterSpacing: -0.5,
  },
  appBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginRight: 16,
  },
  profileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    overflow: 'hidden',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    marginBottom: 32,
  },
  heroLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionHeaderContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    color: '#000000',
  },
  viewAllBtn: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
  carouselContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  carouselCard: {
    width: 280,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardCategory: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1.2,
  },
  cardTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 8,
  },
  cardDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDate: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
    marginLeft: 6,
  },
  largeFeatureCard: {
    marginHorizontal: 24,
    height: 350,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
  },
  largeFeatureImage: {
    width: '100%',
    height: '100%',
  },
  largeFeatureOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingTop: 80, // Gradient effect
    backgroundColor: 'rgba(0,0,0,0.4)', // Simplified gradient
  },
  featureBadge: {
    backgroundColor: '#775a19',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 12,
  },
  featureBadgeText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#ffffff',
    letterSpacing: 1,
  },
  featureTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 28,
    color: '#ffffff',
    marginBottom: 8,
  },
  featureSubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#e4e2e2',
    marginBottom: 16,
  },
  secureBtn: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
  },
  secureBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#000000',
    letterSpacing: 1,
  },
  secondaryCardsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  secondaryCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  secondaryCardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  secondaryCardContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  secondaryCardTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  secondaryCardDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#44474d',
  },
  pulseContainer: {
    paddingHorizontal: 24,
  },
  pulseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f3f3',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  pulseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pulseAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  pulseIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(119, 90, 25, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  pulseText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#1b1c1c',
  },
  pulseUser: {
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  pulseTarget: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontStyle: 'italic',
    color: '#775a19',
  },
  pulseTime: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 90, // Above tab bar
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 20,
  }
});
