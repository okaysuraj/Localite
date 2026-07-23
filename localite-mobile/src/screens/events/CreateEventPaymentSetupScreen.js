import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CreateEventPaymentSetupScreen() {
  const navigation = useNavigation();
  const [ticketType, setTicketType] = useState('free');
  const [price, setPrice] = useState('');

  const renderRadio = (value, icon, title, desc) => {
    const isSelected = ticketType === value;
    return (
      <TouchableOpacity 
        style={[styles.radioCard, isSelected && styles.radioCardSelected]}
        onPress={() => setTicketType(value)}
      >
        <View style={styles.radioTop}>
          <View style={styles.radioLeft}>
            <View style={[styles.iconWrap, isSelected && styles.iconWrapSelected]}>
              <MaterialIcons name={icon} size={24} color={isSelected ? '#fff' : '#000'} />
            </View>
            <View style={styles.radioTextWrap}>
              <Text style={styles.radioTitle}>{title}</Text>
              <Text style={styles.radioDesc}>{desc}</Text>
            </View>
          </View>
          <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
            {isSelected && <View style={styles.radioDot} />}
          </View>
        </View>

        {value === 'paid' && isSelected && (
          <View style={styles.expandedPrice}>
            <Text style={styles.inputLabel}>TICKET PRICE</Text>
            <View style={styles.priceInputRow}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput 
                style={styles.priceInput}
                placeholder="0.00"
                placeholderTextColor="#75777e"
                keyboardType="decimal-pad"
                value={price}
                onChangeText={setPrice}
              />
              <View style={styles.currencySelect}>
                <Text style={styles.currencyText}>USD ($)</Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const parsedPrice = parseFloat(price) || 0;
  const platformFee = parsedPrice > 0 ? (parsedPrice * 0.035).toFixed(2) : '0.00';
  const processingFee = parsedPrice > 0 ? (parsedPrice * 0.03).toFixed(2) : '0.00'; // mockup
  const total = parsedPrice > 0 ? (parsedPrice - parseFloat(platformFee) - parseFloat(processingFee)).toFixed(2) : '0.00';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Localite</Text>
        <View style={styles.stepWrap}>
          <Text style={styles.stepText}>STEP 5 OF 6</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Payment Setup</Text>
          <Text style={styles.pageDesc}>Define the financial structure of your event. Choose between free admission, standard ticketing, or an exclusive experience for members.</Text>
        </View>

        <View style={styles.optionsWrap}>
          {renderRadio('free', 'confirmation-number', 'Free Event', 'Ideal for community gatherings and open networking.')}
          {renderRadio('paid', 'payments', 'Paid Ticket', 'Set a custom price and manage secure transactions.')}
          {renderRadio('exclusive', 'stars', 'Member Exclusive', 'Restricted to your approved community members.')}
        </View>

        {/* Financial Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>FINANCIAL SUMMARY</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ticket Price</Text>
            <Text style={styles.summaryValueBold}>${parsedPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Platform Fee (3.5%)</Text>
            <Text style={styles.summaryValue}>${platformFee}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Processing Fee</Text>
            <Text style={styles.summaryValue}>${processingFee}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Estimated Earnings</Text>
            <Text style={styles.summaryTotalValue}>${total}</Text>
          </View>

          <View style={styles.infoBox}>
            <MaterialIcons name="info" size={16} color="#775a19" />
            <Text style={styles.infoText}>Fees are calculated per transaction. Payouts are typically processed 48 hours after the event completion to your connected bank account.</Text>
          </View>

          <TouchableOpacity style={styles.payoutAccount}>
            <View style={styles.paypalIcon}>
              <Text style={styles.paypalText}>PayPal</Text>
            </View>
            <View style={styles.payoutInfo}>
              <Text style={styles.payoutName}>Julian Montgomery</Text>
              <Text style={styles.payoutEmail}>j.montgomery@business.com</Text>
            </View>
            <MaterialIcons name="edit" size={20} color="#75777e" />
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footerActions}>
        <TouchableOpacity style={styles.draftBtn}>
          <Text style={styles.draftText}>SAVE AS DRAFT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('CreateEventReviewPublish')}>
          <Text style={styles.continueText}>CONTINUE TO REVIEW</Text>
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
    backgroundColor: 'rgba(251, 249, 248, 0.8)',
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
  stepWrap: {
    paddingHorizontal: 8,
  },
  stepText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 32,
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
  optionsWrap: {
    gap: 16,
    marginBottom: 32,
  },
  radioCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eae8e7',
  },
  radioCardSelected: {
    borderColor: '#775a19',
    borderWidth: 2,
    padding: 19, // adjust for border
  },
  radioTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  radioLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 16,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapSelected: {
    backgroundColor: '#775a19',
  },
  radioTextWrap: {
    flex: 1,
    paddingRight: 8,
  },
  radioTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    marginBottom: 4,
  },
  radioDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#c5c6cd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#775a19',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#775a19',
  },
  expandedPrice: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
  },
  inputLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    marginBottom: 8,
    letterSpacing: 1,
  },
  priceInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
  },
  currencySelect: {
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#eae8e7',
  },
  currencyText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#000',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#eae8e7',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  summaryTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    marginBottom: 24,
    letterSpacing: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
  },
  summaryValue: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
  },
  summaryValueBold: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#eae8e7',
    marginVertical: 8,
    marginBottom: 24,
  },
  summaryTotalLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
  },
  summaryTotalValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#775a19',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#f5f3f3',
    padding: 16,
    borderRadius: 8,
    gap: 12,
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
    lineHeight: 18,
  },
  payoutAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#eae8e7',
    borderRadius: 8,
    marginTop: 24,
    gap: 12,
  },
  paypalIcon: {
    backgroundColor: '#0070BA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  paypalText: {
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    fontStyle: 'italic',
  },
  payoutInfo: {
    flex: 1,
  },
  payoutName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000',
  },
  payoutEmail: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 10,
    color: '#75777e',
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: '#fbf9f8',
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
  },
  draftBtn: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#775a19',
    justifyContent: 'center',
  },
  draftText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  continueBtn: {
    flex: 1,
    marginLeft: 16,
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 4,
  },
  continueText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    letterSpacing: 1,
  }
});
