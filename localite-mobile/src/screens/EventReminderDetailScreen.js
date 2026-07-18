import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function EventReminderDetailScreen() {
  const navigation = useNavigation();
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMinutes(prev => {
        if (prev === 0) {
          if (hours > 0) {
            setHours(h => h - 1);
            return 59;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, [hours]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Localite</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="notifications" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} bounces={false}>
        
        {/* Hero Section */}
        <View style={styles.heroWrap}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsrYjTqgwvMOOoku1Lr2WGig20d_H7IZVxr0LnkvRdCYAMgoQNxFuuzpyiKJBKLPE8-IaPKY8kbd83Ag-uK4DnjrhKMVCUy9Je_yF7jLY2shJT0BoMDAYNFQHyrtH_vDCMtMJXU4Ba32NowowEpVZMDEjWAgVSk1MP_Ad92xpw7QMrHBA7B3rRNy4Lrdr67Qt6T-Q468XM8wfwcOWeTop94CU-C-tRwHijV5Pzt8GmnKqkMTAK-gav5g' }} 
            style={styles.heroImg} 
          />
          <View style={styles.heroOverlay} />
        </View>

        {/* Content Card (overlapping hero) */}
        <View style={styles.cardContainer}>
          <View style={styles.reminderCard}>
            <Text style={styles.badgeText}>UPCOMING EVENT</Text>
            <Text style={styles.eventTitle}>The Winter Masquerade</Text>
            <Text style={styles.eventSubtitle}>“A Night of Veiled Elegance”</Text>
            
            {/* Countdown */}
            <View style={styles.countdownRow}>
              <View style={styles.countBlock}>
                <Text style={styles.countNumber}>{hours.toString().padStart(2, '0')}</Text>
                <Text style={styles.countLabel}>HOURS</Text>
              </View>
              <Text style={styles.countNumber}>:</Text>
              <View style={styles.countBlock}>
                <Text style={styles.countNumber}>{minutes.toString().padStart(2, '0')}</Text>
                <Text style={styles.countLabel}>MINS</Text>
              </View>
            </View>

            <View style={styles.statusBox}>
              <MaterialIcons name="auto-awesome" size={20} color="#775a19" />
              <Text style={styles.statusText}>Arriving in {hours} hours</Text>
            </View>

            {/* Details Grid */}
            <View style={styles.detailsGrid}>
              <View style={styles.detailCol}>
                <Text style={styles.detailLabel}>LOCATION</Text>
                <View style={styles.detailRow}>
                  <MaterialIcons name="location-on" size={18} color="#775a19" />
                  <Text style={styles.detailText}>Palais Garnier, Paris</Text>
                </View>
              </View>
              <View style={styles.detailCol}>
                <Text style={styles.detailLabel}>ATTIRE</Text>
                <View style={styles.detailRow}>
                  <MaterialIcons name="checkroom" size={18} color="#775a19" />
                  <Text style={styles.detailText}>Black Tie & Mask Required</Text>
                </View>
              </View>
            </View>

            {/* Action */}
            <TouchableOpacity style={styles.mainActionBtn} onPress={() => navigation.navigate('EntryPass')}>
              <Text style={styles.mainActionBtnText}>VIEW ENTRY PASS</Text>
            </TouchableOpacity>
          </View>

          {/* Supporting Info */}
          <View style={styles.supportInfo}>
            <Text style={styles.supportText}>Your chauffeur has been alerted and will arrive at 7:15 PM.</Text>
            <View style={styles.supportLinks}>
              <TouchableOpacity>
                <Text style={styles.linkText}>MODIFY BOOKING</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.linkText}>CONTACT CONCIERGE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>
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
    backgroundColor: 'rgba(251, 249, 248, 0.85)',
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000',
    letterSpacing: 1,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    letterSpacing: -0.5,
  },
  iconBtn: {
    padding: 4,
  },
  content: {
    flexGrow: 1,
  },
  heroWrap: {
    width: '100%',
    height: Platform.OS === 'ios' ? 400 : 350,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(251, 249, 248, 0.5)',
  },
  cardContainer: {
    marginTop: Platform.OS === 'ios' ? 200 : 180,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  reminderCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
    marginBottom: 16,
  },
  eventTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  eventSubtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 24,
  },
  countBlock: {
    alignItems: 'center',
  },
  countNumber: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 36,
    color: '#000',
  },
  countLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f5f3f3',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  statusText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000',
  },
  detailsGrid: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#c5c6cd',
    paddingTop: 24,
    gap: 16,
  },
  detailCol: {
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#000',
  },
  mainActionBtn: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  mainActionBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  supportInfo: {
    marginTop: 24,
    alignItems: 'center',
  },
  supportText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    textAlign: 'center',
    marginBottom: 16,
  },
  supportLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  linkText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
    textDecorationLine: 'underline',
  }
});
