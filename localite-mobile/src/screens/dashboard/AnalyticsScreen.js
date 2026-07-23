import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { API_URL } from '../../config';

const screenWidth = Dimensions.get("window").width;

export default function AnalyticsScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/users/me/analytics`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setData(await response.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ccff00" />
        <Text style={{color: '#94a3b8', marginTop: 10, fontFamily: 'monospace'}}>COMPILING ANALYTICS...</Text>
      </View>
    );
  }

  // Format chart data
  const chartLabels = data.performanceData && data.performanceData.length > 0 
    ? data.performanceData.map(d => d.label.substring(0, 3)) 
    : ['No Data'];
  const chartValues = data.performanceData && data.performanceData.length > 0 
    ? data.performanceData.map(d => d.attendees) 
    : [0];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HOST ANALYTICS</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Ionicons name="calendar" size={20} color="rgba(204,255,0,0.3)" style={styles.statIcon} />
            <Text style={styles.statValue}>{data.totalEventsHosted}</Text>
            <Text style={styles.statLabel}>TOTAL EVENTS</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="people" size={20} color="rgba(204,255,0,0.3)" style={styles.statIcon} />
            <Text style={styles.statValue}>{data.totalAttendees}</Text>
            <Text style={styles.statLabel}>ATTENDEES</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="star" size={20} color="rgba(204,255,0,0.3)" style={styles.statIcon} />
            <Text style={styles.statValue}>{data.averageRating.toFixed(1)}</Text>
            <Text style={styles.statLabel}>AVG RATING</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="trending-up" size={20} color="rgba(204,255,0,0.3)" style={styles.statIcon} />
            <Text style={styles.statValue}>{data.upcomingEventsCount}</Text>
            <Text style={styles.statLabel}>UPCOMING</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ENGAGEMENT TRAJECTORY</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: chartLabels,
                datasets: [{ data: chartValues }]
              }}
              width={screenWidth - 40}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#1e293b",
                backgroundGradientFrom: "#1e293b",
                backgroundGradientTo: "#1e293b",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(204, 255, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: { r: "4", strokeWidth: "2", stroke: "#0f172a" }
              }}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECENT OPERATIONS</Text>
          {data.recentEvents && data.recentEvents.length > 0 ? (
            data.recentEvents.map((event, idx) => (
              <View key={idx} style={styles.recentEventCard}>
                <Text style={styles.eventTitle} numberOfLines={1}>{event.title}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
                
                <View style={styles.eventMetrics}>
                  <View style={styles.metricItem}>
                    <Ionicons name="people" size={14} color="#ccff00" />
                    <Text style={styles.metricText}>{event.attendees}</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Ionicons name="star" size={14} color="#ccff00" />
                    <Text style={styles.metricText}>{event.rating.toFixed(1)}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No past events found</Text>
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  loadingContainer: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60, backgroundColor: '#1e293b', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  headerTitle: { color: 'white', fontFamily: 'monospace', fontSize: 16, letterSpacing: 2 },
  backBtn: { padding: 5 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10, marginBottom: 20 },
  statBox: { width: '48%', backgroundColor: '#1e293b', padding: 20, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' },
  statIcon: { position: 'absolute', top: 10, right: 10 },
  statValue: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  statLabel: { color: '#94a3b8', fontSize: 10, fontFamily: 'monospace', marginTop: 5, letterSpacing: 1 },
  section: { backgroundColor: '#1e293b', borderRadius: 15, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#ccff00', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 15, fontFamily: 'monospace' },
  chartContainer: { alignItems: 'center' },
  recentEventCard: { backgroundColor: '#0f172a', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  eventTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  eventDate: { color: '#94a3b8', fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', marginTop: 5, marginBottom: 10 },
  eventMetrics: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 10 },
  metricItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metricText: { color: 'white', fontSize: 12, fontFamily: 'monospace' },
  emptyText: { color: '#94a3b8', textAlign: 'center', fontStyle: 'italic', fontSize: 12, marginTop: 10 }
});
