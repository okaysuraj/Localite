import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Platform, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const attendees = [
  { id: 1, name: 'Eleanor Sterling', status: 'ARRIVED', tier: 'Diamond Elite', dietary: 'Vegan, No Gluten', statusColor: '#10b981', statusBg: '#d1fae5', avatar: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Julian Vane', status: 'EN ROUTE', tier: 'Platinum Member', dietary: 'Shellfish Allergy', statusColor: '#d97706', statusBg: '#fef3c7', avatar: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Serafina Black', status: 'PENDING', tier: 'Waitlist', dietary: '—', statusColor: '#64748b', statusBg: '#f1f5f9', avatar: 'https://via.placeholder.com/100' },
  { id: 4, name: 'Marcus Finch', status: 'ARRIVED', tier: 'Gold Member', dietary: 'Nut Allergy', statusColor: '#10b981', statusBg: '#d1fae5', avatar: 'https://via.placeholder.com/100' },
];

export default function AttendeeManagementScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Localite</Text>
        <View style={styles.avatar}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatarImg} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Event Header */}
        <View style={styles.eventHeader}>
          <Text style={styles.eventLabel}>EXCLUSIVE EVENT MANAGEMENT</Text>
          <Text style={styles.eventTitle}>The Winter Masquerade</Text>
          <Text style={styles.eventSubtitle}>Grand Ballroom • Dec 22, 2023</Text>
        </View>

        {/* Search & Filters */}
        <View style={styles.filtersSection}>
          <View style={styles.filterChips}>
            <TouchableOpacity style={styles.chip}>
              <MaterialIcons name="restaurant" size={16} color="#775a19" />
              <Text style={styles.chipText}>DIETARY REQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip}>
              <MaterialIcons name="star" size={16} color="#775a19" />
              <Text style={styles.chipText}>ELITE STATUS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color="#75777e" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search guests..."
              placeholderTextColor="#75777e"
            />
          </View>
        </View>

        {/* Attendee List */}
        <View style={styles.listContainer}>
          {attendees.map(guest => (
            <View key={guest.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.userInfo}>
                  <Image source={{ uri: guest.avatar }} style={styles.userAvatar} />
                  <View>
                    <Text style={styles.userName}>{guest.name}</Text>
                    <Text style={styles.userSub}>{guest.tier} • {guest.dietary}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.cardBottom}>
                <View style={styles.statusContainer}>
                  <Text style={styles.statusLabel}>STATUS</Text>
                  <View style={[styles.statusBadge, { backgroundColor: guest.statusBg }]}>
                    <Text style={[styles.statusText, { color: guest.statusColor }]}>{guest.status}</Text>
                  </View>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialIcons name="chat-bubble-outline" size={20} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>VIEW</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>LOAD MORE GUESTS</Text>
          <MaterialIcons name="expand-more" size={20} color="#775a19" />
        </TouchableOpacity>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('TicketQRCode')}>
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
