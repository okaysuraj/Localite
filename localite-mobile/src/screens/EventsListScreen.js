import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getEvents } from '../services/api';

export default function EventsListScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All Events');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ['All Events', 'Art', 'Sports', 'Dining', 'Music', 'Gala'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = activeTab === 'All Events' 
    ? events 
    : events.filter(e => e.category === activeTab || e.eventType === activeTab);

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
        <TouchableOpacity style={styles.avatarWrap} onPress={() => navigation.navigate('MyProfilePublicView')}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Y-n2YcRrNy4qsaTAJFjQ499HF8WvakmbvkpiPKCTe1QpTCsJ8SaYV0rHDbOZDSYV0PHS6UoTvr0KlXVIFkCbHyJshsKkkqBYtpZ8sQApvTjXfvf9UiIGvhgUYdEI751BrXKNRhifju26Gy1A2_12zHjJTtM-hHfVAxg39KUJRgTN6xnw2UzcMK3S-PSpOzikXqP3-ptt6B3kjHAuCBpZLsHaBu794oSGQAb1amLMz3NdzLcsH5oGOw' }} 
            style={styles.avatarImg} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Category Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll} contentContainerStyle={styles.tabsScrollContent}>
          {tabs.map((tab) => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.tabBtn, activeTab === tab ? styles.tabBtnActive : null]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab ? styles.tabTextActive : null]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Section Title */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionPreTitle}>CURATED FOR YOU</Text>
            <Text style={styles.sectionTitle}>Elite Gatherings</Text>
          </View>
          <TouchableOpacity style={styles.viewCalendarBtn}>
            <Text style={styles.viewCalendarText}>View Calendar</Text>
            <MaterialIcons name="arrow-forward" size={14} color="#75777e" />
          </TouchableOpacity>
        </View>

        {/* Event Cards */}
        {loading ? (
          <ActivityIndicator size="large" color="#775a19" style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.cardsGrid}>
            {filteredEvents.map((item, index) => (
              <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.9} onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}>
                <View style={index === 0 ? styles.cardImgWrapLarge : styles.cardImgWrap}>
                  <Image 
                    source={{ uri: item.imageUrl || item.image }} 
                    style={styles.cardImg} 
                  />
                  <View style={styles.badgesWrap}>
                    {item.isHighlighted && <View style={styles.badgeGold}><Text style={styles.badgeGoldText}>ELITE</Text></View>}
                    <View style={styles.badgeDark}><Text style={styles.badgeDarkText}>{item.category || item.eventType || 'EVENT'}</Text></View>
                  </View>
                </View>
                <View style={styles.cardBody}>
                  {index === 0 && <Text style={styles.cardPreTitle}>FEATURED</Text>}
                  <View style={styles.cardTitleRow}>
                    <Text style={index === 0 ? styles.cardTitleLarge : styles.cardTitle}>{item.title}</Text>
                    <MaterialIcons name="bookmark-border" size={20} color="#75777e" />
                  </View>
                  
                  {index === 0 && (
                    <Text style={styles.cardDesc} numberOfLines={3}>
                      {item.description}
                    </Text>
                  )}
                  
                  <View style={index === 0 ? styles.cardDetailsLarge : styles.cardDetails}>
                    <View style={styles.detailRow}>
                      <MaterialIcons name="calendar-today" size={16} color="#44474d" />
                      <Text style={[styles.detailText, index === 0 && { color: '#000' }]}>{item.date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <MaterialIcons name="location-on" size={16} color="#44474d" />
                      <Text style={styles.detailTextLoc}>{item.location}</Text>
                    </View>
                  </View>
                  
                  {index === 0 ? (
                    <TouchableOpacity style={styles.requestBtn}>
                      <Text style={styles.requestBtnText}>REQUEST INVITATION</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.cardFooter}>
                      <View style={styles.facesWrap}>
                        <View style={[styles.face, { backgroundColor: '#e2e8f0' }]} />
                        <View style={[styles.face, { backgroundColor: '#cbd5e1' }]} />
                        <View style={styles.faceMore}><Text style={styles.faceMoreText}>+{item.attendees || 0}</Text></View>
                      </View>
                      <Text style={styles.priceText}>{item.cost > 0 ? `$${item.cost} / seat` : 'Free'}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SportsCategories')}>
          <MaterialIcons name="explore" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="event-note" size={24} color="#775a19" />
          <Text style={styles.navTextActive}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="storefront" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>Places</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MyProfilePublicView')}>
          <MaterialIcons name="person" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>Profile</Text>
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
    borderColor: '#fed488',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingTop: 24,
    paddingBottom: 120,
  },
  tabsScroll: {
    marginBottom: 24,
  },
  tabsScrollContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  tabBtn: {
    backgroundColor: '#f5f3f3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  tabBtnActive: {
    backgroundColor: '#000',
  },
  tabText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#44474d',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  tabTextActive: {
    color: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionPreTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000',
  },
  viewCalendarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  viewCalendarText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    textTransform: 'uppercase',
  },
  cardsGrid: {
    paddingHorizontal: 24,
    gap: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  cardImgWrap: {
    height: 220,
    width: '100%',
    position: 'relative',
  },
  cardImgWrapLarge: {
    height: 280,
    width: '100%',
    position: 'relative',
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  badgesWrap: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    gap: 8,
  },
  badgeGold: {
    backgroundColor: '#775a19',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeGoldText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#fff',
    letterSpacing: 1,
  },
  badgeDark: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeDarkText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#fff',
    letterSpacing: 1,
  },
  cardBody: {
    padding: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    flex: 1,
    marginRight: 16,
  },
  cardPreTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardTitleLarge: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 12,
  },
  cardDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardDetails: {
    gap: 8,
    marginBottom: 16,
  },
  cardDetailsLarge: {
    gap: 12,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  },
  detailTextLoc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    paddingTop: 16,
  },
  facesWrap: {
    flexDirection: 'row',
  },
  face: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: -8,
  },
  faceMore: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: -8,
    backgroundColor: '#fed488',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceMoreText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#000',
  },
  priceText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
  },
  inviteText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#75777e',
  },
  membersOnlyText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  requestBtn: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  requestBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    letterSpacing: 2,
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
    paddingTop: 8,
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: '#775a19',
    paddingTop: 6,
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
