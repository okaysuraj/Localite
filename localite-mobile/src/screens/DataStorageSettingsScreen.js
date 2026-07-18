import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Switch, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DataStorageSettingsScreen() {
  const navigation = useNavigation();

  // Toggles state
  const [autoDownload, setAutoDownload] = useState(true);
  const [optimizeQuality, setOptimizeQuality] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.avatarWrap}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD4a3xBWQUMSK7YdwGTDfcwDK7Op-DHxyj1qpWG7W0hL2WMILFRYD-lcoBOA24ieKaLRNK7toJ93cHbN_IziaC24xswRpdg-lnLUKUqd0OmFsgr64i9eatzG5L8wygcSRkgyFp4XzTBTPd3y1qzjc4UOwYDVIHTpdFJyeElcp-wgd6dJWK_Yo7c2_doWHzjwmvb8dpFfot2nxJo0yBVf8ZQa449UD6P8Om3fulNLIgMnPGWhx5S-f5Ww' }} 
              style={styles.avatarImg} 
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.preTitle}>SYSTEM PREFERENCES</Text>
          <Text style={styles.pageTitle}>Technical Management</Text>
          <Text style={styles.pageDesc}>
            Configure your application's data footprint, manage local storage, and optimize performance for a seamless experience.
          </Text>
        </View>

        {/* Storage Consumption */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <MaterialIcons name="analytics" size={20} color="#775a19" />
              <Text style={styles.cardBadge}>STORAGE CONSUMPTION</Text>
            </View>
            <Text style={styles.storageAmount}>1.2 GB / 5.0 GB</Text>
          </View>
          
          <View style={styles.progressBlock}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Application Media</Text>
              <Text style={styles.progressValue}>840 MB</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '24%' }]} />
            </View>
          </View>
          
          <View style={styles.progressBlock}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Offline Databases</Text>
              <Text style={styles.progressValue}>320 MB</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '9%' }]} />
            </View>
          </View>
          
          <View style={styles.progressBlock}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Cache & Temporary Files</Text>
              <Text style={styles.progressValue}>120 MB</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '4%' }]} />
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.lastAnalysis}>Last analysis: Today at 09:42 AM</Text>
            <TouchableOpacity>
              <Text style={styles.refreshLink}>REFRESH STATS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cache Management */}
        <View style={styles.cardCenter}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="cleaning-services" size={28} color="#000" />
          </View>
          <Text style={styles.cardBadgeCenter}>CACHE MANAGEMENT</Text>
          <Text style={styles.cardDescCenter}>Remove non-essential temporary data to free up space.</Text>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>PURGE CACHE</Text>
          </TouchableOpacity>
        </View>

        {/* Full Data Export */}
        <View style={styles.cardFlex}>
          <View style={styles.cardFlexInfo}>
            <View style={styles.cardHeaderLeft}>
              <MaterialIcons name="cloud-download" size={20} color="#775a19" />
              <Text style={styles.cardBadge}>FULL DATA EXPORT</Text>
            </View>
            <Text style={styles.cardDescLeft}>
              Generate a secure archive of your entire profile, including local events, social interactions, and media uploads.
            </Text>
          </View>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>REQUEST ARCHIVE</Text>
          </TouchableOpacity>
        </View>

        {/* Media Preferences */}
        <View style={styles.card}>
          <Text style={[styles.cardBadge, { color: '#44474d', marginBottom: 16 }]}>MEDIA PREFERENCES</Text>
          
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>Auto-download Media</Text>
              <Text style={styles.toggleSubtitle}>On Wi-Fi only</Text>
            </View>
            <Switch
              trackColor={{ false: '#eae8e7', true: '#775a19' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#eae8e7"
              onValueChange={setAutoDownload}
              value={autoDownload}
            />
          </View>
          
          <View style={[styles.toggleRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>Optimize Image Quality</Text>
              <Text style={styles.toggleSubtitle}>Reduces storage by 40%</Text>
            </View>
            <Switch
              trackColor={{ false: '#eae8e7', true: '#775a19' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#eae8e7"
              onValueChange={setOptimizeQuality}
              value={optimizeQuality}
            />
          </View>
        </View>

        {/* Asset Breakdown */}
        <View style={styles.card}>
          <Text style={[styles.cardBadge, { color: '#44474d', marginBottom: 16 }]}>ASSET BREAKDOWN</Text>
          
          <View style={styles.assetRow}>
            <View style={styles.assetLabelRow}>
              <MaterialIcons name="image" size={16} color="#75777e" />
              <Text style={styles.assetLabel}>Images</Text>
            </View>
            <Text style={styles.assetValue}>512 MB</Text>
          </View>
          
          <View style={styles.assetRow}>
            <View style={styles.assetLabelRow}>
              <MaterialIcons name="videocam" size={16} color="#75777e" />
              <Text style={styles.assetLabel}>Videos</Text>
            </View>
            <Text style={styles.assetValue}>328 MB</Text>
          </View>

          <View style={styles.assetRow}>
            <View style={styles.assetLabelRow}>
              <MaterialIcons name="description" size={16} color="#75777e" />
              <Text style={styles.assetLabel}>Logs</Text>
            </View>
            <Text style={styles.assetValue}>4.2 MB</Text>
          </View>

          <View style={styles.assetRow}>
            <View style={styles.assetLabelRow}>
              <MaterialIcons name="extension" size={16} color="#75777e" />
              <Text style={styles.assetLabel}>Plugins</Text>
            </View>
            <Text style={styles.assetValue}>82 MB</Text>
          </View>
        </View>

        {/* Footer info */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>Application Version 2.4.1 (Stable Build)</Text>
          <Text style={styles.footerTextItalic}>Localite Technical Console © 2024</Text>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    fontStyle: 'italic',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  pageHeader: {
    marginBottom: 32,
  },
  preTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
    marginBottom: 8,
  },
  pageTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 12,
  },
  pageDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  cardCenter: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  cardFlex: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    flexDirection: 'column',
    gap: 16,
  },
  cardFlexInfo: {
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardBadge: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  cardBadgeCenter: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000',
    letterSpacing: 1,
    marginBottom: 8,
  },
  storageAmount: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
  },
  progressBlock: {
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#000',
  },
  progressValue: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#75777e',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#efeded',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e4e2e2',
  },
  lastAnalysis: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#75777e',
    fontStyle: 'italic',
  },
  refreshLink: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000',
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f5f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardDescCenter: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  primaryBtn: {
    backgroundColor: '#000',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  primaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    letterSpacing: 1,
  },
  cardDescLeft: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#775a19',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  secondaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#efeded',
  },
  toggleInfo: {
    flex: 1,
    paddingRight: 16,
  },
  toggleTitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000',
    marginBottom: 2,
  },
  toggleSubtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#75777e',
  },
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  assetLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  assetLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#000',
  },
  assetValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000',
  },
  footerInfo: {
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e4e2e2',
  },
  footerText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  footerTextItalic: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#75777e',
    fontStyle: 'italic',
  }
});
