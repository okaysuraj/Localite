import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

const MOCK_PARTICIPANTS = [
  {
    id: 1,
    user: {
      username: 'Elena Rossi',
      profileImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAegcPXQPVVhWgwHUy1ABMbIesRD5A5PSvgCb34E93-uHbe0A8BsBSiFS7Pg61qH-rHjiv1VvgqhUXEZOlzsflQJQ6NTY64R3woFk33RY3OgxTWN7ghuUHlML5lQiXj6wkz8RgbmizDI8sfWRxu_oDnSvy0KdE9oG-Uao4FFHHY78rczAzj_j_iYehacRlYu9NLigD-Rlvx7BmjnDg_x2tqT206N4c00nNwomQzmjNx6WUuN7_tZUML3w',
      title: 'LUXURY CURATOR',
      reputation: 82,
      attendance: 14
    },
    status: 'ATTENDING'
  },
  {
    id: 2,
    user: {
      username: 'Marcus Chen',
      profileImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6rJOveM2_A_sHt4Zmmwxt1d0NG9sV1oRV6iu2mH31bUxbk6-FjX4cHiGLKBbAjAfLxXm3D7d-oyvQcGJ-Ne5J30UcOIZCRYTljNYJ93h28hpT22TBvO9Qf7kJLreYxBise6b7N3vItcFYP0ulpKHt5UvKzzOtLFANCMfSSboPKjjUsahXHb-e3n617BKqH_S0LSCGZUuNuZlpjClvNXf99ZSC144MTJWc-R2SWF5-LXkVlkjWR5AqKQ',
      title: 'VENTURE ANALYST',
      reputation: 75,
      attendance: 8
    },
    status: 'WAITLIST'
  }
];

export default function EventParticipantsScreen({ route, navigation }) {
  const { eventId, eventTitle } = route.params;
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParticipants();
  }, [eventId]);

  const fetchParticipants = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/events/${eventId}/rsvps`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setParticipants(data.length > 0 ? data : MOCK_PARTICIPANTS);
      } else {
        setParticipants(MOCK_PARTICIPANTS);
      }
    } catch (error) {
      console.error(error);
      setParticipants(MOCK_PARTICIPANTS);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: item.user.profileImageUrl || `https://api.dicebear.com/7.x/notionists/png?seed=${item.user.username}&backgroundColor=b9c7e4` }} 
            style={styles.avatar} 
          />
          <View>
            <Text style={styles.username}>{item.user.username}</Text>
            <Text style={styles.userTitle}>{item.user.title || 'MEMBER'}</Text>
          </View>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>REPUTATION</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.statValue}>{item.user.reputation || 50}</Text>
            <Ionicons name="star" size={12} color="#775a19" style={{marginLeft: 2}} />
          </View>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>ATTENDANCE</Text>
          <Text style={styles.statValue}>{item.user.attendance || 0} Events</Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, { backgroundColor: item.status === 'ATTENDING' ? '#22c55e' : '#f59e0b' }]} />
          <Text style={styles.statusLabel}>{item.status === 'ATTENDING' ? 'Attending' : 'Pending'}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewProfileBtn}>VIEW PROFILE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerSub}>GUESTLIST</Text>
          <Text style={styles.headerTitle} numberOfLines={1}>{eventTitle || 'Event'}</Text>
        </View>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="search" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>ALL ({participants.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>ATTENDING</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>WAITLIST</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#775a19" />
        </View>
      ) : (
        <FlatList
          data={participants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
  },
  backBtn: {
    padding: 4,
  },
  headerTitles: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerSub: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 18,
    color: '#000000',
    marginTop: 2,
  },
  actionBtn: {
    padding: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f3f3',
  },
  activeTab: {
    backgroundColor: '#000000',
  },
  tabText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  },
  activeTabText: {
    color: '#ffffff',
  },
  listContainer: {
    padding: 20,
    paddingTop: 4,
    gap: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#e9c176',
  },
  username: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 18,
    color: '#000000',
  },
  userTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: '#f5f3f3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9,
    color: '#44474d',
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f5f3f3',
    paddingVertical: 12,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#000000',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusLabel: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#44474d',
  },
  viewProfileBtn: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
    textDecorationLine: 'underline',
  }
});
