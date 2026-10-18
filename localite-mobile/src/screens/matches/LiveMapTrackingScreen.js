import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
  Animated,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { colors } from '../../theme';

export default function LiveMapTrackingScreen() {
  const navigation = useNavigation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetAnim] = useState(new Animated.Value(0));

  const toggleSheet = () => {
    const toValue = sheetOpen ? 0 : 1;
    Animated.timing(sheetAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setSheetOpen(!sheetOpen);
  };

  const translateY = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [220, 0],
  });

  const membersInTransit = [
    {
      id: 1,
      name: 'Sophia Valente',
      tier: 'Active Player',
      destination: 'Heritage Sports Complex, Court 4',
      eta: '4 MINS AWAY',
      status: 'In Transit',
      lat: 51.505,
      lng: -0.132,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    },
    {
      id: 2,
      name: 'Julian Thorne',
      tier: 'Verified Member',
      destination: 'Courtside Bench North',
      eta: 'ARRIVED',
      status: 'On Site',
      lat: 51.5074,
      lng: -0.1278,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Live Member Transit Map</Text>
          <Text style={styles.headerSub}>Real-time coordination for Event #1</Text>
        </View>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 51.5074,
            longitude: -0.1278,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
          userInterfaceStyle="light"
        >
          {/* Destination Marker */}
          <Marker
            coordinate={{ latitude: 51.5074, longitude: -0.1278 }}
            title="Heritage Sports Complex"
            description="Event Venue"
            pinColor={colors.accent}
          />
          {/* Member Markers */}
          {membersInTransit.map((member) => (
            <Marker
              key={member.id}
              coordinate={{ latitude: member.lat, longitude: member.lng }}
              title={member.name}
              description={`${member.status} • ${member.eta}`}
              pinColor={member.status === 'On Site' ? colors.accent : '#E67E22'}
            />
          ))}
        </MapView>

        {/* Map Controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.controlBtn}>
            <MaterialIcons name="my-location" size={20} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        {/* Bottom Sheet */}
        <Animated.View style={[styles.bottomSheet, { transform: [{ translateY }] }]}>
          <TouchableOpacity style={styles.sheetHandleArea} onPress={toggleSheet}>
            <View style={styles.sheetHandle} />
          </TouchableOpacity>

          <View style={styles.sheetContent}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Members in Transit</Text>
              <Text style={styles.sheetSub}>2 Members Registered</Text>
            </View>

            <ScrollView style={styles.transitList} showsVerticalScrollIndicator={false}>
              {membersInTransit.map((m) => (
                <View key={m.id} style={styles.transitCard}>
                  <View style={styles.transitAvatarWrap}>
                    <Image source={{ uri: m.avatar }} style={styles.transitAvatar} />
                    <View
                      style={[
                        styles.statusDot,
                        m.status === 'On Site'
                          ? { backgroundColor: colors.accent }
                          : { backgroundColor: '#E67E22' },
                      ]}
                    />
                  </View>
                  <View style={styles.transitInfo}>
                    <View style={styles.transitRow}>
                      <Text style={styles.transitName}>{m.name}</Text>
                      <View
                        style={[
                          styles.etaChip,
                          m.status === 'On Site'
                            ? { backgroundColor: '#EDF5F0' }
                            : { backgroundColor: '#FEF3C7' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.etaChipText,
                            m.status === 'On Site' ? { color: colors.accent } : { color: '#B45309' },
                          ]}
                        >
                          {m.eta}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.transitDesc}>{m.destination}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 6,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerSub: {
    fontSize: 10,
    color: '#6B6B6B',
    marginTop: 2,
  },
  liveIndicator: {
    padding: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapControls: {
    position: 'absolute',
    top: 16,
    right: 16,
    gap: 8,
  },
  controlBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  sheetHandleArea: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
  },
  sheetContent: {
    paddingHorizontal: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sheetTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  sheetSub: {
    fontSize: 11,
    color: '#6B6B6B',
  },
  transitList: {
    maxHeight: 180,
  },
  transitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F6F3',
    gap: 12,
  },
  transitAvatarWrap: {
    position: 'relative',
  },
  transitAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F6F3',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  transitInfo: {
    flex: 1,
  },
  transitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transitName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  etaChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  etaChipText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  transitDesc: {
    fontSize: 11,
    color: '#6B6B6B',
    marginTop: 2,
  },
});
