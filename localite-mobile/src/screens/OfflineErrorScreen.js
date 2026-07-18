import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Platform, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function OfflineErrorScreen() {
  const navigation = useNavigation();
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [status, setStatus] = useState('Searching for gateway...');

  const handleReconnect = () => {
    setIsReconnecting(true);
    setStatus('Attempting secure handshake...');
    
    setTimeout(() => {
      setStatus('Connection failed. Retrying in 30s.');
      setIsReconnecting(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      
      {/* Background Image Container */}
      <View style={StyleSheet.absoluteFill}>
        <Image 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxhTYPAoIzZKtPmCqLOYMMacZxuRetdQFEOhlRcsvmhQEWXlFobYMLY2B6Qn0eY8Jl00U6-rf9Gi_w_zwUKnRo_B59ne4DPxT_lFGmIoUwugNmR1E7lnNyEv0i6hex9uKPcCu5Z0Htqy2aa_XqDCAkZ3fqKHQiB6Qxs4USwFpLYqRGALbcnWUKSmPYWCLx2wE1YGAnDknmYxmKAe-z_bXsknO6nCipdzIHaOwQjwoSz49JHycp4NZEJQ' }}
          style={styles.bgImage}
        />
        <View style={styles.fogOverlay} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        
        <View style={styles.content}>
          {/* Branding Anchor */}
          <View style={styles.brandContainer}>
            <Text style={styles.brandTitle}>Localite</Text>
          </View>

          {/* Error State Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>A Moment of Silence</Text>
            <Text style={styles.desc}>
              Our digital concierge is momentarily indisposed. We are working to restore the connection to your circle.
            </Text>
          </View>

          {/* Action Cluster */}
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={[styles.primaryBtn, isReconnecting && styles.primaryBtnDisabled]} 
              onPress={handleReconnect}
              disabled={isReconnecting}
            >
              <Text style={styles.primaryBtnText}>
                {isReconnecting ? 'RECONNECTING...' : 'RECONNECT'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
              <MaterialIcons name="offline-pin" size={18} color="#775a19" />
              <Text style={styles.secondaryBtnText}>VIEW SAVED PASSES</Text>
            </TouchableOpacity>
          </View>

          {/* Subtle Status Indicator */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>CURRENT STATUS</Text>
            <View style={styles.statusWrap}>
              <View style={styles.pulseDot} />
              <Text style={styles.statusText}>{status}</Text>
            </View>
          </View>

        </View>

        {/* Contextual Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerLabel}>MEMBERSHIP ID: LV-992-04</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity><Text style={styles.footerLinkText}>Privacy Concierge</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLinkText}>Support Lounge</Text></TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  fogOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(251, 249, 248, 0.7)', 
    // In a real app this would be a linear gradient 
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  brandContainer: {
    marginBottom: 32,
  },
  brandTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    letterSpacing: -0.5,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  desc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  actionContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  primaryBtnDisabled: {
    opacity: 0.5,
  },
  primaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  secondaryBtn: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#775a19',
    gap: 8,
  },
  secondaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 2,
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  statusLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 8,
  },
  statusWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#775a19',
  },
  statusText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(197, 198, 205, 0.3)',
    gap: 16,
  },
  footerLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 24,
  },
  footerLinkText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  }
});
