import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/shared/HomeScreen';
import SearchExploreScreen from '../screens/shared/SearchExploreScreen';
import CreateEventScreen from '../screens/events/CreateEventScreen';
import PeopleDiscoveryScreen from '../screens/network/PeopleDiscoveryScreen';

const Tab = createBottomTabNavigator();

// The four main destinations share one tab bar.
export default function MainTabs() {
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
        tabBarActiveTintColor: '#1A6B4A', // Forest Emerald matching Web
        tabBarInactiveTintColor: '#6b7280', // Neutral gray
        tabBarStyle: {
          backgroundColor: '#ffffff', // Clean white matching Web design
          borderTopColor: '#e5e7eb',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          shadowColor: '#1f2937',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 8,
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
