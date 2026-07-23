import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

export default function VoiceNotesScreen() {
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(true);

  // Simple animation for recording pulse
  const pulseAnim = useSharedValue(1);
  useEffect(() => {
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedPulse = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
    opacity: 1.5 - pulseAnim.value
  }));

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={24} color="#75777e" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Voice Note</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="settings" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatarImg} />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* Recipient */}
        <View style={styles.recipientWrap}>
          <View style={styles.gradientRing}>
            <View style={styles.innerAvatarWrap}>
              <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.recipientAvatar} />
            </View>
          </View>
          <Text style={styles.recipientName}>Julian Thorne</Text>
          <Text style={styles.recipientTitle}>ART CURATOR & HOST</Text>
        </View>

        {/* Chat Preview */}
        <View style={styles.chatWrap}>
          <View style={styles.bubbleLeft}>
            <Text style={styles.bubbleText}>The gallery opens at 7:00 PM tonight. Will you be bringing the invitation?</Text>
          </View>

          <View style={styles.bubbleRight}>
            <View style={styles.voicePlayer}>
              <View style={styles.playBtn}>
                <MaterialIcons name="play-arrow" size={20} color="#fff" />
              </View>
              <View style={styles.waveform}>
                {[2, 4, 3, 6, 8, 5, 7, 4, 6, 3, 5, 8, 6, 4, 2].map((h, i) => (
                  <View key={i} style={[styles.waveBar, { height: h * 3 }]} />
                ))}
              </View>
              <Text style={styles.duration}>0:42</Text>
            </View>
            <View style={styles.msgMeta}>
              <Text style={styles.timeStr}>RECEIVED 10:15 AM</Text>
              <MaterialIcons name="done-all" size={14} color="#775a19" />
            </View>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controlsWrap}>
          <View style={styles.timerWrap}>
            <Text style={styles.timerLarge}>{formatTime(seconds + 15)}</Text>
            <Text style={styles.recordingStatus}>RECORDING...</Text>
          </View>

          <View style={styles.micSection}>
            <Animated.View style={[styles.pulseCircle, animatedPulse]} />
            <TouchableOpacity 
              style={styles.micBtn} 
              onPress={() => setIsRecording(!isRecording)}
            >
              <MaterialIcons name="mic" size={40} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <View style={[styles.actionIconWrap, styles.cancelIconWrap]}>
                <MaterialIcons name="delete" size={20} color="#75777e" />
              </View>
              <Text style={styles.actionText}>CANCEL</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionBtn}>
              <View style={[styles.actionIconWrap, styles.sendIconWrap]}>
                <MaterialIcons name="send" size={20} color="#775a19" />
              </View>
              <Text style={[styles.actionText, styles.sendText]}>SEND</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#c5c6cd',
  },
  avatarImg: { width: '100%', height: '100%' },
  content: {
    flex: 1,
    paddingTop: 24,
  },
  recipientWrap: {
    alignItems: 'center',
    marginBottom: 40,
  },
  gradientRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#775a19',
    padding: 4,
    marginBottom: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 6,
  },
  innerAvatarWrap: {
    width: '100%',
    height: '100%',
    borderRadius: 44,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  recipientAvatar: {
    width: '100%',
    height: '100%',
  },
  recipientName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 4,
  },
  recipientTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 2,
  },
  chatWrap: {
    paddingHorizontal: 20,
    gap: 24,
    flex: 1,
  },
  bubbleLeft: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 24,
    borderRadius: 12,
    maxWidth: '85%',
    borderWidth: 1,
    borderColor: 'rgba(119,90,25,0.1)',
  },
  bubbleText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },
  bubbleRight: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '90%',
    alignSelf: 'flex-end',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(197,198,205,0.2)',
  },
  voicePlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveform: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 32,
    paddingHorizontal: 8,
  },
  waveBar: {
    width: 3,
    backgroundColor: '#fed488',
    borderRadius: 2,
  },
  duration: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
  },
  msgMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  timeStr: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: 'rgba(117,119,126,0.6)',
    letterSpacing: 1,
  },
  controlsWrap: {
    alignItems: 'center',
    paddingVertical: 32,
    marginTop: 'auto',
  },
  timerWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerLarge: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 4,
  },
  recordingStatus: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  micSection: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
    height: 96,
    marginBottom: 32,
  },
  pulseCircle: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(119,90,25,0.2)',
  },
  micBtn: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#775a19',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#775a19',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 10,
    zIndex: 10,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 48,
  },
  actionBtn: {
    alignItems: 'center',
    gap: 8,
  },
  actionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelIconWrap: {
    borderColor: '#c5c6cd',
  },
  sendIconWrap: {
    borderColor: '#775a19',
  },
  actionText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: 'rgba(0,0,0,0.6)',
    letterSpacing: 1,
  },
  sendText: {
    color: '#775a19',
  }
});
