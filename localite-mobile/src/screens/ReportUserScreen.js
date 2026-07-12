import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Image, Alert
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function ReportUserScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('inappropriate');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!details.trim()) {
      Alert.alert("Missing Details", "Please provide details about the incident.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const payload = {
        targetType: 'USER',
        targetId: 1, // Mocked target ID
        reason: selectedCategory,
        details: details.trim()
      };

      const res = await fetch(`${API_URL}/reports`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        Alert.alert("Report Submitted", "Thank you for your report. The administrative team has been notified.", [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.appBarSafe}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Report Member</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Maintain the Standard</Text>
            <Text style={styles.headerDesc}>
              The Royal Assemblage thrives on mutual respect. Please provide objective details regarding the incident to help us preserve our community integrity.
            </Text>
          </View>

          {/* User Profile Snippet */}
          <View style={styles.userSnippet}>
            <View style={styles.userAvatarWrap}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE9mX9u5u1JWV1-_YpKrXBRWWHfsKbLUx5SVFfWZwQWkXK5orB27miXK-2BsrM1De0t0kcjVphxB6MuffQ5cyzYPHB5GIbetzIXGWKrNh4Dpd0WtOdwoXzoPMQPFuPmO0mGyncJssUmFOP-pmepdsQfEQIR2B1gqb_mgUsPos2CeufZ0p4fCf8uXMI99VNjnBc7ZhsPOrNtfOpYS4oBgepmTOAt3epSDsBj9n8T5wYnGvz59uRy0v3yg' }}
                style={styles.userAvatar}
              />
            </View>
            <View style={styles.userInfoWrap}>
              <Text style={styles.userRoleLabel}>REPORTING ACCOUNT</Text>
              <Text style={styles.userName}>Julian Vane</Text>
              <Text style={styles.userSub}>Community Member since 2022</Text>
            </View>
          </View>

          {/* Category Selection */}
          <Text style={styles.sectionLabel}>SELECT CATEGORY</Text>
          <View style={styles.categoryGrid}>
            <TouchableOpacity 
              style={[styles.categoryOption, selectedCategory === 'harassment' && styles.categoryOptionActive]}
              onPress={() => setSelectedCategory('harassment')}
            >
              <View style={styles.categoryOptionLeft}>
                <MaterialIcons name="gavel" size={24} color="#775a19" />
                <Text style={styles.categoryOptionText}>Harassment</Text>
              </View>
              {selectedCategory === 'harassment' && <MaterialIcons name="check-circle" size={20} color="#775a19" />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.categoryOption, selectedCategory === 'inappropriate' && styles.categoryOptionActive]}
              onPress={() => setSelectedCategory('inappropriate')}
            >
              <View style={styles.categoryOptionLeft}>
                <MaterialIcons name="error-outline" size={24} color="#775a19" />
                <Text style={[styles.categoryOptionText, selectedCategory === 'inappropriate' && styles.categoryOptionTextActive]}>Inappropriate Behavior</Text>
              </View>
              {selectedCategory === 'inappropriate' && <MaterialIcons name="check-circle" size={20} color="#775a19" />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.categoryOption, selectedCategory === 'spam' && styles.categoryOptionActive]}
              onPress={() => setSelectedCategory('spam')}
            >
              <View style={styles.categoryOptionLeft}>
                <MaterialIcons name="mail-lock" size={24} color="#775a19" />
                <Text style={styles.categoryOptionText}>Spam or Misconduct</Text>
              </View>
              {selectedCategory === 'spam' && <MaterialIcons name="check-circle" size={20} color="#775a19" />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.categoryOption, selectedCategory === 'other' && styles.categoryOptionActive]}
              onPress={() => setSelectedCategory('other')}
            >
              <View style={styles.categoryOptionLeft}>
                <MaterialIcons name="more-horiz" size={24} color="#775a19" />
                <Text style={styles.categoryOptionText}>Other Concerns</Text>
              </View>
              {selectedCategory === 'other' && <MaterialIcons name="check-circle" size={20} color="#775a19" />}
            </TouchableOpacity>
          </View>

          {/* Details TextArea */}
          <Text style={styles.sectionLabel}>DETAILS OF THE INCIDENT</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={6}
            placeholder="Please describe what happened in as much detail as possible..."
            placeholderTextColor="rgba(117, 119, 126, 0.5)"
            value={details}
            onChangeText={setDetails}
            textAlignVertical="top"
          />

          {/* Evidence Attachment */}
          <Text style={styles.sectionLabel}>ATTACH EVIDENCE</Text>
          <TouchableOpacity style={styles.uploadArea}>
            <MaterialIcons name="cloud-upload" size={32} color="#775a19" style={{ marginBottom: 8 }} />
            <Text style={styles.uploadTitle}>Upload Screenshots or Documents</Text>
            <Text style={styles.uploadSub}>PNG, JPG or PDF up to 10MB</Text>
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={isSubmitting}>
              <Text style={styles.submitBtnText}>{isSubmitting ? 'SUBMITTING...' : 'Submit Formal Report'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelBtnText}>Cancel and Return</Text>
            </TouchableOpacity>
          </View>

          {/* Informational Footer */}
          <View style={styles.infoFooter}>
            <MaterialIcons name="verified-user" size={24} color="#775a19" />
            <View style={styles.infoFooterTextWrap}>
              <Text style={styles.infoFooterTitle}>Our Confidentiality Commitment</Text>
              <Text style={styles.infoFooterDesc}>
                Your report will be reviewed by the Protocol Committee within 24 hours. The identity of the reporter remains strictly anonymous unless legal action requires disclosure.
              </Text>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
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
    fontFamily: 'PlayfairDisplay_600SemiBold',
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
  headerTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 28,
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  headerDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 24,
  },
  userSnippet: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#775a19',
    marginBottom: 32,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 2,
  },
  userAvatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    marginRight: 16,
  },
  userAvatar: {
    width: '100%',
    height: '100%',
  },
  userInfoWrap: {
    flex: 1,
  },
  userRoleLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
    marginBottom: 4,
  },
  userName: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 2,
  },
  userSub: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#44474d',
  },
  sectionLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 16,
    marginTop: 16,
  },
  categoryGrid: {
    gap: 12,
    marginBottom: 16,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryOptionActive: {
    borderColor: '#775a19',
    backgroundColor: '#ffffff',
  },
  categoryOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryOptionText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
  },
  categoryOptionTextActive: {
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  textArea: {
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#000000',
    height: 140,
    marginBottom: 16,
  },
  uploadArea: {
    height: 160,
    backgroundColor: '#f5f3f3',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#c5c6cd',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  uploadTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#000000',
    marginBottom: 4,
  },
  uploadSub: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 10,
    color: '#44474d',
  },
  actionButtons: {
    gap: 16,
    marginBottom: 32,
  },
  submitBtn: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  submitBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cancelBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#775a19',
  },
  cancelBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  infoFooter: {
    flexDirection: 'row',
    backgroundColor: 'rgba(254, 212, 136, 0.1)',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  infoFooterTextWrap: {
    flex: 1,
  },
  infoFooterTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 16,
    color: '#775a19',
    marginBottom: 8,
  },
  infoFooterDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#785a1a',
    lineHeight: 18,
  }
});
