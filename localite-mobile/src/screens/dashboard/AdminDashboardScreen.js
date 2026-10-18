import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { getAdminAnalytics, getAdminReports, banUser } from '../../services/api';

export default function AdminDashboardScreen() {
  const navigation = useNavigation();
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalEvents: 0,
    pendingReports: 0,
  });
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [stats, reportList] = await Promise.all([getAdminAnalytics(), getAdminReports()]);
      setAnalytics(stats || { totalUsers: 0, totalEvents: 0, pendingReports: 0 });
      setReports(Array.isArray(reportList) ? reportList : []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBan = (userId, username) => {
    Alert.alert('Suspend Account', `Are you sure you want to suspend ${username || 'this user'}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Suspend',
        style: 'destructive',
        onPress: async () => {
          try {
            await banUser(userId);
            Alert.alert('Account Suspended', 'User account has been restricted.');
            fetchData();
          } catch (err) {
            Alert.alert('Error', err.message || 'Failed to suspend account.');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Platform Admin</Text>
        <TouchableOpacity onPress={fetchData} style={styles.iconBtn}>
          <MaterialIcons name="refresh" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome */}
        <View style={styles.heroSection}>
          <Text style={styles.heroPreTitle}>SYSTEM CONSOLE</Text>
          <Text style={styles.heroTitle}>Community Moderation</Text>
          <Text style={styles.heroDesc}>
            Live platform metrics, trust & safety monitoring, and account restrictions.
          </Text>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <MaterialIcons name="groups" size={20} color="#775a19" />
              <Text style={styles.metricTag}>REGISTERED</Text>
            </View>
            <Text style={styles.metricValue}>{analytics.totalUsers}</Text>
            <Text style={styles.metricLabel}>Total Members</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <MaterialIcons name="event" size={20} color="#775a19" />
              <Text style={styles.metricTag}>PUBLISHED</Text>
            </View>
            <Text style={styles.metricValue}>{analytics.totalEvents}</Text>
            <Text style={styles.metricLabel}>Total Events</Text>
          </View>

          <View style={[styles.metricCard, styles.metricCardAlert]}>
            <View style={styles.metricHeader}>
              <MaterialIcons name="warning" size={20} color="#ba1a1a" />
              <Text style={[styles.metricTag, { color: '#ba1a1a' }]}>FLAGGED</Text>
            </View>
            <Text style={[styles.metricValue, { color: '#ba1a1a' }]}>{analytics.pendingReports}</Text>
            <Text style={styles.metricLabel}>Pending Reports</Text>
          </View>
        </View>

        {/* Reports Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trust & Safety Queue</Text>
          <Text style={styles.queueCount}>{reports.length} Open</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#775a19" style={{ marginVertical: 32 }} />
        ) : reports.length === 0 ? (
          <View style={styles.emptyCard}>
            <MaterialIcons name="check-circle" size={36} color="#10b981" />
            <Text style={styles.emptyTitle}>Queue Clear</Text>
            <Text style={styles.emptyDesc}>No pending reports or reported member violations.</Text>
          </View>
        ) : (
          reports.map((report) => (
            <View key={report.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <View style={styles.reportTagWrap}>
                  <Text style={styles.reportCategory}>{report.category || 'COMMUNITY VIOLATION'}</Text>
                </View>
                <Text style={styles.reportDate}>{report.createdAt || 'Recent'}</Text>
              </View>
              <Text style={styles.reportTarget}>
                Target: {report.reportedUserName || `User #${report.reportedUserId}`}
              </Text>
              <Text style={styles.reportReason}>
                Reason: {report.reason || 'Safety flag raised by member.'}
              </Text>

              <View style={styles.reportActions}>
                <TouchableOpacity
                  style={styles.banBtn}
                  onPress={() => handleBan(report.reportedUserId, report.reportedUserName)}
                >
                  <MaterialIcons name="block" size={16} color="#fff" />
                  <Text style={styles.banBtnText}>SUSPEND USER</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
    paddingTop: Platform.OS === 'android' ? 40 : 12,
  },
  iconBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontWeight: '700',
    color: '#000000',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  heroSection: {
    marginBottom: 24,
  },
  heroPreTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#775a19',
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 26,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
  },
  heroDesc: {
    fontSize: 13,
    color: '#75777e',
    lineHeight: 18,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eae8e7',
    padding: 14,
  },
  metricCardAlert: {
    backgroundColor: '#fff5f5',
    borderColor: '#fecaca',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTag: {
    fontSize: 9,
    fontWeight: '700',
    color: '#775a19',
    letterSpacing: 0.8,
  },
  metricValue: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontWeight: '700',
    color: '#000000',
  },
  metricLabel: {
    fontSize: 11,
    color: '#75777e',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    color: '#000000',
  },
  queueCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#775a19',
  },
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eae8e7',
    padding: 32,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginTop: 10,
    marginBottom: 4,
  },
  emptyDesc: {
    fontSize: 12,
    color: '#75777e',
    textAlign: 'center',
  },
  reportCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eae8e7',
    padding: 16,
    marginBottom: 12,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportTagWrap: {
    backgroundColor: '#fff1f2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  reportCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ba1a1a',
    letterSpacing: 0.5,
  },
  reportDate: {
    fontSize: 11,
    color: '#75777e',
  },
  reportTarget: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  reportReason: {
    fontSize: 12,
    color: '#44474d',
    marginBottom: 12,
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  banBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ba1a1a',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  banBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
