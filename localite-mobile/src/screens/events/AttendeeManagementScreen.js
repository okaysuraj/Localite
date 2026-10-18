import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Platform, Image, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getEventById, getEventRsvps, getMyEvents, checkInAttendee } from '../../services/api';

export default function AttendeeManagementScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [eventId, setEventId] = useState(route.params?.eventId || null);
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadEventData() {
      try {
        let currentId = eventId;
        if (!currentId) {
          const myEvents = await getMyEvents();
          if (Array.isArray(myEvents) && myEvents.length > 0) {
            currentId = myEvents[0].id;
            setEventId(currentId);
          }
        }
        if (currentId) {
          const [eventData, rsvps] = await Promise.all([
            getEventById(currentId).catch(() => null),
            getEventRsvps(currentId).catch(() => [])
          ]);
          setEvent(eventData);
          setAttendees(Array.isArray(rsvps) ? rsvps : []);
        }
      } catch (err) {
        console.error('Failed to load attendees:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEventData();
  }, [eventId]);

  const handleCheckIn = async (ticketId, username) => {
    if (!eventId || !ticketId) return;
    try {
      await checkInAttendee(eventId, ticketId);
      Alert.alert('Checked In', `${username || 'Attendee'} successfully checked in!`);
      // Refresh attendees
      const rsvps = await getEventRsvps(eventId);
      setAttendees(Array.isArray(rsvps) ? rsvps : []);
    } catch (err) {
      Alert.alert('Check In Status', err.message || 'Could not verify ticket');
    }
  };

  const filtered = attendees.filter(a => {
    const name = a.user?.username || a.username || '';
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendee Roster</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Event Header */}
        <View style={styles.eventHeader}>
          <Text style={styles.eventLabel}>CONFIRMED EVENT ROSTER</Text>
          <Text style={styles.eventTitle}>{event?.title || 'Community Gathering'}</Text>
          <Text style={styles.eventSubtitle}>
            {event?.location || 'Designated Venue'} • {event?.date ? `${event.date}` : 'Scheduled'}
          </Text>
        </View>

        {/* Search & Filters */}
        <View style={styles.filtersSection}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color="#75777e" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search guests..."
              placeholderTextColor="#75777e"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#775a19" style={{ marginVertical: 32 }} />
        ) : filtered.length === 0 ? (
          <View style={{ padding: 32, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: '#75777e', textAlign: 'center' }}>
              No attendees registered for this gathering yet.
            </Text>
          </View>
        ) : (
          /* Attendee List */
          <View style={styles.listContainer}>
            {filtered.map(rsvp => {
              const name = rsvp.user?.username || rsvp.username || 'Member';
              const isCheckedIn = rsvp.checkedIn || rsvp.status === 'ATTENDED';
              const statusText = isCheckedIn ? 'CHECKED IN' : rsvp.status || 'GOING';
              const statusBg = isCheckedIn ? '#d1fae5' : '#fef3c7';
              const statusColor = isCheckedIn ? '#10b981' : '#d97706';

              return (
                <View key={rsvp.id} style={styles.card}>
                  <View style={styles.cardTop}>
                    <View style={styles.userInfo}>
                      <Image 
                        source={{ uri: rsvp.user?.profilePhotoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' }} 
                        style={styles.userAvatar} 
                      />
                      <View>
                        <Text style={styles.userName}>{name}</Text>
                        <Text style={styles.userSub}>Ticket: {rsvp.ticketId ? `#${rsvp.ticketId.slice(0, 8)}` : 'Standard Pass'}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardBottom}>
                    <View style={styles.statusContainer}>
                      <Text style={styles.statusLabel}>STATUS</Text>
                      <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
                        <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
                      </View>
                    </View>
                    <View style={styles.cardActions}>
                      {!isCheckedIn && rsvp.ticketId && (
                        <TouchableOpacity 
                          style={styles.primaryButton}
                          onPress={() => handleCheckIn(rsvp.ticketId, name)}
                        >
                          <Text style={styles.primaryButtonText}>CHECK IN</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('TicketQRCode', { eventId })}>
        <MaterialIcons name="qr-code-scanner" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
    backgroundColor: '#fbf9f8',
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#775a19',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
  },
  eventHeader: {
    marginBottom: 24,
  },
  eventLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
    marginBottom: 4,
  },
  eventTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 4,
  },
  eventSubtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
  },
  filtersSection: {
    marginBottom: 24,
    gap: 16,
  },
  filterChips: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#775a19',
    gap: 4,
  },
  chipText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#000',
  },
  listContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#775a19',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#000',
  },
  userSub: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
    marginTop: 2,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    paddingTop: 12,
  },
  statusLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#eae8e7',
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  loadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    gap: 4,
  },
  loadMoreText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});
