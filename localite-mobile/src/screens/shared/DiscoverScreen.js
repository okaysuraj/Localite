import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config';
import { useFocusEffect } from '@react-navigation/native';
import EventCard from '../../components/EventCard';
import PanicButton from '../../components/PanicButton';

export default function DiscoverScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [suggestedPartners, setSuggestedPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [timeFilter, setTimeFilter] = useState('Any');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [currentUser, setCurrentUser] = useState(null);

  const categories = ['All', 'Sports', 'Social', 'Fitness', 'Networking'];

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      let url = `${API_URL}/events`;
      const params = [];
      if (category !== 'All') params.push(`category=${category}`);
      if (timeFilter !== 'Any') params.push(`timeFilter=${timeFilter.toLowerCase()}`);
      
      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setEvents(await response.json());
      }

      const userResponse = await fetch(`${API_URL}/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (userResponse.ok) {
        setCurrentUser(await userResponse.json());
      }

      const recResponse = await fetch(`${API_URL}/matches/events`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (recResponse.ok) {
        const data = await recResponse.json();
        setRecommendedEvents(data.slice(0, 5));
      }

      const partnersResponse = await fetch(`${API_URL}/matches/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (partnersResponse.ok) {
        setSuggestedPartners(await partnersResponse.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [category, timeFilter])
  );

  const handleRsvp = async (eventId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        Alert.alert('Success', "RSVP'd successfully!");
        fetchEvents();
      } else {
        Alert.alert('Notice', 'Already RSVP\'d or waitlisted');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderEvent = ({ item }) => (
    <EventCard 
      item={item} 
      isHost={currentUser && item.host && currentUser.id === item.host.id}
      onRsvp={async (id) => {
        try {
          const token = await AsyncStorage.getItem('userToken');
          const response = await fetch(`${API_URL}/events/${id}/rsvp`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            Alert.alert('Success', "RSVP'd successfully!");
            fetchEvents();
            return true;
          } else {
            Alert.alert('Notice', 'Already RSVP\'d or waitlisted');
            return false;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      }}
      onChat={(id, title) => navigation.navigate('Chat', { eventId: id, eventTitle: title })}
      onManage={(item) => navigation.navigate('Scanner', { eventId: item.id, eventTitle: item.title })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View>
            <Text style={styles.headerTitle}>ECOSYSTEM <Text style={{color: '#ccff00'}}>DIRECTORY</Text></Text>
            <Text style={styles.headerSub}>Discover premium real-world events</Text>
          </View>
          <View style={styles.toggleContainer}>
            <TouchableOpacity onPress={() => setViewMode('list')} style={[styles.toggleBtn, viewMode === 'list' && styles.toggleBtnActive]}>
              <Ionicons name="list" size={18} color={viewMode === 'list' ? '#ccff00' : '#94a3b8'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setViewMode('map')} style={[styles.toggleBtn, viewMode === 'map' && styles.toggleBtnActive]}>
              <Ionicons name="map" size={18} color={viewMode === 'map' ? '#ccff00' : '#94a3b8'} />
            </TouchableOpacity>
          </View>
          <View style={[styles.toggleContainer, { marginLeft: 10 }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')} style={[styles.toggleBtn, { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.05)' }]}>
              <Ionicons name="trophy" size={18} color="#facc15" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.toggleBtn}>
              <Ionicons name="notifications" size={18} color="#ccff00" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.filterBtn, category === item && styles.filterBtnActive]}
              onPress={() => setCategory(item)}
            >
              <Text style={[styles.filterText, category === item && styles.filterTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={[styles.filterContainer, { marginTop: -5 }]}>
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={['Any', 'Today', 'Weekend']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.filterBtn, { paddingVertical: 6, paddingHorizontal: 12 }, timeFilter === item && styles.filterBtnActive]}
              onPress={() => setTimeFilter(item)}
            >
              <Text style={[styles.filterText, { fontSize: 10 }, timeFilter === item && styles.filterTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#ccff00" />
          <Text style={styles.loadingText}>SCANNING NETWORK...</Text>
        </View>
      ) : events.length === 0 ? (
        <View style={styles.centerContent}>
          <Ionicons name="search" size={48} color="#334155" />
          <Text style={styles.emptyText}>NO ACTIVE PROTOCOLS</Text>
        </View>
      ) : viewMode === 'list' ? (
        <FlatList 
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderEvent}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <>
              {suggestedPartners.length > 0 && (
                <View style={[styles.forYouSection, { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', paddingBottom: 15, marginBottom: 15 }]}>
                  <View style={styles.forYouHeader}>
                    <Ionicons name="people" size={16} color="#ccff00" />
                    <Text style={styles.forYouTitle}>SUGGESTED PARTNERS</Text>
                  </View>
                  <FlatList
                    horizontal
                    data={suggestedPartners}
                    keyExtractor={(item) => `partner-${item.id}`}
                    renderItem={({ item }) => (
                      <TouchableOpacity 
                        style={styles.partnerCard}
                        onPress={() => navigation.navigate('PublicProfile', { userId: item.id })}
                      >
                        <View style={styles.partnerAvatar}>
                          <Ionicons name="person" size={24} color="#64748b" />
                        </View>
                        <Text style={styles.partnerName} numberOfLines={1}>{item.username}</Text>
                        <Text style={styles.partnerScore}>Match: {item.matchScore}</Text>
                      </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )}
              {recommendedEvents.length > 0 && (
                <View style={styles.forYouSection}>
                  <View style={styles.forYouHeader}>
                    <Ionicons name="star" size={16} color="#ccff00" />
                    <Text style={styles.forYouTitle}>SMART FEED</Text>
                  </View>
                <FlatList
                  horizontal
                  data={recommendedEvents}
                  keyExtractor={(item) => `rec-${item.id}`}
                  renderItem={({ item }) => (
                    <View style={{ width: 300, marginRight: 15 }}>
                      {renderEvent({ item })}
                    </View>
                  )}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 15 }}
                />
              </View>
              )}
            </>
          }
        />
      ) : (
        <View style={styles.mapContainer}>
          <MapView 
            style={styles.map}
            initialRegion={{
              latitude: events.length > 0 && events[0].latitude ? events[0].latitude : 40.7128,
              longitude: events.length > 0 && events[0].longitude ? events[0].longitude : -74.0060,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            userInterfaceStyle="dark"
          >
            {events.map((event) => {
              const lat = event.latitude || 40.7128 + (Math.random() - 0.5) * 0.05;
              const lng = event.longitude || -74.0060 + (Math.random() - 0.5) * 0.05;
              
              return (
                <Marker
                  key={event.id}
                  coordinate={{ latitude: lat, longitude: lng }}
                  title={event.title}
                  description={event.location}
                  onCalloutPress={() => navigation.navigate('Chat', { eventId: event.id, eventTitle: event.title })}
                />
              );
            })}
          </MapView>
        </View>
      )}

      <PanicButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: 1 },
  headerSub: { fontSize: 14, color: '#94a3b8', marginTop: 5 },
  filterContainer: { paddingHorizontal: 20, marginBottom: 15 },
  filterBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginRight: 10, backgroundColor: 'transparent' },
  filterBtnActive: { borderColor: '#ccff00', backgroundColor: 'rgba(204,255,0,0.1)' },
  filterText: { color: '#94a3b8', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  filterTextActive: { color: '#ccff00' },
  listContainer: { padding: 20, paddingBottom: 100 },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#ccff00', fontSize: 12, fontWeight: 'bold', marginTop: 15, textTransform: 'uppercase', letterSpacing: 2 },
  emptyText: { color: '#334155', fontSize: 14, fontWeight: 'bold', marginTop: 15, textTransform: 'uppercase', letterSpacing: 2 },
  toggleContainer: { flexDirection: 'row', backgroundColor: 'rgba(30,41,59,0.8)', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  toggleBtn: { padding: 10, borderRadius: 8 },
  toggleBtnActive: { backgroundColor: 'rgba(204,255,0,0.2)' },
  mapContainer: { flex: 1, borderRadius: 20, overflow: 'hidden', margin: 20, marginBottom: 100, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  map: { width: '100%', height: '100%' },
  forYouSection: { marginBottom: 20 },
  forYouHeader: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 15 },
  forYouTitle: { fontSize: 14, fontWeight: 'bold', color: '#ccff00', textTransform: 'uppercase', letterSpacing: 1 },
  partnerCard: { width: 120, backgroundColor: '#1e293b', borderRadius: 12, padding: 10, marginRight: 15, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  partnerAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  partnerName: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  partnerScore: { color: '#ccff00', fontSize: 10, textTransform: 'uppercase', marginTop: 4 }
});
