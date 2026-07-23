import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

export default function CreateEventLocationPickerScreen() {
  const navigation = useNavigation();
  const [selectedVenue, setSelectedVenue] = useState(null);

  const venues = [
    { id: 1, name: 'The Gilded Library', match: '94% MATCH', desc: 'Quiet • Coworking • Mayfair', img: 'https://via.placeholder.com/300', lat: 51.5115, lng: -0.1472 },
    { id: 2, name: 'Atlas Botanica', match: 'TOP RATED', desc: 'Lively • Coffee • Soho', img: 'https://via.placeholder.com/300', lat: 51.5137, lng: -0.1353 },
    { id: 3, name: 'Vault No. 7', match: 'PRIVATE', desc: 'Mood • Jazz • Chelsea', img: 'https://via.placeholder.com/300', lat: 51.4877, lng: -0.1685 }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Localite</Text>
        <View style={styles.avatarWrap}>
          {/* Avatar placeholder */}
        </View>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTextRow}>
          <Text style={styles.stepText}>STEP 2 OF 6</Text>
          <Text style={styles.stepTitle}>LOCATION</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '33.33%' }]} />
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 51.5074,
            longitude: -0.1278,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          userInterfaceStyle="light"
        >
          {venues.map(v => (
            <Marker
              key={v.id}
              coordinate={{ latitude: v.lat, longitude: v.lng }}
              title={v.name}
              description={v.desc}
              pinColor={selectedVenue?.id === v.id ? '#775a19' : '#44474d'}
              onPress={() => setSelectedVenue(v)}
            />
          ))}
        </MapView>

        {/* Search Bar Overlay */}
        <View style={styles.searchWrap}>
          <View style={styles.searchInputWrap}>
            <MaterialIcons name="search" size={20} color="#75777e" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput} 
              placeholder="Search Third Places" 
              placeholderTextColor="#75777e"
            />
            <MaterialIcons name="my-location" size={20} color="#775a19" style={styles.locationIcon} />
          </View>
        </View>

        {/* Pin (Central Anchor) */}
        <View style={styles.pinWrap}>
          <View style={[styles.tooltip, selectedVenue ? { opacity: 1 } : { opacity: 0 }]}>
            <Text style={styles.tooltipLabel}>Set Venue Here</Text>
            <Text style={styles.tooltipName}>{selectedVenue?.name || 'Selecting...'}</Text>
          </View>
          <MaterialIcons name="location-on" size={48} color="#775a19" />
        </View>

        {/* Bottom Bento: Suggested Venues */}
        <View style={styles.bottomSheet}>
          <Text style={styles.suggestedTitle}>SUGGESTED VENUES</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueList}>
            {venues.map(v => (
              <TouchableOpacity 
                key={v.id} 
                style={[styles.venueCard, selectedVenue?.id === v.id && styles.venueCardActive]}
                onPress={() => setSelectedVenue(v)}
              >
                <View style={styles.venueImgWrap}>
                  <Image source={{ uri: v.img }} style={styles.venueImg} />
                  <View style={styles.badgeWrap}>
                    <Text style={styles.badgeText}>{v.match}</Text>
                  </View>
                </View>
                <View style={styles.venueInfo}>
                  <Text style={styles.venueName}>{v.name}</Text>
                  <Text style={styles.venueDesc}>{v.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.manualBtn}>
              <Text style={styles.manualText}>ENTER ADDRESS MANUALLY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={() => navigation.navigate('CreateEventRichDescription')}>
              <Text style={styles.confirmText}>CONFIRM LOCATION</Text>
            </TouchableOpacity>
          </View>
        </View>

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
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    letterSpacing: -0.5,
  },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eae8e7',
  },
  progressWrap: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fbf9f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
    zIndex: 5,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  stepText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
  },
  stepTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    textTransform: 'uppercase',
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: '#eae8e7',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#775a19',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  searchWrap: {
    position: 'absolute',
    top: 24,
    left: 24,
    right: 24,
    zIndex: 20,
  },
  searchInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#eae8e7',
  },
  searchIcon: { marginRight: 12 },
  searchInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000',
  },
  locationIcon: { marginLeft: 12 },
  pinWrap: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -48 }],
    alignItems: 'center',
    zIndex: 10,
  },
  tooltip: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  tooltipLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#eae8e7',
    textTransform: 'uppercase',
  },
  tooltipName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 14,
    color: '#fff',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    zIndex: 20,
    backgroundColor: 'transparent', // Uses map bg mostly, but has content
  },
  suggestedTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    marginBottom: 16,
    letterSpacing: 1,
  },
  venueList: {
    paddingBottom: 24,
    gap: 16,
  },
  venueCard: {
    width: 240,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eae8e7',
    overflow: 'hidden',
  },
  venueCardActive: {
    borderColor: '#775a19',
    borderWidth: 2,
  },
  venueImgWrap: {
    height: 96,
    position: 'relative',
    backgroundColor: '#efeded',
  },
  venueImg: {
    width: '100%',
    height: '100%',
  },
  badgeWrap: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
  },
  venueInfo: {
    padding: 12,
  },
  venueName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  venueDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#75777e',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
  },
  manualBtn: {
    flex: 1,
    backgroundColor: '#f5f3f3',
    borderWidth: 1,
    borderColor: '#775a19',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manualText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
    textAlign: 'center',
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 4,
  },
  confirmText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    letterSpacing: 1,
    textAlign: 'center',
  }
});
