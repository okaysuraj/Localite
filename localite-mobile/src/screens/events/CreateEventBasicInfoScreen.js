import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CreateEventBasicInfoScreen() {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState('');
  const [audience, setAudience] = useState('');
  const [narrative, setNarrative] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localite</Text>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatarImg} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Progress */}
          <View style={styles.progressWrap}>
            <View style={styles.progressTextRow}>
              <Text style={styles.stepText}>STEP 1 OF 6</Text>
              <Text style={styles.stepTitle}>Basic Information</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '16.66%' }]} />
            </View>
          </View>

          {/* Form Header */}
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>The Foundation</Text>
            <Text style={styles.formDesc}>
              Define the core identity of your event. Choose a name that resonates and a narrative that captivates your local community.
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>EVENT NAME</Text>
              <TextInput 
                style={styles.input} 
                placeholder="e.g., Midnight Jazz at The Foundry"
                placeholderTextColor="#c5c6cd"
                value={eventName}
                onChangeText={setEventName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CATEGORY</Text>
              <View style={styles.selectWrapper}>
                <TextInput 
                  style={styles.input} 
                  placeholder="Select a category"
                  placeholderTextColor="#c5c6cd"
                  value={category}
                  onChangeText={setCategory}
                />
                <MaterialIcons name="expand-more" size={24} color="#775a19" style={styles.selectIcon} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>AUDIENCE</Text>
              <View style={styles.selectWrapper}>
                <TextInput 
                  style={styles.input} 
                  placeholder="Public Gathering"
                  placeholderTextColor="#c5c6cd"
                  value={audience}
                  onChangeText={setAudience}
                />
                <MaterialIcons name="lock" size={20} color="#775a19" style={styles.selectIcon} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>EVENT NARRATIVE</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="Describe the atmosphere, the people, and the purpose..."
                placeholderTextColor="#c5c6cd"
                value={narrative}
                onChangeText={setNarrative}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
              <Text style={styles.recommendedText}>Recommended: 150 - 300 words</Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer Actions */}
        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveText}>SAVE DRAFT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('CreateEventDateTime')}>
            <Text style={styles.continueText}>CONTINUE</Text>
            <MaterialIcons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    overflow: 'hidden',
    backgroundColor: '#eae8e7',
  },
  avatarImg: { width: '100%', height: '100%' },
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
    color: '#775a19',
    letterSpacing: 2,
  },
  stepTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
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
  form: {
    gap: 24,
  },
  inputGroup: {},
  label: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000',
  },
  selectWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  selectIcon: {
    position: 'absolute',
    right: 16,
  },
  textArea: {
    height: 120,
  },
  recommendedText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    textAlign: 'right',
    marginTop: 8,
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    backgroundColor: '#fbf9f8',
  },
  saveBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  saveText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#75777e',
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
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
