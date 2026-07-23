import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  Dimensions,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getEventById, rsvpToEvent, awardXp } from '../../services/api';

const { width } = Dimensions.get('window');

export default function EventDetailScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { eventId } = route.params || {};
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  const fetchEvent = async () => {
    try {
      const data = await getEventById(eventId);
      setEvent(data);
    } catch (error) {
      console.error("Failed to fetch event:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    } else {
      setLoading(false);
    }
  }, [eventId]);

  const handleRsvp = async () => {
    setRsvpLoading(true);
    try {
      await rsvpToEvent(eventId);
      try {
        await awardXp('ATTEND_EVENT');
      } catch (xpErr) {
        console.log('Gamification disabled or failed:', xpErr);
      }
      Alert.alert('Success', 'Successfully requested invitation! (+50 XP)');
      await fetchEvent();
    } catch (error) {
      Alert.alert('Error', 'Failed to request invitation.');
    } finally {
      setRsvpLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#775a19" />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Event Not Found</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top AppBar */}
      <SafeAreaView style={styles.appBarSafe}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Localite</Text>
          <View style={styles.profileBtn}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG2iPQg1VcnEF4Z-wLCUYy9brn-PPR9FI-Moo3J_zXrO0ft7X2Bf71r11ozvKg4PcorUjlwCmFXmeilfStBk0dziVvSKJ0gxZ62ibPQ3VysmlMqiDKyAy31PMJycF_n-NMGN7Gs8f5foHUuql7WqMG_4_QEUEVccsW9gwGnZVO-lUBzDFzsAThotKh53NrcPGcJ3QmFly3LMB5F0LdtN0hKtcDDgkR5S0UnGwHndNyTIKdfu3uwGw5gQ' }} 
              style={styles.profileImg} 
            />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: event.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6aGXoO6vJOcXeBMB-uQWLwK44yQiXS6jMAmbRC8IvsvzJCqgDDYAIcPM5xVDnS2T1o3o94sRIuT9mEZtnzwDeI3G0FKh5Fl_3XyBSV2-XLoqUHU8Eu5QpnzYW9ocmbGdbWaQ-Nyph_GAw6lDSPBkfe1EGm3IbUngD4_5v3UTb2uJUnH01fO2ZJ7jcK-TpxPzeLBQ2ykIhAxEp7n9Bfxad7l17bgC-wgSy_h2Qz6c4KdkW4-vBXrj9PA' }}
            style={styles.heroImage}
          />
          <View style={styles.heroGradient}>
            <View style={styles.heroTags}>
              <View style={styles.tagBadge}>
                <Text style={styles.tagBadgeText}>{event.category || 'PRIVATE EVENT'}</Text>
              </View>
              <Text style={styles.dateText}>
                {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase() : 'JUNE 24, 2024'}
              </Text>
            </View>
            <Text style={styles.heroTitle}>{event.title}</Text>
            <View style={styles.heroDetailsRow}>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color="#ffffff" />
                <Text style={styles.detailText}>
                  {event.date ? new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toUpperCase() : '18:00 — 22:00'}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={16} color="#ffffff" />
                <Text style={styles.detailText}>{event.location || 'THE WILLOWS ESTATE'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content Canvas */}
        <View style={styles.contentCanvas}>
          <View style={styles.cardSection}>
            <Text style={styles.sectionHeader}>THE EXPERIENCE</Text>
            <View style={styles.quoteBlock}>
              <Text style={styles.quoteText}>
                "{event.rules || 'An evening where time stands still, amidst the scent of blooming jasmine and the soft clinking of crystal.'}"
              </Text>
            </View>
            <Text style={styles.descriptionText}>
              {event.description || "Join an intimate gathering of the city's most discerning patrons for a curated evening at the historic Willows Estate."}
            </Text>

            <View style={styles.amenitiesGrid}>
              <View style={styles.amenityBox}>
                <Ionicons name="wine" size={24} color="#775a19" />
                <View style={styles.amenityTextCol}>
                  <Text style={styles.amenityTitle}>HOST</Text>
                  <Text style={styles.amenitySub}>{event.host?.username || 'Localite'}</Text>
                </View>
              </View>
              <View style={styles.amenityBox}>
                <Ionicons name="people" size={24} color="#775a19" />
                <View style={styles.amenityTextCol}>
                  <Text style={styles.amenityTitle}>CAPACITY</Text>
                  <Text style={styles.amenitySub}>{event.maxAttendees > 0 ? `${event.maxAttendees} Guests` : 'Unlimited'}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Curated Guests */}
          <View style={styles.cardSection}>
            <Text style={styles.sectionHeader}>CURATED GUESTS</Text>
            <View style={styles.guestRow}>
              {['Elena', 'Marcus', 'Sarah'].map((guest, i) => (
                <View key={i} style={[styles.guestAvatar, { marginLeft: i > 0 ? -12 : 0, zIndex: 10 - i }]}>
                  <Image source={{ uri: `https://api.dicebear.com/7.x/notionists/svg?seed=${guest}&backgroundColor=b9c7e4` }} style={styles.guestImg} />
                </View>
              ))}
              <View style={[styles.guestMoreBox, { marginLeft: -12, zIndex: 0 }]}>
                <Text style={styles.guestMoreText}>+{event.attendees > 3 ? event.attendees - 3 : 12}</Text>
              </View>
            </View>
            <Text style={styles.guestSubtitle}>Including Julian Montgomery and elite members.</Text>
            
            <View style={styles.actionRow}>
              <TouchableOpacity onPress={() => navigation.navigate('EventGroupChat', { event })} style={styles.actionBtn}>
                <Ionicons name="chatbubble-outline" size={16} color="#000" style={{marginRight: 8}} />
                <Text style={styles.viewGuestsText}>GROUP CHAT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('EventParticipants', { eventId: event.id, eventTitle: event.title })} style={styles.actionBtn}>
                <Ionicons name="people-outline" size={16} color="#000" style={{marginRight: 8}} />
                <Text style={styles.viewGuestsText}>GUESTLIST</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Venue Details */}
          <View style={styles.cardSection}>
            <Text style={styles.sectionHeader}>THE VENUE</Text>
            <View style={styles.mapPreview}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOOjGNDgG6iOs15-aXw7GrcOcUzyto8x-ZmSZ78AiaFNpWJYTYsCYJ0BjFrmLf1C4d_lUZ74tPtlEyBe9T7vihuLrr3xnXiJ-AOYWDfj4QAMtDLGWfiMni5bO0Y4c2xS49o19b4Mm4rxhoeF0xHEXor6qvis3x8rGGpAhakmoOt-AWXzn47Ci5-z6czVHxsJ3mLgltiFeN3EDGmFMra38bY4wpfexBYZeFJlNUTJ3xI6MUuHnDY3l5GQ' }} 
                style={styles.mapImg} 
              />
            </View>
            <Text style={styles.venueTitle}>{event.location}</Text>
            <Text style={styles.venueAddress}>London, UK (Approx)</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Bar Bottom Fixed */}
      <View style={[styles.bottomActionBar, { paddingBottom: Platform.OS === 'ios' ? insets.bottom || 24 : 24 }]}>
        <View style={styles.actionInfo}>
          <Text style={styles.actionLabel}>ADMISSION</Text>
          <Text style={styles.actionPrice}>{event.cost > 0 ? `$${event.cost}` : 'Free'} <Text style={styles.actionPer}>/ guest</Text></Text>
        </View>
        <TouchableOpacity 
          style={styles.joinBtn}
          onPress={handleRsvp}
          disabled={rsvpLoading}
        >
          <Text style={styles.joinBtnText}>{rsvpLoading ? 'PROCESSING...' : 'REQUEST INVITATION'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbf9f8',
  },
  errorText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 16,
  },
  backBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#775a19',
    borderRadius: 8,
  },
  backBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  appBarSafe: {
    backgroundColor: '#fbf9f8',
    zIndex: 10,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  iconBtn: {
    padding: 8,
    marginLeft: -8,
  },
  appBarTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: '#000000',
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
  scrollView: {
    flex: 1,
  },
  heroSection: {
    width: '100%',
    height: 440,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.4)', // Simplified gradient replacement
  },
  heroTags: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagBadge: {
    backgroundColor: '#fed488',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagBadgeText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#785a1a',
    letterSpacing: 1,
  },
  dateText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 2,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 36,
    color: '#ffffff',
    lineHeight: 42,
    marginBottom: 12,
  },
  heroDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
    letterSpacing: 1,
  },
  contentCanvas: {
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fbf9f8',
    padding: 24,
  },
  cardSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  sectionHeader: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#75777e',
    letterSpacing: 2,
    marginBottom: 16,
  },
  quoteBlock: {
    borderLeftWidth: 2,
    borderLeftColor: '#775a19',
    paddingLeft: 16,
    marginBottom: 16,
  },
  quoteText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 18,
    fontStyle: 'italic',
    color: '#1b1c1c',
    lineHeight: 28,
  },
  descriptionText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
    marginBottom: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amenityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    padding: 16,
    borderRadius: 12,
    width: '48%',
  },
  amenityTextCol: {
    marginLeft: 12,
  },
  amenityTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#1b1c1c',
    letterSpacing: 1,
  },
  amenitySub: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#75777e',
    marginTop: 2,
  },
  guestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  guestAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: '#e4e2e2',
  },
  guestImg: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  guestMoreBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: '#fed488',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestMoreText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#785a1a',
  },
  guestSubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#c5c6cd',
    borderRadius: 8,
  },
  viewGuestsText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#000000',
    letterSpacing: 1,
  },
  mapPreview: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eae8e7',
    marginBottom: 16,
  },
  mapImg: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  venueTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#1b1c1c',
    marginBottom: 4,
  },
  venueAddress: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 20,
  },
  actionInfo: {
    flex: 1,
  },
  actionLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  actionPrice: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: '#000000',
  },
  actionPer: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
  },
  joinBtn: {
    backgroundColor: '#000000',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  joinBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1,
  }
});
