import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Platform, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CreateEventCapacityRulesScreen() {
  const navigation = useNavigation();
  const [waitlist, setWaitlist] = useState(false);
  
  const [rules, setRules] = useState([
    { id: 1, text: 'DRESS CODE REQUIRED', active: false },
    { id: 2, text: '21+ ONLY', active: false },
    { id: 3, text: 'NO PHOTOGRAPHY', active: false },
    { id: 4, text: 'GUEST-LIST ONLY', active: false },
    { id: 5, text: 'MEMBERS ONLY', active: false }
  ]);

  const [activeRules, setActiveRules] = useState([
    'Elegant Evening Attire',
    'Invitations non-transferable'
  ]);

  const toggleRule = (id) => {
    setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const removeActiveRule = (index) => {
    const newRules = [...activeRules];
    newRules.splice(index, 1);
    setActiveRules(newRules);
  };

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
        {/* Progress Header */}
        <View style={styles.progressHeader}>
          <View style={styles.progressTextRow}>
            <View>
              <Text style={styles.stepText}>STEP 4 OF 6</Text>
              <Text style={styles.stepTitle}>Capacity & Rules</Text>
            </View>
            <Text style={styles.nextText}>Next: Ticketing</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '66.6%' }]} />
          </View>
        </View>

        {/* Capacity Section */}
        <View style={styles.card}>
          <Text style={styles.cardHeaderTitle}>EVENT LOGISTICS</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>MAXIMUM GUESTS</Text>
            <View style={styles.numberInputWrap}>
              <TextInput style={styles.numberInput} placeholder="50" placeholderTextColor="#75777e" keyboardType="numeric" />
              <View style={styles.stepperWrap}>
                <TouchableOpacity><MaterialIcons name="expand-less" size={20} color="#775a19" /></TouchableOpacity>
                <TouchableOpacity><MaterialIcons name="expand-more" size={20} color="#775a19" /></TouchableOpacity>
              </View>
            </View>
            <Text style={styles.inputHelper}>Define the intimate or grand scale of your gathering.</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>WAITLIST</Text>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Enable Waitlist</Text>
              <Switch 
                value={waitlist}
                onValueChange={setWaitlist}
                trackColor={{ false: '#eae8e7', true: '#fed488' }}
                thumbColor={waitlist ? '#785a1a' : '#fff'}
              />
            </View>
            <Text style={styles.inputHelper}>Automatically queue guests once capacity is met.</Text>
          </View>
        </View>

        {/* House Rules Section */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeaderTitle}>HOUSE RULES</Text>
            <MaterialIcons name="gavel" size={20} color="#775a19" />
          </View>
          
          <View style={styles.tagWrap}>
            {rules.map(r => (
              <TouchableOpacity 
                key={r.id} 
                style={[styles.tag, r.active && styles.tagActive]}
                onPress={() => toggleRule(r.id)}
              >
                <Text style={[styles.tagText, r.active && styles.tagTextActive]}>{r.text}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CUSTOM REQUIREMENTS</Text>
            <TextInput 
              style={styles.textArea} 
              multiline 
              numberOfLines={4}
              placeholder="Detail any specific expectations for your guests..."
              placeholderTextColor="#75777e"
            />
          </View>

          <View style={styles.activeRulesWrap}>
            <Text style={styles.activeRulesTitle}>ACTIVE RULES</Text>
            {activeRules.map((rule, i) => (
              <View key={i} style={styles.activeRuleRow}>
                <View style={styles.activeRuleLeft}>
                  <MaterialIcons name="check-circle" size={20} color="#775a19" />
                  <Text style={styles.activeRuleText}>{rule}</Text>
                </View>
                <TouchableOpacity onPress={() => removeActiveRule(i)}>
                  <MaterialIcons name="delete" size={20} color="#ba1a1a" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Additional Options */}
        <View style={styles.optionsWrap}>
          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.checkbox} />
            <Text style={styles.optionText}>Hide guest list from other attendees</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.checkbox} />
            <Text style={styles.optionText}>Require social media verification</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footerActions}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('CreateEventPaymentSetup')}>
          <Text style={styles.continueText}>CONTINUE</Text>
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
  progressHeader: {
    marginBottom: 32,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  stepText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
    marginBottom: 4,
  },
  stepTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
  },
  nextText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: '#e4e2e2',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#775a19',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#f5f3f3',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 2,
  },
  cardHeaderTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#44474d',
    marginBottom: 24,
    letterSpacing: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#1b1c1c',
    marginBottom: 8,
  },
  numberInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  numberInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000',
    paddingVertical: 16,
  },
  stepperWrap: {
    flexDirection: 'column',
  },
  inputHelper: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 13,
    color: '#44474d',
    opacity: 0.7,
    marginTop: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f3f3',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
  },
  switchLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000',
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c5c6cd',
  },
  tagActive: {
    backgroundColor: '#775a19',
    borderColor: '#775a19',
  },
  tagText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 11,
    color: '#44474d',
  },
  tagTextActive: {
    color: '#fff',
  },
  textArea: {
    backgroundColor: '#f5f3f3',
    borderRadius: 8,
    padding: 20,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000',
    textAlignVertical: 'top',
    minHeight: 120,
  },
  activeRulesWrap: {
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    paddingTop: 24,
  },
  activeRulesTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 11,
    color: '#44474d',
    marginBottom: 16,
  },
  activeRuleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  activeRuleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activeRuleText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000',
  },
  optionsWrap: {
    gap: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#c5c6cd',
  },
  optionText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: '#fbf9f8',
  },
  backBtn: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#775a19',
  },
  backText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
  },
  continueBtn: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#000',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 4,
  },
  continueText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
  }
});
