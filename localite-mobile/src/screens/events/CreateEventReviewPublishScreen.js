import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

export default function CreateEventReviewPublishScreen() {
  const navigation = useNavigation();
  const [successVisible, setSuccessVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handlePublish = () => {
    setSuccessVisible(true);
  };

  const handleSuccessClose = () => {
    setSuccessVisible(false);
    navigation.navigate('CreateEventSuccessState'); // Navigate to the dedicated success screen if we have one, or Home
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Localite</Text>
        <View style={styles.avatarWrap}>
          {/* Avatar placeholder */}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.progressHeader}>
          <View style={styles.titleRow}>
            <Text style={styles.pageTitle}>Review & Publish</Text>
            <Text style={styles.stepText}>STEP 6 OF 6</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '100%' }]} />
          </View>
        </View>

        <Text style={styles.introText}>
          Your event is almost ready to go live. Take a final look at the details before sharing it with the community.
        </Text>

        {/* Summary Card */}
        <View style={styles.card}>
          <View style={styles.imageWrap}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.previewTag}>
              <Text style={styles.previewTagText}>PREVIEW MODE</Text>
            </View>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.eventTitle}>Midnight Garden Soirée</Text>
            <Text style={styles.eventDesc}>
              An exclusive evening of artisanal cocktails, live jazz, and botanical exploration under the stars at the historic Montgomery Estates.
            </Text>

            <View style={styles.gridInfo}>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Date & Time</Text>
                <View style={styles.gridRow}>
                  <MaterialIcons name="calendar-today" size={16} color="#775a19" />
                  <Text style={styles.gridValue}>Sept 24, 2024 • 8:00 PM</Text>
                </View>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Location</Text>
                <View style={styles.gridRow}>
                  <MaterialIcons name="location-on" size={16} color="#775a19" />
                  <Text style={styles.gridValue}>Bel Air Estates, CA</Text>
                </View>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Admission</Text>
                <View style={styles.gridRow}>
                  <MaterialIcons name="payments" size={16} color="#775a19" />
                  <Text style={styles.gridValue}>$125.00 / person</Text>
                </View>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Capacity</Text>
                <View style={styles.gridRow}>
                  <MaterialIcons name="group" size={16} color="#775a19" />
                  <Text style={styles.gridValue}>50 Guests Max</Text>
                </View>
              </View>
            </View>

            {/* Map Integration */}
            <View style={styles.mapContainer}>
              <MapView
                style={styles.mapView}
                initialRegion={{
                  latitude: 51.5074,
                  longitude: -0.1278,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                userInterfaceStyle="light"
              >
                <Marker
                  coordinate={{ latitude: 51.5074, longitude: -0.1278 }}
                  title="Event Venue"
                  pinColor="#775a19"
                />
              </MapView>
            </View>
          </View>
        </View>

        {/* Terms */}
        <TouchableOpacity style={styles.termsRow} onPress={() => setTermsAccepted(!termsAccepted)}>
          <View style={[styles.checkbox, termsAccepted && styles.checkboxActive]}>
            {termsAccepted && <MaterialIcons name="check" size={16} color="#fff" />}
          </View>
          <Text style={styles.termsText}>
            I confirm that all provided event details are accurate and adhere to the Localite community guidelines for premium local gatherings.
          </Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footerActions}>
        <TouchableOpacity style={styles.draftBtn}>
          <Text style={styles.draftText}>Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.publishBtn, !termsAccepted && styles.publishBtnDisabled]} 
          onPress={handlePublish}
          disabled={!termsAccepted}
        >
          <Text style={styles.publishText}>Publish Event</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal visible={successVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.successIconWrap}>
              <MaterialIcons name="verified" size={48} color="#785a1a" />
            </View>
            <Text style={styles.modalTitle}>Event Published</Text>
            <Text style={styles.modalDesc}>
              Your event is now live and visible to the Localite community. Invitations are being sent to relevant members.
            </Text>
            
            <TouchableOpacity style={styles.modalPrimaryBtn}>
              <Text style={styles.modalPrimaryText}>VIEW PUBLIC PAGE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalSecondaryBtn} onPress={handleSuccessClose}>
              <Text style={styles.modalSecondaryText}>BACK TO DASHBOARD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    paddingBottom: 100,
  },
  progressHeader: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  pageTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
  },
  stepText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
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
  introText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eae8e7',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 4,
    marginBottom: 24,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#e4e2e2',
    position: 'relative',
  },
  imagePlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#d6e3ff',
    opacity: 0.2,
  },
  previewTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(251, 249, 248, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  previewTagText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  cardContent: {
    padding: 24,
  },
  eventTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 8,
  },
  eventDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
    marginBottom: 24,
  },
  gridInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    paddingTop: 24,
    gap: 24,
  },
  gridItem: {
    width: '45%',
  },
  gridLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gridValue: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#000',
  },
  mapContainer: {
    marginTop: 24,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#c5c6cd',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: '#775a19',
    borderColor: '#775a19',
  },
  termsText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
  },
  footerActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fbf9f8',
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    gap: 16,
  },
  draftBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#775a19',
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  publishBtn: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#775a19',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  publishBtnDisabled: {
    opacity: 0.5,
  },
  publishText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(251, 249, 248, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 10,
  },
  successIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#fed488',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  modalPrimaryBtn: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  modalPrimaryText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 1,
  },
  modalSecondaryBtn: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#c5c6cd',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalSecondaryText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#44474d',
    letterSpacing: 1,
  }
});
