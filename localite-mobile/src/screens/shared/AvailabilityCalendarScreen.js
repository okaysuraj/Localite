import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AvailabilityCalendarScreen() {
  const navigation = useNavigation();
  const [selectedSlots, setSelectedSlots] = useState({
    'MON-MORNING': false, 'MON-AFTERNOON': false, 'MON-EVENING': true,
    'TUE-MORNING': false, 'TUE-AFTERNOON': false, 'TUE-EVENING': true,
    'WED-MORNING': false, 'WED-AFTERNOON': false, 'WED-EVENING': false,
    'THU-MORNING': false, 'THU-AFTERNOON': false, 'THU-EVENING': true,
    'FRI-MORNING': false, 'FRI-AFTERNOON': false, 'FRI-EVENING': true,
    'SAT-MORNING': false, 'SAT-AFTERNOON': false, 'SAT-EVENING': true,
    'SUN-MORNING': false, 'SUN-AFTERNOON': false, 'SUN-EVENING': true,
  });

  const [prioritySync, setPrioritySync] = useState(true);
  const [guestDiscovery, setGuestDiscovery] = useState(false);

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const times = [
    { id: 'MORNING', icon: 'light-mode' },
    { id: 'AFTERNOON', icon: 'wb-sunny' },
    { id: 'EVENING', icon: 'dark-mode' }
  ];

  const toggleSlot = (day, time) => {
    const key = `${day}-${time}`;
    setSelectedSlots(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <View style={styles.avatarWrap}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8xw7fMG7n1nyv3YTNChFFwXVIqQsTEUzlcXFRfj4KbTIxk7A83D7tVSjmkjAnF0Nm-lN8wEOUryx5adya7NB32-i2YYzuzlYQto4CzHHoYvaWgfyI8pqp8ec-t6NEOJA_scLc8kxPfMfqFWfwP43Xlrs_G4Bbx7GasSixeNbKhr7DTIrcmyS3bjVCkyPh8aKk9MOjb0rHsDR4YZ1xPMIC-oLeEgb4j2rlB6JVhczMFwDiad2B5dq3yA' }} 
            style={styles.avatarImg} 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.pageInfo}>
          <Text style={styles.pageTitle}>Weekly Availability</Text>
          <Text style={styles.pageDesc}>
            Define your preferred gathering times. This helps the community sync with your curated schedule.
          </Text>
        </View>

        {/* Availability Grid Wrapper */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gridScroll}>
          <View style={styles.gridContainer}>
            {days.map(day => (
              <View key={day} style={styles.dayCol}>
                <Text style={styles.dayTitle}>{day}</Text>
                {times.map(time => {
                  const key = `${day}-${time.id}`;
                  const isSelected = selectedSlots[key];
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[styles.timeSlot, isSelected && styles.timeSlotSelected]}
                      onPress={() => toggleSlot(day, time.id)}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons 
                        name={time.icon} 
                        size={20} 
                        color={isSelected ? '#fff' : '#000'} 
                      />
                      <Text style={[styles.timeSlotText, isSelected && styles.timeSlotTextSelected]}>
                        {time.id}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Additional Preferences Section */}
        <View style={styles.prefsSection}>
          <Text style={styles.prefsTitle}>Notification Tiers</Text>
          
          <TouchableOpacity style={styles.prefItem} activeOpacity={0.8} onPress={() => setPrioritySync(!prioritySync)}>
            <View style={styles.prefTextWrap}>
              <Text style={styles.prefItemTitle}>Priority Sync</Text>
              <Text style={styles.prefItemDesc}>Alert me immediately for evening slots</Text>
            </View>
            <Switch
              value={prioritySync}
              onValueChange={setPrioritySync}
              trackColor={{ false: '#c5c6cd', true: '#775a19' }}
              thumbColor="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.prefItem} activeOpacity={0.8} onPress={() => setGuestDiscovery(!guestDiscovery)}>
            <View style={styles.prefTextWrap}>
              <Text style={styles.prefItemTitle}>Guest Discovery</Text>
              <Text style={styles.prefItemDesc}>Allow hubs to see my general availability</Text>
            </View>
            <Switch
              value={guestDiscovery}
              onValueChange={setGuestDiscovery}
              trackColor={{ false: '#c5c6cd', true: '#775a19' }}
              thumbColor="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Pro Tip */}
        <View style={styles.proTipBox}>
          <View style={styles.proTipContent}>
            <Text style={styles.proTipHeader}>PRO TIP</Text>
            <Text style={styles.proTipText}>Friday & Saturday evenings are peak social hours in your local Hub.</Text>
          </View>
          <MaterialIcons name="auto-awesome" size={80} color="rgba(119, 90, 25, 0.1)" style={styles.proTipIcon} />
        </View>

      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.saveBtnText}>SAVE SCHEDULE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetBtn}>
          <Text style={styles.resetBtnText}>RESET</Text>
        </TouchableOpacity>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    letterSpacing: -0.5,
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#eae8e7',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingTop: 24,
    paddingBottom: 140, // Space for bottom bar
  },
  pageInfo: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  pageTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 8,
  },
  pageDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
  },
  gridScroll: {
    marginBottom: 32,
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
  },
  dayCol: {
    gap: 12,
  },
  dayTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    textAlign: 'center',
    letterSpacing: 1,
  },
  timeSlot: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: 'rgba(119, 90, 25, 0.2)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 80,
  },
  timeSlotSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  timeSlotText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000',
    textTransform: 'uppercase',
  },
  timeSlotTextSelected: {
    color: '#fff',
  },
  prefsSection: {
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(197, 198, 205, 0.3)',
    paddingTop: 24,
  },
  prefsTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 16,
  },
  prefItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  prefTextWrap: {
    flex: 1,
    paddingRight: 16,
  },
  prefItemTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
  },
  prefItemDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
  },
  proTipBox: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  proTipContent: {
    position: 'relative',
    zIndex: 1,
  },
  proTipHeader: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
    marginBottom: 8,
  },
  proTipText: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    maxWidth: '80%',
  },
  proTipIcon: {
    position: 'absolute',
    top: -10,
    right: -20,
    opacity: 0.5,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(197, 198, 205, 0.3)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  resetBtn: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: '#75777e',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000',
    letterSpacing: 1,
  }
});
