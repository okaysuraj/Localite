import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TABS = ['Events', 'Users', 'Activities'];
const RECENT_SEARCHES = ['Art Gallery Opening Mayfair', 'Padel Club Members'];
const SUGGESTIONS = ['Wine Tasting', 'Yachting', 'Polo Match', 'Opera Nights'];
const TRENDS = [
  {
    id: '1',
    category: 'EXHIBITION',
    date: '24 MAY',
    title: 'Vernissage: Abstract Nobility',
    location: 'The Royal Pavilion, London',
    icon: 'location-outline',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnadVJNGTYHzb255w4mVrVSyvIJ1M1IcADzjqmpeZ-vryJZ3E3S1MrgLlKNhZHfMECKnMuqjZGBaKrDoRgRRllL31ZSSWGGW6xaNvv1Ziw8OjFbSURm5Nm7ueP7mwm6eazMfeiMs4DWZBPoKpdJ3hErIKNLVrheSaB4yov0fmbUoDMhZcuNUvp9pMfNMCXFqUSlT653KgVrESlxKadwCriSmJDlPYsxncaGU8L93gVuUmdWNjhbR5s_A'
  },
  {
    id: '2',
    category: 'SOCIAL HUB',
    date: 'WEEKENDS',
    title: 'Chelsea Garden Collective',
    location: '142 Members Active',
    icon: 'people-outline',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmLU-huarD63JFM3A7tJSHQfhclv1WjpSoIKmFcYBUyR8LCL7TPN9dGIYWehCohHwRMuht5vOh272Z1N8Dvuj0PiYSEQ4b6csvrohlb0zd_dtF48X4SgicWaNBnKeS8-0tVButLuif3p3mVg2jPrIkOUhnadcNyOSlsPNaAaMK9WnS9DyE8XtU1NhnypFGaQWEwToGsmCUsv5J4xzG9U3-O3JK-Gkqx85i5w0TaFFqK8eN8M8EFQEVyQ'
  },
  {
    id: '3',
    category: 'ACTIVITY',
    date: 'DAILY',
    title: 'Night Tennis Tournament',
    location: 'Advanced Level · 8 Slots Left',
    icon: 'flash-outline',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwdDkBPHwKKjyI7zsL6VqL1kRcTgeJ5rnpfco0bxK79Ae7V5moCsiaULt093r52LkeK6G96eT7UsUgrOAugqepcFhR-SHj3AjSWTiub9AHkz0mkSONhVxgjAokl6yu7IFZmk7iKpx7ggD5GtUf4nZn__2YT023NYdIBy-wWLGwUjUtf-LhN_P_cIVF0tLhZ-nXk5qo4FKr4bXuQ0gM7qNhGuq1CYMfNvPeBaFlDEdC-dJ7oN189f2tRA'
  }
];

export default function SearchExploreScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Events');
  const [searchQuery, setSearchQuery] = useState('');

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
            <Ionicons name="notifications-outline" size={24} color="#44474d" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileBtn}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg6aX_K2AjkX75d3xCfKvv8CQYsXGoEjyaLmUjv1diYLY2QI4hdkVZuqeXYed5r7frFTo0feX20z9M0JIh5Z_yBU-ZNAZ6zMKaUfd3Jl0m3H0UC0amdQ8P1R-SR5v1vkWAsZ3aWixkGlRAjoCARhl8cRz0UCm79M3wS-S0QPkkKYvXVlqAEOpasXzzGw2N1MiydCOPwUFna779zGFO9VCP2bOVdSOoquoChn3n1Zk31Odx6hIMJCe_Aw' }} 
              style={styles.profileImg} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search Input */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#75777e" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for events, curators, or hubs..."
              placeholderTextColor="#75777e"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.gridContainer}>
          {/* Recent Searches */}
          <View style={styles.recentSection}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionSubTitle}>RECENT SEARCHES</Text>
              <TouchableOpacity>
                <Text style={styles.clearAllBtn}>CLEAR ALL</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.recentList}>
              {RECENT_SEARCHES.map((item, index) => (
                <TouchableOpacity key={index} style={styles.recentItem}>
                  <View style={styles.recentItemLeft}>
                    <Ionicons name="time-outline" size={20} color="#75777e" />
                    <Text style={styles.recentItemText}>{item}</Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="close" size={20} color="#c5c6cd" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Suggested Keywords */}
          <View style={styles.suggestedSection}>
            <Text style={styles.sectionSubTitle}>SUGGESTED KEYWORDS</Text>
            <View style={styles.suggestedTags}>
              {SUGGESTIONS.map((item, index) => (
                <TouchableOpacity key={index} style={styles.suggestedTag}>
                  <Text style={styles.suggestedTagText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Discover Trends */}
        <View style={styles.trendsSection}>
          <Text style={styles.sectionTitle}>Discover Trends</Text>
          
          <View style={styles.trendList}>
            {TRENDS.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.trendCard} 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
              >
                <Image source={{ uri: item.image }} style={styles.trendImage} />
                <View style={styles.trendContent}>
                  <View style={styles.trendHeaderRow}>
                    <Text style={styles.trendCategory}>{item.category}</Text>
                    <Text style={styles.trendDate}>{item.date}</Text>
                  </View>
                  <Text style={styles.trendTitle}>{item.title}</Text>
                  <View style={styles.trendLocationRow}>
                    <Ionicons name={item.icon} size={14} color="#75777e" />
                    <Text style={styles.trendLocation}>{item.location}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#75777e" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Padding for Bottom Tabs */}
        <View style={{ height: 100 }} />
      </ScrollView>
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
  searchSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#1b1c1c',
  },
  tabsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  tabBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#eae8e7',
    marginHorizontal: 8,
  },
  tabBtnActive: {
    backgroundColor: '#000000',
  },
  tabText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#44474d',
    letterSpacing: 1,
  },
  tabTextActive: {
    color: '#ffffff',
  },
  gridContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  recentSection: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionSubTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#75777e',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  clearAllBtn: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  recentList: {
    gap: 8,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentItemText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#1b1c1c',
    marginLeft: 12,
  },
  suggestedSection: {
    marginBottom: 8,
  },
  suggestedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  suggestedTag: {
    backgroundColor: 'rgba(254, 212, 136, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(119, 90, 25, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  suggestedTagText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    color: '#775a19',
  },
  trendsSection: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 16,
  },
  trendList: {
    gap: 16,
  },
  trendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  trendImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  trendContent: {
    flex: 1,
    marginLeft: 16,
  },
  trendHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  trendCategory: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  trendDate: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  trendTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  trendLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendLocation: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 11,
    color: '#75777e',
    marginLeft: 4,
  }
});
