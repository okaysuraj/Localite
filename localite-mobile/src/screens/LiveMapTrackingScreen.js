import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, Image, ImageBackground, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LiveMapTrackingScreen() {
  const navigation = useNavigation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetAnim] = useState(new Animated.Value(0)); // 0 = closed, 1 = open

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
    outputRange: [300, 0], // adjust based on sheet height
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Event Map</Text>
        <View style={styles.avatar}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatarImg} />
        </View>
      </View>

      <View style={styles.mapContainer}>
        <ImageBackground 
          source={{ uri: 'https://via.placeholder.com/800x1200' }} 
          style={styles.mapImage}
        >
          {/* Destination Pin */}
          <View style={[styles.pinContainer, { top: '40%', left: '50%' }]}>
            <View style={styles.destBadge}>
              <MaterialIcons name="castle" size={16} color="#775a19" />
              <Text style={styles.destText}>The Willows Estate</Text>
            </View>
            <View style={styles.destDot} />
          </View>

          {/* Member Pin 1 */}
          <View style={[styles.pinContainer, { top: '60%', left: '30%' }]}>
            <View style={styles.memberPin}>
              <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.memberImg} />
              <View style={styles.etaBadge}>
                <Text style={styles.etaText}>4m</Text>
              </View>
            </View>
            <View style={styles.pulseDot} />
          </View>

          {/* Map Controls */}
          <View style={styles.mapControls}>
            <TouchableOpacity style={styles.controlBtn}>
              <MaterialIcons name="my-location" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn}>
              <MaterialIcons name="layers" size={24} color="#000" />
            </TouchableOpacity>
          </View>

        </ImageBackground>

        {/* Bottom Sheet */}
        <Animated.View style={[styles.bottomSheet, { transform: [{ translateY }] }]}>
          <TouchableOpacity style={styles.sheetHandleArea} onPress={toggleSheet}>
            <View style={styles.sheetHandle} />
          </TouchableOpacity>
          
          <View style={styles.sheetContent}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>In Transit</Text>
              <Text style={styles.sheetSub}>4 Members Arriving</Text>
            </View>

            <ScrollView style={styles.transitList}>
              <TouchableOpacity style={styles.transitCard}>
                <View style={styles.transitAvatarWrap}>
                  <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.transitAvatar} />
                  <View style={styles.statusDot} />
                </View>
                <View style={styles.transitInfo}>
                  <View style={styles.transitRow}>
                    <Text style={styles.transitName}>Lady Elena Rossi</Text>
                    <View style={styles.etaChip}>
                      <Text style={styles.etaChipText}>4 MINS AWAY</Text>
                    </View>
                  </View>
                  <Text style={styles.transitDesc}>Via Mayfair Luxury Car</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#75777e" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.transitCard}>
                <View style={styles.transitAvatarWrap}>
                  <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.transitAvatar} />
                  <View style={styles.statusDot} />
                </View>
                <View style={styles.transitInfo}>
                  <View style={styles.transitRow}>
                    <Text style={styles.transitName}>Sir Arthur Sterling</Text>
                    <View style={styles.etaChip}>
                      <Text style={styles.etaChipText}>12 MINS AWAY</Text>
                    </View>
                  </View>
                  <Text style={styles.transitDesc}>Via Private Chauffeur</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#75777e" />
              </TouchableOpacity>
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
    backgroundColor: '#fbf9f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
    backgroundColor: '#fbf9f8',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eae8e7',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  pinContainer: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  destBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#775a19',
    gap: 6,
    marginBottom: 8,
  },
  destText: {
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
  },
  destDot: {
    width: 12,
    height: 12,
    backgroundColor: '#000',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#775a19',
  },
  memberPin: {
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ffdea5',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  memberImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#775a19',
  },
  etaBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#775a19',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  etaText: {
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
  },
  pulseDot: {
    width: 10,
    height: 10,
    backgroundColor: '#775a19',
    borderRadius: 5,
  },
  mapControls: {
    position: 'absolute',
    right: 24,
    top: 24,
    gap: 12,
  },
  controlBtn: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 16,
    height: 400,
  },
  sheetHandleArea: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  sheetHandle: {
    width: 48,
    height: 6,
    backgroundColor: '#eae8e7',
    borderRadius: 3,
  },
  sheetContent: {
    paddingHorizontal: 24,
    flex: 1,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sheetTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  sheetSub: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#44474d',
  },
  transitList: {
    flex: 1,
  },
  transitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    gap: 16,
  },
  transitAvatarWrap: {
    position: 'relative',
  },
  transitAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  statusDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    backgroundColor: '#10b981',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#f5f3f3',
  },
  transitInfo: {
    flex: 1,
  },
  transitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  transitName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000',
  },
  etaChip: {
    backgroundColor: '#fed488',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  etaChipText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#785a1a',
  },
  transitDesc: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
  },
});
