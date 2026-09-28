import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import CarePathScreen from './src/screens/CarePathScreen';

// ---------------------------------------------------------------------------
// PLACEHOLDER SCREENS
// You haven't built the "Meds" and "Support" screens yet, so these are
// simple stand-ins. Replace each with a real screen file the same way
// HomeScreen.js and CarePathScreen.js were built — same pattern every time.
// ---------------------------------------------------------------------------
function MedsScreen() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Mankhwala • Meds screen coming soon</Text>
    </View>
  );
}

function SupportScreen() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Thandizo • Support screen coming soon</Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// TAB NAVIGATOR
// createBottomTabNavigator() gives you a component pair: <Tab.Navigator> is
// the container, <Tab.Screen> registers each screen + its tab button.
// This REPLACES the custom BottomTabBar component from HomeScreen.js —
// once this is wired up, delete that custom one to avoid two tab bars.
// ---------------------------------------------------------------------------
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // each screen already has its own header
          tabBarActiveTintColor: '#2F6FE0',
          tabBarInactiveTintColor: '#9AA3AF',
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Today: 'calendar',
              Schedule: 'trending-up',
              Meds: 'medical',
              Support: 'heart-circle',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Today"
          component={HomeScreen}
          options={{ tabBarLabel: 'Lero' }}
        />
        <Tab.Screen
          name="Schedule"
          component={CarePathScreen}
          options={{ tabBarLabel: 'Ulendo' }}
        />
        <Tab.Screen
          name="Meds"
          component={MedsScreen}
          options={{ tabBarLabel: 'Mankhwala' }}
        />
        <Tab.Screen
          name="Support"
          component={SupportScreen}
          options={{ tabBarLabel: 'Thandizo' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF0FB',
  },
  placeholderText: {
    fontSize: 14,
    color: '#8A93A3',
  },
  tabBar: {
    height: 60,
    paddingBottom: 6,
    paddingTop: 6,
  },
});