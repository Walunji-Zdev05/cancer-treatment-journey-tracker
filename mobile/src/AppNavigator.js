import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import MedicinesScreen from './screens/MedicinesScreen';
import SideEffectsScreen from './screens/CarePathScreen';
import { colors } from './theme/theme';

const Tab = createBottomTabNavigator();

const tabIcon = (emoji) => ({ color }) => <Text style={{ fontSize: 20 }}>{emoji}</Text>;

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
        }}
      >
        <Tab.Screen name="Today" component={HomeScreen} options={{ tabBarIcon: tabIcon('🏠') }} />
        <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ tabBarIcon: tabIcon('📅') }} />
        <Tab.Screen name="Medicines" component={MedicinesScreen} options={{ tabBarIcon: tabIcon('💊') }} />
        <Tab.Screen name="SideEffects" component={SideEffectsScreen} options={{ tabBarLabel: 'Check-In', tabBarIcon: tabIcon('💬') }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
