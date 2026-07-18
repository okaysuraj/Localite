import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ReportEventScreen() {
  const navigation = useNavigation();
  const [selectedReason, setSelectedReason] = useState('misleading');
  const [details, setDetails] = useState('');

  const reasons = [
    { id: 'misleading', icon: 'info', label: 'Misleading Info' },
    { id: 'safety', icon: 'gpp-maybe', label: 'Safety Concerns' },
    { id: 'illegal', icon: 'gavel', label: 'Illegal Activity' },
    { id: 'spam', icon: 'sentiment-dissatisfied', label: 'Spam or Inappropriate' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Event</Text>
        <View style={styles.avatarWrap}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABD8stMizR2Q1UIgCWjtRbsSPaCIXs8XS0TMP2WtK17sUpzuL14QfrGbgTNSonKgjVsWlmLaYmF0TnvXJa2LxH4tFi3TO8rG6EEzkJ0YVDgt9sTUAThvEWxrPdsp00w3nOZtCd9ohdLqv3E_vAi3pupC6CRxyvNddYDUWU96aiNBh-e8Q3V1cIDXJQP_MLHeB4YPHdW2KY5BtW6gT5GLDdcyX0Dfi-bRFKoMNU2wy-yUiZoMbzovKx2g' }}
            style={styles.avatarImg}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Event Snippet */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>REPORTING CONTENT</Text>
          <View style={styles.eventCard}>
            <View style={styles.eventImgWrap}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZUbWAvdk4D1J5pA77pISmJEiJoKx_LR6_97e34q3Bb3luDktTv_50zxr8AUNdSgW8zLFfGDS0PiYcB0Fx-ej_JPb2R9AOStv2q3HxQU0SRyMtLNZAg21Jy34LsOLK0Oov6eHVv03BOJXcrfYya_Our45emxtAq7IB7vhrfgKJQti6loSU1chEEFhmd8KmbgFaF48MPN4AWD_aaueT02Q-RV3ytLmWcORTEevveOSciExGUuPCg6NkaQ' }}
                style={styles.eventImg}
              />
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventName}>Vintage Garden Soiree</Text>
              <Text style={styles.eventHost}>Hosted by The Heritage Club</Text>
              <View style={styles.eventDateWrap}>
                <MaterialIcons name="calendar-today" size={12} color="#775a19" />
                <Text style={styles.eventDate}>OCT 24, 6:00 PM</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Reason Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SELECT REASON</Text>
          <View style={styles.reasonsList}>
            {reasons.map(reason => {
              const isSelected = selectedReason === reason.id;
              return (
                <TouchableOpacity 
                  key={reason.id} 
                  style={[styles.reasonItem, isSelected && styles.reasonItemSelected]}
                  onPress={() => setSelectedReason(reason.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.reasonLeft}>
                    <MaterialIcons name={reason.icon} size={24} color="#775a19" />
                    <Text style={styles.reasonLabel}>{reason.label}</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color="#75777e" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Additional Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ADDITIONAL DETAILS</Text>
          <View style={styles.textAreaWrap}>
            <TextInput 
              style={styles.textArea}
              placeholder="Please describe the issue in detail..."
              placeholderTextColor="#75777e"
              multiline
              textAlignVertical="top"
              value={details}
              onChangeText={setDetails}
              maxLength={500}
            />
            <Text style={[styles.charCount, details.length > 450 && { color: '#ba1a1a' }]}>
              {details.length} / 500
            </Text>
          </View>
          <Text style={styles.helperText}>
            Our moderation team reviews all reports within 24 hours. Your privacy is paramount; the host will not be notified of who filed this report.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsWrap}>
          <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.submitBtnText}>SUBMIT REPORT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelBtnText}>CANCEL</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fbf9f8',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
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
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#c5c6cd',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 2,
    marginBottom: 8,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e4e2e2',
  },
  eventImgWrap: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  eventImg: {
    width: '100%',
    height: '100%',
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    marginBottom: 4,
  },
  eventHost: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    marginBottom: 8,
  },
  eventDateWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventDate: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#1b1c1c',
  },
  reasonsList: {
    gap: 12,
  },
  reasonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  reasonItemSelected: {
    backgroundColor: '#fff',
    borderColor: '#775a19',
  },
  reasonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reasonLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
  },
  textAreaWrap: {
    position: 'relative',
  },
  textArea: {
    height: 160,
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000',
  },
  charCount: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
  },
  helperText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
    fontStyle: 'italic',
    marginTop: 12,
    lineHeight: 18,
  },
  actionsWrap: {
    gap: 12,
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 4,
  },
  submitBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  cancelBtn: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#775a19',
  },
  cancelBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 2,
  }
});
