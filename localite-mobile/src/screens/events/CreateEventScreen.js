import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert, ScrollView, Platform, Dimensions, Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createEvent } from '../../services/api';

const { width } = Dimensions.get('window');

export default function CreateEventScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Epicurean',
    eventType: 'Public',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
    cost: '',
    rules: '',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000'
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleCreate = async () => {
    if (!formData.title || !formData.date || !formData.location) {
      Alert.alert('Error', 'Please fill required fields (Title, Date, Location)');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        cost: parseFloat(formData.cost) || 0.0,
        maxAttendees: parseInt(formData.maxAttendees) || 0,
        attendees: 0
      };

      await createEvent(payload);
      
      Alert.alert('Success', 'Event Published Successfully!');
      setFormData({
        title: '', category: 'Epicurean', eventType: 'Public', description: '', date: '', location: '', maxAttendees: '', cost: '', rules: '', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000'
      });
      setStep(1);
      navigation.navigate('Discover');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to publish event');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      <Text style={styles.stepText}>STEP 0{step} / 04</Text>
      <View style={styles.stepLine}></View>
    </View>
  );

  const renderFoundation = () => (
    <View style={styles.formSection}>
      {renderStepIndicator()}
      <Text style={styles.sectionTitle}>The Foundation</Text>
      <Text style={styles.sectionDesc}>Begin your journey by defining the core identity of your gathering.</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Event Name</Text>
        <TextInput 
          style={styles.input}
          value={formData.title}
          onChangeText={(text) => handleChange('title', text)}
          placeholder="e.g. Midnight Soirée at the Gallery"
          placeholderTextColor="#75777e"
        />
      </View>

      <View style={styles.fieldRow}>
        <View style={[styles.field, {flex: 1, marginRight: 12}]}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.selectWrapper}>
            <TextInput 
              style={styles.input}
              value={formData.category}
              onChangeText={(text) => handleChange('category', text)}
              placeholder="e.g. Epicurean"
              placeholderTextColor="#75777e"
            />
          </View>
        </View>
        <View style={[styles.field, {flex: 1}]}>
          <Text style={styles.label}>Audience</Text>
          <View style={styles.selectWrapper}>
            <TextInput 
              style={styles.input}
              value={formData.eventType}
              onChangeText={(text) => handleChange('eventType', text)}
              placeholder="Public or Private"
              placeholderTextColor="#75777e"
            />
          </View>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>The Narrative</Text>
        <TextInput 
          style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
          multiline
          value={formData.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Describe the atmosphere..."
          placeholderTextColor="#75777e"
        />
      </View>
    </View>
  );

  const renderTimePlace = () => (
    <View style={styles.formSection}>
      {renderStepIndicator()}
      <Text style={styles.sectionTitle}>Time & Place</Text>
      <Text style={styles.sectionDesc}>When and where will this experience unfold?</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Date & Time</Text>
        <TextInput 
          style={styles.input}
          value={formData.date}
          onChangeText={(text) => handleChange('date', text)}
          placeholder="e.g. 2024-10-24T20:00:00"
          placeholderTextColor="#75777e"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Location</Text>
        <TextInput 
          style={styles.input}
          value={formData.location}
          onChangeText={(text) => handleChange('location', text)}
          placeholder="e.g. The Glass Conservatory"
          placeholderTextColor="#75777e"
        />
      </View>
      
      <View style={styles.field}>
        <Text style={styles.label}>Cover Image URL</Text>
        <TextInput 
          style={styles.input}
          value={formData.imageUrl}
          onChangeText={(text) => handleChange('imageUrl', text)}
          placeholder="https://..."
          placeholderTextColor="#75777e"
        />
      </View>
    </View>
  );

  const renderCapacityRules = () => (
    <View style={styles.formSection}>
      {renderStepIndicator()}
      <Text style={styles.sectionTitle}>Capacity & Etiquette</Text>
      <Text style={styles.sectionDesc}>Set the boundaries for your gathering.</Text>

      <View style={styles.fieldRow}>
        <View style={[styles.field, {flex: 1, marginRight: 12}]}>
          <Text style={styles.label}>Max Attendees</Text>
          <TextInput 
            style={styles.input}
            value={formData.maxAttendees}
            onChangeText={(text) => handleChange('maxAttendees', text)}
            keyboardType="numeric"
            placeholder="0 for unlimited"
            placeholderTextColor="#75777e"
          />
        </View>
        <View style={[styles.field, {flex: 1}]}>
          <Text style={styles.label}>Cost (USD)</Text>
          <TextInput 
            style={styles.input}
            value={formData.cost}
            onChangeText={(text) => handleChange('cost', text)}
            keyboardType="numeric"
            placeholder="0 for free"
            placeholderTextColor="#75777e"
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>House Rules</Text>
        <TextInput 
          style={[styles.input, {height: 80, textAlignVertical: 'top'}]}
          multiline
          value={formData.rules}
          onChangeText={(text) => handleChange('rules', text)}
          placeholder="e.g. Black tie dress code..."
          placeholderTextColor="#75777e"
        />
      </View>
    </View>
  );

  const renderReview = () => (
    <View style={styles.formSection}>
      {renderStepIndicator()}
      <Text style={styles.sectionTitle}>Review & Publish</Text>
      <Text style={styles.sectionDesc}>Ensure every detail reflects the premium experience you're curating.</Text>

      <View style={styles.previewCard}>
        <Image source={{ uri: formData.imageUrl }} style={styles.previewImage} />
        <View style={styles.previewOverlay}>
          <Text style={styles.previewTitle}>{formData.title || 'Untitled Event'}</Text>
        </View>
        
        <View style={styles.previewContent}>
          <View style={styles.previewGrid}>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>DATE</Text>
              <Text style={styles.previewVal}>{formData.date || 'TBD'}</Text>
            </View>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>LOCATION</Text>
              <Text style={styles.previewVal}>{formData.location || 'TBD'}</Text>
            </View>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>CATEGORY</Text>
              <Text style={styles.previewVal}>{formData.category || 'TBD'}</Text>
            </View>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>COST</Text>
              <Text style={styles.previewVal}>${formData.cost || '0'}</Text>
            </View>
          </View>
          <Text style={styles.previewDesc}>{formData.description || 'No description provided.'}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top AppBar */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Localite</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#44474d" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.wizardContainer}>
          {step === 1 && renderFoundation()}
          {step === 2 && renderTimePlace()}
          {step === 3 && renderCapacityRules()}
          {step === 4 && renderReview()}
        </View>
      </ScrollView>

      {/* Action Footer */}
      <View style={styles.footerBar}>
        <TouchableOpacity 
          style={[styles.footerBtnLeft, step === 1 && { opacity: 0 }]} 
          onPress={handleBack}
          disabled={step === 1}
        >
          <Ionicons name="arrow-back" size={16} color="#44474d" />
          <Text style={styles.footerBtnLeftText}>BACK</Text>
        </TouchableOpacity>
        
        {step < 4 ? (
          <TouchableOpacity style={styles.footerBtnRight} onPress={handleNext}>
            <Text style={styles.footerBtnRightText}>CONTINUE</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.footerBtnRight, { backgroundColor: '#000000' }]} 
            onPress={handleCreate}
            disabled={loading}
          >
            <Text style={[styles.footerBtnRightText, { color: '#ffffff' }]}>
              {loading ? 'PUBLISHING...' : 'PUBLISH EVENT'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fbf9f8',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(10,25,47,0.05)',
  },
  appBarTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: '#000000',
  },
  closeBtn: {
    padding: 4,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  wizardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  formSection: {
    width: '100%',
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
    marginRight: 12,
  },
  stepLine: {
    height: 1,
    width: 48,
    backgroundColor: '#fed488',
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 28,
    color: '#000000',
    marginBottom: 8,
  },
  sectionDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
    marginBottom: 24,
    lineHeight: 20,
  },
  field: {
    marginBottom: 20,
  },
  fieldRow: {
    flexDirection: 'row',
  },
  label: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#44474d',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#1b1c1c',
    backgroundColor: '#f5f3f3',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  selectWrapper: {
    // Basic wrapper for now
  },
  previewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eae8e7',
  },
  previewImage: {
    width: '100%',
    height: 160,
  },
  previewOverlay: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  previewTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    color: '#ffffff',
  },
  previewContent: {
    padding: 16,
  },
  previewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  previewItem: {
    width: '50%',
    marginBottom: 12,
  },
  previewLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  previewVal: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#1b1c1c',
  },
  previewDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 20,
  },
  footerBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerBtnLeftText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#44474d',
    letterSpacing: 1,
    marginLeft: 4,
  },
  footerBtnRight: {
    backgroundColor: '#775a19',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  footerBtnRightText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1,
  }
});
