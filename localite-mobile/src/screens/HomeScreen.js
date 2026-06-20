import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EventCard from '../../components/EventCard';

export default function HomeScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8080/api/events' : 'http://localhost:8080/api/events';
    
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Ionicons name="location" size={20} color="white" />
          </View>
          <Text style={styles.logoText}>Localite</Text>
        </View>
        <View style={styles.navIcons}>
          <Ionicons name="notifications" size={24} color="#94a3b8" style={{marginHorizontal: 10}} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Discover <Text style={styles.titleHighlight}>Local Events</Text></Text>
            <Text style={styles.subtitle}>Meet new people and explore activities happening around you.</Text>
          </View>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContent}>
          {['All', 'Sports', 'Social', 'Fitness', 'Networking'].map((tag, idx) => (
            <TouchableOpacity key={idx} style={[styles.filterBtn, idx === 0 && styles.filterBtnActive]}>
              <Text style={[styles.filterText, idx === 0 && styles.filterTextActive]}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {loading ? (
          <ActivityIndicator size="large" color="#ccff00" style={{marginTop: 50}} />
        ) : (
          <View style={styles.eventsGrid}>
            {events.map(event => (
              <EventCard 
                key={event.id}
                title={event.title}
                category={event.category}
                date={new Date(event.date).toLocaleString([], {weekday: 'long', hour: '2-digit', minute:'2-digit'})}
                location={event.location}
                attendees={event.attendees}
                maxAttendees={event.maxAttendees}
                imageUrl={event.imageUrl}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    padding: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    backgroundColor: '#ccff00',
    padding: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  logoText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  navIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRow: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
  },
  titleHighlight: {
    color: '#ccff00',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 20,
  },
  filterScroll: {
    marginBottom: 25,
  },
  filterContent: {
    paddingRight: 20,
  },
  filterBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  filterBtnActive: {
    backgroundColor: '#ccff00',
    borderColor: '#ccff00',
  },
  filterText: {
    color: '#f8fafc',
    fontWeight: '600',
  },
  filterTextActive: {
    color: 'white',
  },
  eventsGrid: {
    gap: 20,
  }
});
