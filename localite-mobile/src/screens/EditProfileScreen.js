import React, { useState, useContext } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, Platform 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

export default function EditProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);

  const [fullName, setFullName] = useState(user?.username || 'Julian Thorne');
  const [profession, setProfession] = useState('Investment Principal');
  const [location, setLocation] = useState('Mayfair, London');
  const [bio, setBio] = useState('Curating experiences at the intersection of venture capital and urban aesthetics.');

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.appBarSafe}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Edit Profile</Text>
          <View style={{ width: 40 }} /> {/* Placeholder */}
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Header Text */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Refine your presence</Text>
          <Text style={styles.subtitle}>Your details help us curate better connections within the Localite community.</Text>
        </View>

        {/* Avatar Module */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={{ uri: user?.profileImageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkvYDpsT5_Ard-BX-mzAHAt6zYa5qXH_a1zcbBHe1YjzWrgwyYxMen7NuH-yTVEIWQurX7PswHbf122vQEYIDW6zD6FtfwkXbadbRqVZ82rfaC4CcLEM1sQR-4WHKm9rrzIAbfV10VYWZmRj-JxvX1FzPCo4hrXnsD6N012H5HfSrQoGXG4beDMEcFfH1m6Iuvjb_uTwM69tM3div17HaNZIFXYEZHs-NL93egEcpIo6HKnm4FwBe7VA' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.cameraBtn}>
              <MaterialIcons name="photo-camera" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Verified Localite</Text>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput 
              style={styles.input} 
              value={fullName}
              onChangeText={setFullName}
              placeholder="Your full name"
              placeholderTextColor="#75777e"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Profession</Text>
            <TextInput 
              style={styles.input} 
              value={profession}
              onChangeText={setProfession}
              placeholder="e.g. Design Architect"
              placeholderTextColor="#75777e"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Primary Location</Text>
            <View style={styles.locationInputWrapper}>
              <MaterialIcons name="location-on" size={20} color="#75777e" style={styles.locationIcon} />
              <TextInput 
                style={[styles.input, { paddingLeft: 40 }]} 
                value={location}
                onChangeText={setLocation}
                placeholder="City or District"
                placeholderTextColor="#75777e"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Personal Narrative (Bio)</Text>
            <TextInput 
              style={styles.textArea} 
              value={bio}
              onChangeText={setBio}
              placeholder="Share your story, interests..."
              placeholderTextColor="#75777e"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{bio.length} / 300 characters</Text>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.saveBtnText}>SAVE PROFILE</Text>
        </TouchableOpacity>

        {/* Privacy Notice */}
        <View style={styles.privacyNotice}>
          <MaterialIcons name="shield" size={20} color="#775a19" style={{ marginTop: 2 }} />
          <View style={styles.privacyTextContainer}>
            <Text style={styles.privacyTitle}>Privacy Guarantee</Text>
            <Text style={styles.privacyText}>Your data is only visible to verified members of the hubs you have joined.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  appBarSafe: {
    backgroundColor: '#fbf9f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconBtn: {
    padding: 8,
    marginLeft: -8,
  },
  appBarTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 28,
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 22,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000000',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  verifiedBadge: {
    backgroundColor: '#fed488',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#785a1a',
    textTransform: 'uppercase',
  },
  formSection: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#44474d',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#1b1c1c',
  },
  locationInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  locationIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  textArea: {
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#1b1c1c',
    minHeight: 100,
  },
  charCount: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 11,
    color: '#75777e',
    textAlign: 'right',
    marginTop: 4,
  },
  saveBtn: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#0a192f',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  saveBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1,
  },
  privacyNotice: {
    flexDirection: 'row',
    backgroundColor: '#f5f3f3',
    padding: 16,
    borderRadius: 12,
  },
  privacyTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  privacyTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    color: '#000000',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  privacyText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#44474d',
    lineHeight: 18,
  }
});
