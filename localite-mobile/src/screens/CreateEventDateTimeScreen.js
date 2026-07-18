import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CreateEventDateTimeScreen() {
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState(13);
  const [isRepeat, setIsRepeat] = useState(false);
  const [duration, setDuration] = useState('2 HRS');

  // Mock days
  const days = [];
  for (let i = 1; i <= 26; i++) {
    days.push(i);
  }

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

      <ScrollView contentContainerStyle={styles.content}>
        {/* Progress */}
        <View style={styles.progressWrap}>
          <View style={styles.progressTextRow}>
            <Text style={styles.stepText}>STEP 3 OF 6</Text>
            <Text style={styles.stepTitle}>50% Complete</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '50%' }]} />
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Select Date & Time</Text>
          <Text style={styles.formDesc}>
            When is this exclusive gathering taking place? Choose a date and set the perfect timing.
          </Text>
        </View>

        {/* Calendar Card */}
        <View style={styles.card}>
          <View style={styles.calendarHeader}>
            <Text style={styles.monthTitle}>October 2024</Text>
            <View style={styles.calendarNav}>
              <TouchableOpacity style={styles.navBtn}>
                <MaterialIcons name="chevron-left" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navBtn}>
                <MaterialIcons name="chevron-right" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.calendarGrid}>
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <Text key={day} style={styles.dayLabel}>{day}</Text>
            ))}
            {/* Empty slots for start of month */}
            <Text style={styles.disabledDay}>29</Text>
            <Text style={styles.disabledDay}>30</Text>
            
            {days.map(day => (
              <TouchableOpacity 
                key={day} 
                style={[styles.dayCell, selectedDay === day && styles.dayCellActive]}
                onPress={() => setSelectedDay(day)}
              >
                <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Time Picker Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>START TIME</Text>
          <View style={styles.timePickerContainer}>
            <View style={styles.timeRow}>
              <View style={styles.timeBox}>
                <Text style={styles.timeVal}>07</Text>
              </View>
              <Text style={styles.timeDivider}>:</Text>
              <View style={styles.timeBox}>
                <Text style={styles.timeVal}>30</Text>
              </View>
            </View>
            <View style={styles.amPmRow}>
              <TouchableOpacity style={styles.amPmBtnActive}>
                <Text style={styles.amPmTextActive}>AM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.amPmBtn}>
                <Text style={styles.amPmText}>PM</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.cardLabel}>DURATION</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.durationRow}>
            {['1 HR', '2 HRS', '3 HRS', 'ALL DAY'].map(dur => (
              <TouchableOpacity 
                key={dur} 
                style={[styles.durationBtn, duration === dur && styles.durationBtnActive]}
                onPress={() => setDuration(dur)}
              >
                <Text style={[styles.durationText, duration === dur && styles.durationTextActive]}>{dur}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Repeat Toggle */}
        <View style={[styles.card, styles.repeatCard]}>
          <View style={styles.repeatLeft}>
            <View style={styles.repeatIconWrap}>
              <MaterialIcons name="repeat" size={20} color="#785a1a" />
            </View>
            <View>
              <Text style={styles.repeatTitle}>Repeat Event</Text>
              <Text style={styles.repeatSub}>Weekly on Sundays</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.toggleWrap, isRepeat && styles.toggleWrapActive]}
            onPress={() => setIsRepeat(!isRepeat)}
          >
            <View style={[styles.toggleCircle, isRepeat && styles.toggleCircleActive]} />
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footerActions}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={18} color="#775a19" />
          <Text style={styles.backText}>PREVIOUS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('CreateEventLocationPicker')}>
          <Text style={styles.continueText}>CONTINUE TO LOCATION</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#fff" />
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
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  progressWrap: {
    marginBottom: 32,
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
    color: '#75777e',
    letterSpacing: 2,
  },
  stepTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000',
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
    backgroundColor: '#000',
  },
  formHeader: {
    marginBottom: 24,
  },
  formTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 8,
  },
  formDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(234, 232, 231, 0.5)',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  monthTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  calendarNav: {
    flexDirection: 'row',
    gap: 8,
  },
  navBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f3f3',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayLabel: {
    width: '14.28%',
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    marginBottom: 16,
  },
  disabledDay: {
    width: '14.28%',
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: 'rgba(117, 119, 126, 0.3)',
    paddingVertical: 12,
  },
  dayCell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  dayCellActive: {
    backgroundColor: '#000',
  },
  dayText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000',
  },
  dayTextActive: {
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  cardLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    marginBottom: 16,
    letterSpacing: 1,
  },
  timePickerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  timeBox: {
    backgroundColor: '#f5f3f3',
    width: 80,
    height: 96,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeVal: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 48,
    color: '#000',
  },
  timeDivider: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 48,
    color: '#000',
  },
  amPmRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f3f3',
    borderRadius: 8,
    padding: 4,
    width: '100%',
  },
  amPmBtnActive: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  amPmBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  amPmTextActive: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000',
  },
  amPmText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#75777e',
  },
  divider: {
    height: 1,
    backgroundColor: '#eae8e7',
    marginBottom: 16,
  },
  durationRow: {
    gap: 8,
    paddingBottom: 8,
  },
  durationBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eae8e7',
  },
  durationBtnActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  durationText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#44474d',
  },
  durationTextActive: {
    color: '#fff',
  },
  repeatCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  repeatLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  repeatIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#fed488',
    alignItems: 'center',
    justifyContent: 'center',
  },
  repeatTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
  },
  repeatSub: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
  },
  toggleWrap: {
    width: 48,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#eae8e7',
    padding: 2,
  },
  toggleWrapActive: {
    backgroundColor: '#000',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  toggleCircleActive: {
    transform: [{ translateX: 24 }],
  },
  footerActions: {
    flexDirection: 'row',
    gap: 16,
    padding: 24,
    backgroundColor: '#fbf9f8',
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
  },
  backBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#775a19',
    borderRadius: 30,
    paddingVertical: 16,
  },
  backText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
  },
  continueBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  continueText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
  }
});
