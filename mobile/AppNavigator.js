import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//screens
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import CarePathScreen from './src/screens/CarePathScreen';
import TriageScreen from './src/screens/TriageScreen';
import MissedAppointmentScreen from './src/screens/MissedAppointmentScreen';
import MedicinesScreen from './src/screens/MedicinesScreen';   
import SupportScreen from './src/screens/SupportScreen';

import CommunityScreen from './src/screens/CommunityScreen';
import StoryDetailScreen from './src/screens/StoryDetailScreen';
import ShareStoryScreen from './src/screens/ShareStoryScreen';










const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2F6FE0',
        tabBarInactiveTintColor: '#9AA3AF',
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Today: 'home',
            Schedule: 'calendar',
            Meds: 'medical',
            Support: 'heart',
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
  component={MedicinesScreen}
  options={{ tabBarLabel: 'Mankhwala' }}
/>
<Tab.Screen
  name="Community"
  component={CommunityScreen}
  options={{ tabBarLabel: 'Gulu' }}
/>
      <Tab.Screen
  name="Support"
  component={SupportScreen}
  options={{ tabBarLabel: 'Thandizo' }}
/>

    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Triage" component={TriageScreen} />
        <Stack.Screen name="MissedAppointment" component={MissedAppointmentScreen} />
        <Stack.Screen name="StoryDetail" component={StoryDetailScreen} />
        <Stack.Screen name="ShareStory" component={ShareStoryScreen} />

      </Stack.Navigator>
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