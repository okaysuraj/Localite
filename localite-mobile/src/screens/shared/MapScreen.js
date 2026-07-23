import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Platform,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const FILTERS = ['NEAR ME', 'SOCIAL', 'SPORTS', 'CAFES', 'GATHERINGS'];

export default function MapScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState('NEAR ME');
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Mock markers
  const markers = [
    { id: 1, type: 'cafe', title: 'CAFÉ NOIR', top: '35%', left: '45%' },
    { id: 2, type: 'sports', title: 'CLUB COURT', top: '20%', left: '25%' },
    { id: 3, type: 'social', title: 'SOCIAL GARDEN', top: '60%', left: '55%' },
  ];

  const getMarkerIcon = (type) => {
    switch(type) {
      case 'cafe': return 'restaurant';
      case 'sports': return 'tennisball';
      case 'social': return 'people';
      default: return 'location';
    }
  };

  const getMarkerColor = (type) => {
    switch(type) {
      case 'cafe': return '#000000'; // primary
      case 'sports': return '#775a19'; // secondary
      case 'social': return '#0d1c32'; // primary-container
      default: return '#000000';
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Map Placeholder */}
      <ImageBackground 
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0TDe9b7AICO9jjtO1GrE0Mwpw11dUTlv7dudUsS4D7ccPMgoYnC8_fWYQ1tD49gfwaWi0L76EqNsixT_YINq4rRCs4BG-eLjBGYIRFjb3XuW5NYASFmXQaty6SB2ugDn1ZRSVPSNm8jHBrqD1zkbVacw2VQnPHlxVk6zSMu9-ZMt1gtyCn7bRAXq-oQwfi-uj-1X1APMiXXp81aYBYGiFFvswoA1_DgsuMPCw9FmKhwzErZ4c2UuCfQ' }}
        style={styles.mapBackground}
      >
        {/* Top App Bar Overlay */}
        <SafeAreaView style={styles.safeAreaOverlay}>
          <View style={[styles.appBar, { marginTop: Platform.OS === 'android' ? insets.top : 0 }]}>
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
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBanyrDvcvhDd9E7Uao1bWhf5_uUaUGOiwpUgLUU4TpJMGAHrr4dI9oGK52o1zsOJL_-mRbWeP9SfxbpFx09mjs61rHwcJhcWwZOttIPIMVPokl-rM5kbkuUQK2iDAYQm6TQW40cI8T035fRoslBxNRX0YRwinSqBVjurzSsZDmY731fwhg8JtjrKzNm5vk8VvC0WTGcU0s7lXlTyFkdPUJGINzNz1ztwV4Br6lP6ISvjOPyhfWTJscbA' }} 
                  style={styles.profileImg} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search & Filters */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#75777e" />
              <Text style={styles.searchPlaceholder}>Find hubs, events, or peers...</Text>
              <View style={{ flex: 1 }} />
              <TouchableOpacity style={styles.filterBtn}>
                <Ionicons name="options" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
              {FILTERS.map((filter, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.filterChip, 
                    selectedFilter === filter && styles.filterChipActive
                  ]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text style={[
                    styles.filterChipText,
                    selectedFilter === filter && styles.filterChipTextActive
                  ]}>{filter}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>

        {/* Mock Markers */}
        {markers.map((marker) => (
          <TouchableOpacity 
            key={marker.id} 
            style={[styles.markerContainer, { top: marker.top, left: marker.left }]}
            onPress={() => setSelectedMarker(marker)}
            activeOpacity={0.8}
          >
            <View style={[styles.markerBubble, { backgroundColor: getMarkerColor(marker.type) }]}>
              <Ionicons name={getMarkerIcon(marker.type)} size={18} color="#ffffff" />
            </View>
            <View style={[styles.markerStem, { backgroundColor: getMarkerColor(marker.type) }]} />
            
            {selectedMarker?.id === marker.id && (
              <View style={styles.markerLabel}>
                <Text style={styles.markerLabelText}>{marker.title}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* Bottom Sheet Overlay for Selected Marker */}
        {selectedMarker && (
          <View style={styles.bottomSheet}>
            <View style={styles.sheetDragHandle} />
            
            <View style={styles.sheetHeader}>
              <View style={styles.sheetHeaderLeft}>
                <Text style={styles.sheetStatus}>ACTIVE NOW</Text>
                <Text style={styles.sheetTitle}>{selectedMarker.title === 'SOCIAL GARDEN' ? 'Weekend Art Soirée' : selectedMarker.title}</Text>
                <View style={styles.sheetLocationRow}>
                  <Ionicons name="location-outline" size={16} color="#44474d" />
                  <Text style={styles.sheetLocationText}>Le Marais, 4th Arr.</Text>
                </View>
              </View>
              <View style={styles.sheetHeaderRight}>
                <View style={styles.avatarStack}>
                  <Image source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBUaEwGVPMkVrwEF3O_F3yKYvmQkuewIcNiVDZsb4_3ePNdO_al2AYsIUwj9BL0NegMgEHV4-VfLXVZH2s9kpk_ZdA0tvnuLzP9Bd2lCJ7_4C7xP2OAVA6lOU53I1FMrAQBFjvLTsfZBOEi5gnuVbB1unyFh0QcJHL1FRHyMedJu3a75xqI0SiKA2h5fqgbKFPhqoChreVTWjOnG9qFZmzXtR5SSux0OYcxPMmCMh5Q72XfFrGmJuT0w'}} style={styles.stackAvatar} />
                  <Image source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE-BEwk_rtWU7KwlzdcmalKlq_jBv4T2o04tda69nobt3OC980ulezKYCqHP5JPsur1xLLumAhbqscTDrHAOL_xF2AT-8-DVCicWINq0YHuYubjQDfc1lQzVu7RR20BCEDrNuxoh_G8tCo8_JrqNAIeFkxeQ3sn-e2Vh6UNrdwnKc54JBSY9n5o-oyHqOwdAYWa26QENYvEX4LNuEGYSG2XDQc2MKKaPsQ2-8y1UaHpt4fBRjVKFEN2Q'}} style={[styles.stackAvatar, { marginLeft: -12 }]} />
                  <View style={[styles.stackAvatarMore, { marginLeft: -12 }]}>
                    <Text style={styles.stackMoreText}>+12</Text>
                  </View>
                </View>
                <Text style={styles.joinedText}>15 JOINED</Text>
              </View>
            </View>

            <View style={styles.bentoGrid}>
              <View style={styles.bentoItem}>
                <View style={styles.bentoRow}>
                  <Ionicons name="time-outline" size={16} color="#775a19" />
                  <Text style={styles.bentoLabel}>TIME</Text>
                </View>
                <Text style={styles.bentoValue}>19:00 - 22:30</Text>
              </View>
              <View style={styles.bentoItem}>
                <View style={styles.bentoRow}>
                  <Ionicons name="ticket-outline" size={16} color="#775a19" />
                  <Text style={styles.bentoLabel}>ENTRY</Text>
                </View>
                <Text style={styles.bentoValue}>Invitation Only</Text>
              </View>
            </View>

            <Text style={styles.sheetDescription}>
              An evening of contemporary art, artisanal cocktails, and networking with local creatives. This weekend's hub features live installations from emerging sculptors.
            </Text>

            <TouchableOpacity style={styles.joinBtn}>
              <Text style={styles.joinBtnText}>REQUEST TO JOIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewBtn}>
              <Text style={styles.viewBtnText}>VIEW HUB DETAILS</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Map Controls */}
        <View style={styles.mapControls}>
          <View style={styles.zoomControls}>
            <TouchableOpacity style={styles.controlBtn}>
              <Ionicons name="add" size={24} color="#000000" />
            </TouchableOpacity>
            <View style={styles.controlDivider} />
            <TouchableOpacity style={styles.controlBtn}>
              <Ionicons name="remove" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.locationBtn}>
            <Ionicons name="locate" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  mapBackground: {
    width: '100%',
    height: '100%',
  },
  safeAreaOverlay: {
    width: '100%',
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(251, 249, 248, 0.95)',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 4,
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appBarTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
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
  searchContainer: {
    alignItems: 'center',
    paddingTop: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 249, 248, 0.9)',
    borderRadius: 30,
    width: '90%',
    paddingVertical: 6,
    paddingHorizontal: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 5,
  },
  searchPlaceholder: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#75777e',
    marginLeft: 12,
  },
  filterBtn: {
    backgroundColor: '#000000',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersScroll: {
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(251, 249, 248, 0.85)',
    borderWidth: 1,
    borderColor: '#c5c6cd',
    marginRight: 8,
  },
  filterChipActive: {
    borderColor: '#775a19',
    backgroundColor: 'rgba(251, 249, 248, 0.95)',
  },
  filterChipText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#000000',
    letterSpacing: 1,
  },
  filterChipTextActive: {
    color: '#775a19',
  },
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  markerBubble: {
    padding: 10,
    borderRadius: 20,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  markerStem: {
    width: 4,
    height: 12,
    marginTop: -2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  markerLabel: {
    marginTop: 4,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  markerLabelText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#000000',
    letterSpacing: 0.5,
  },
  mapControls: {
    position: 'absolute',
    right: 24,
    bottom: 120, // Above bottom tab nav and sheet
    alignItems: 'center',
    zIndex: 5,
  },
  zoomControls: {
    backgroundColor: 'rgba(251, 249, 248, 0.9)',
    borderRadius: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  controlBtn: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlDivider: {
    height: 1,
    backgroundColor: 'rgba(197, 198, 205, 0.3)',
    width: '100%',
  },
  locationBtn: {
    backgroundColor: '#775a19',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 65, // Above bottom tab nav
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: -16 },
    shadowOpacity: 0.15,
    shadowRadius: 48,
    elevation: 20,
    zIndex: 20,
  },
  sheetDragHandle: {
    width: 48,
    height: 6,
    backgroundColor: '#c5c6cd',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 24,
    opacity: 0.5,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  sheetHeaderLeft: {
    flex: 1,
  },
  sheetStatus: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
    marginBottom: 4,
  },
  sheetTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 4,
  },
  sheetLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sheetLocationText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
    marginLeft: 4,
  },
  sheetHeaderRight: {
    alignItems: 'flex-end',
  },
  avatarStack: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  stackAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  stackAvatarMore: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: '#efeded',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackMoreText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#000000',
  },
  joinedText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  bentoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  bentoItem: {
    flex: 1,
    backgroundColor: '#fbf9f8',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.3)',
    marginHorizontal: 4,
  },
  bentoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bentoLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginLeft: 6,
  },
  bentoValue: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: '#000000',
  },
  sheetDescription: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 22,
    marginBottom: 24,
  },
  joinBtn: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  joinBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1,
  },
  viewBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#75777e',
    alignItems: 'center',
  },
  viewBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#000000',
    letterSpacing: 1,
  }
});
