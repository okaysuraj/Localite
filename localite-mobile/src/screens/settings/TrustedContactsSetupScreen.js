import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Switch, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TrustedContactsSetupScreen() {
  const navigation = useNavigation();
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Royal Assemblage</Text>
        <View style={styles.avatarWrap}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFpdz0_5ObiTCv-HJ1nuC25PUy9jZKwSyEcSTx4UIwPqlyC7-o_amhjJIECWIhUCP7Mxn-sLJaoQSnnWBu6_nPyug75YoQB-V2fzermkdTG2GzNKS_4hOnZUoCAEAYCOlBwnUdAzRBroffOuK90kh66o9Hv0ZbTLLyfoVpBynZNuLeKbF_QEY6jmFVzvdd9k46YP9tBY1e_fPZtofs1pzv2Wwh4zbB7dxL9xkESvhbDfCndQEK_6UnyQ' }}
            style={styles.avatarImg}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Explainer Section */}
        <View style={styles.explainerSection}>
          <Text style={styles.preTitle}>SAFETY & SECURITY</Text>
          <Text style={styles.title}>Trusted Circles</Text>
          
          <View style={styles.explainerCard}>
            <View style={styles.bgIconWrap}>
              <MaterialIcons name="verified-user" size={120} color="rgba(0,0,0,0.03)" style={{ position: 'absolute', right: -20, top: -20 }} />
            </View>
            <Text style={styles.explainerText}>
              Localite ensures your peace of mind by maintaining a discrete tether to those who matter most. When active, your live status and precise location are shared exclusively with your chosen inner circle during emergencies or late-night gatherings.
            </Text>
            <View style={styles.encryptionRow}>
              <MaterialIcons name="lock" size={16} color="#775a19" />
              <Text style={styles.encryptionText}>END-TO-END ENCRYPTED DATA</Text>
            </View>
          </View>
        </View>

        {/* Current Contacts List */}
        <View style={styles.contactsSection}>
          <View style={styles.contactsHeader}>
            <Text style={styles.sectionTitle}>Current Contacts</Text>
            <Text style={styles.slotsText}>2 of 5 slots filled</Text>
          </View>

          <View style={styles.contactsList}>
            {/* Contact 1 */}
            <View style={styles.contactCard}>
              <View style={styles.contactInfo}>
                <View style={styles.contactInitialsWrap}>
                  <Text style={styles.contactInitials}>EH</Text>
                </View>
                <View>
                  <Text style={styles.contactName}>Eleanor Hamilton</Text>
                  <Text style={styles.contactDesc}>Sister • +44 20 7946 0958</Text>
                </View>
              </View>
              <View style={styles.contactControls}>
                <Text style={styles.toggleLabel}>Notify all events</Text>
                <Switch 
                  value={toggle1}
                  onValueChange={setToggle1}
                  trackColor={{ false: '#e4e2e2', true: '#775a19' }}
                  thumbColor={'#fff'}
                  ios_backgroundColor="#e4e2e2"
                />
              </View>
            </View>

            {/* Contact 2 */}
            <View style={styles.contactCard}>
              <View style={styles.contactInfo}>
                <View style={styles.contactInitialsWrap}>
                  <Text style={styles.contactInitials}>JR</Text>
                </View>
                <View>
                  <Text style={styles.contactName}>Julian Ross</Text>
                  <Text style={styles.contactDesc}>Partner • +44 20 7946 0122</Text>
                </View>
              </View>
              <View style={styles.contactControls}>
                <Text style={styles.toggleLabel}>Notify all events</Text>
                <Switch 
                  value={toggle2}
                  onValueChange={setToggle2}
                  trackColor={{ false: '#e4e2e2', true: '#775a19' }}
                  thumbColor={'#fff'}
                  ios_backgroundColor="#e4e2e2"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Add Contact CTA */}
        <TouchableOpacity style={styles.addContactBtn}>
          <MaterialIcons name="person-add" size={24} color="#fed488" />
          <Text style={styles.addContactText}>ADD TRUSTED CONTACT</Text>
        </TouchableOpacity>

        {/* Footer Info */}
        <View style={styles.footerInfo}>
          <MaterialIcons name="info" size={20} color="#775a19" />
          <Text style={styles.footerInfoText}>
            Contacts will receive a formal invitation via SMS to join your Trusted Circle. They must accept before their status sharing becomes active.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="event-upcoming" size={24} color="#44474d" />
          <Text style={styles.navText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="explore" size={24} color="#44474d" />
          <Text style={styles.navText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="ballot" size={24} color="#44474d" />
          <Text style={styles.navText}>Polls</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color="#775a19" />
          <Text style={[styles.navText, { color: '#775a19', fontWeight: 'bold' }]}>Profile</Text>
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
    paddingBottom: 100,
  },
  explainerSection: {
    marginBottom: 32,
  },
  preTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 24,
  },
  explainerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  bgIconWrap: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: 0,
  },
  explainerText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 28,
    marginBottom: 24,
    position: 'relative',
    zIndex: 1,
  },
  encryptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'relative',
    zIndex: 1,
  },
  encryptionText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  contactsSection: {
    marginBottom: 32,
  },
  contactsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  slotsText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
  },
  contactsList: {
    gap: 16,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 2,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  contactInitialsWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c5c6cd',
  },
  contactInitials: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
  },
  contactName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#000',
    marginBottom: 2,
  },
  contactDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 10,
    color: '#44474d',
  },
  contactControls: {
    alignItems: 'flex-end',
    gap: 4,
  },
  toggleLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 10,
    color: '#44474d',
  },
  addContactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 32,
  },
  addContactText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#c5c6cd',
  },
  footerInfoText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  }
});
