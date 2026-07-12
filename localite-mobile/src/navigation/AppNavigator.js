import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import SearchExploreScreen from '../screens/SearchExploreScreen';
import MapScreen from '../screens/MapScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import PeopleDiscoveryScreen from '../screens/PeopleDiscoveryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import WelcomeCarouselScreen from '../screens/WelcomeCarouselScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';
import ChatScreen from '../screens/ChatScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import SearchExploreScreen from '../screens/SearchExploreScreen';
import MapScreen from '../screens/MapScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import PeopleDiscoveryScreen from '../screens/PeopleDiscoveryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import WelcomeCarouselScreen from '../screens/WelcomeCarouselScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';
import ChatScreen from '../screens/ChatScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import DirectMessageScreen from '../screens/DirectMessageScreen';
import ScannerScreen from '../screens/ScannerScreen';
import FeedScreen from '../screens/FeedScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventParticipantsScreen from '../screens/EventParticipantsScreen';
import MessagesInboxScreen from '../screens/MessagesInboxScreen';
import ChatScreen1x1 from '../screens/ChatScreen1x1';
import EventGroupChatScreen from '../screens/EventGroupChatScreen';
import NewConversationScreen from '../screens/NewConversationScreen';
import SettingsHomeScreen from '../screens/SettingsHomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import PrivacySettingsScreen from '../screens/PrivacySettingsScreen';
import SafetyCenterScreen from '../screens/SafetyCenterScreen';
import EmergencySOSScreen from '../screens/EmergencySOSScreen';
import VerificationCenterScreen from '../screens/VerificationCenterScreen';
import ReportUserScreen from '../screens/ReportUserScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Hubs') iconName = focused ? 'compass' : 'compass-outline';
          else if (route.name === 'Events') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Organize') iconName = focused ? 'add-circle' : 'add-circle-outline';
          else if (route.name === 'Social') iconName = focused ? 'people' : 'people-outline';
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#775a19', // Secondary gold
        tabBarInactiveTintColor: '#c5c6cd', // Outline variant
        tabBarStyle: {
          backgroundColor: '#f5f3f3', // Surface container low
          borderTopColor: 'rgba(10,25,47,0.05)',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          position: 'absolute', // Floating effect
          bottom: 0,
          left: 0,
          right: 0,
          shadowColor: '#0a192f',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.05,
          shadowRadius: 24,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'PlusJakartaSans_700Bold',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Hubs" component={HomeScreen} />
      <Tab.Screen name="Events" component={SearchExploreScreen} />
      <Tab.Screen name="Organize" component={CreateEventScreen} />
      <Tab.Screen name="Social" component={PeopleDiscoveryScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="WelcomeCarousel" component={WelcomeCarouselScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="DirectMessage" component={DirectMessageScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="PublicProfile" component={PublicProfileScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="EventParticipants" component={EventParticipantsScreen} />
        <Stack.Screen name="MessagesInbox" component={MessagesInboxScreen} />
        <Stack.Screen name="ChatScreen1x1" component={ChatScreen1x1} />
        <Stack.Screen name="EventGroupChat" component={EventGroupChatScreen} />
        <Stack.Screen name="NewConversation" component={NewConversationScreen} />
        <Stack.Screen name="SettingsHome" component={SettingsHomeScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SafetyCenter" component={SafetyCenterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EmergencySOS" component={EmergencySOSScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
        <Stack.Screen name="VerificationCenter" component={VerificationCenterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReportUser" component={ReportUserScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
