// App.js — FRIDAY AI Root Component

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import ChatScreen from './src/screens/ChatScreen';
import DeviceScreen from './src/screens/DeviceScreen';
import PermissionsScreen from './src/screens/PermissionsScreen';
import AboutScreen from './src/screens/AboutScreen';
import { requestAllPermissions } from './src/utils/PermissionManager';

const Tab = createBottomTabNavigator();

// ─── Splash / Boot screen ────────────────────────────────
function SplashScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={['#020508', '#050a12', '#020508']} style={splash.container}>
      <Animatable.View animation="pulse" iterationCount="infinite" style={splash.ringOuter}>
        <LinearGradient colors={['#001a2e', '#003355']} style={splash.ring}>
          <Animatable.Text animation="fadeIn" delay={400} style={splash.logoText}>
            F.R.I.D.A.Y
          </Animatable.Text>
        </LinearGradient>
      </Animatable.View>
      <Animatable.Text animation="fadeInUp" delay={600} style={splash.title}>
        FRIDAY AI
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" delay={900} style={splash.sub}>
        FEMALE REPLACEMENT INTELLIGENT{'\n'}DIGITAL ASSISTANT YOUTH
      </Animatable.Text>
      <Animatable.View animation="fadeIn" delay={1400} style={splash.loadRow}>
        <ActivityIndicator size="small" color="#00c8ff" />
        <Text style={splash.loadText}>  INITIALIZING SYSTEMS…</Text>
      </Animatable.View>
    </LinearGradient>
  );
}

const splash = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  ringOuter: { marginBottom: 24 },
  ring: {
    width: 110, height: 110, borderRadius: 55,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2.5, borderColor: '#00c8ff',
    shadowColor: '#00c8ff', shadowOpacity: 0.6, shadowRadius: 24, elevation: 16,
  },
  logoText: { fontSize: 10, color: '#00c8ff', fontWeight: '900', letterSpacing: 3 },
  title: {
    fontSize: 36, fontWeight: '900', letterSpacing: 12,
    color: '#00c8ff',
    textShadowColor: '#00c8ff', textShadowRadius: 20,
    marginBottom: 12,
  },
  sub: { fontSize: 10, letterSpacing: 3, color: '#4a6a8a', textAlign: 'center', lineHeight: 18 },
  loadRow: { flexDirection: 'row', alignItems: 'center', marginTop: 40 },
  loadText: { fontSize: 10, letterSpacing: 3, color: '#4a6a8a' },
});

// ─── Tab bar icon ────────────────────────────────────────
function TabIcon({ icon, label, focused }) {
  return (
    <View style={tabIcon.wrap}>
      <Text style={[tabIcon.icon, focused && tabIcon.iconActive]}>{icon}</Text>
      <Text style={[tabIcon.label, focused && tabIcon.labelActive]}>{label}</Text>
    </View>
  );
}

const tabIcon = StyleSheet.create({
  wrap: { alignItems: 'center', paddingTop: 4 },
  icon: { fontSize: 18, opacity: 0.5 },
  iconActive: { opacity: 1 },
  label: { fontSize: 8, letterSpacing: 1.5, color: '#4a6a8a', marginTop: 2, fontWeight: '600' },
  labelActive: { color: '#00c8ff' },
});

// ─── Main app ────────────────────────────────────────────
export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    // Request permissions on first launch
    if (splashDone) {
      setTimeout(() => {
        Alert.alert(
          '🔐 FRIDAY Permissions',
          'FRIDAY needs access to your device features to function fully. Grant all permissions now?',
          [
            { text: 'Later', style: 'cancel' },
            { text: 'Grant All', onPress: requestAllPermissions },
          ],
        );
      }, 800);
    }
  }, [splashDone]);

  if (!splashDone) {
    return <SplashScreen onDone={() => setSplashDone(true)} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#050a12"
        translucent={false}
      />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#050a12', borderBottomColor: 'rgba(0,200,255,0.15)', borderBottomWidth: 1 },
            headerTintColor: '#00c8ff',
            headerTitleStyle: { fontWeight: '900', letterSpacing: 4, fontSize: 14 },
            tabBarStyle: {
              backgroundColor: '#050a12',
              borderTopColor: 'rgba(0,200,255,0.15)',
              borderTopWidth: 1,
              height: Platform.OS === 'ios' ? 82 : 62,
              paddingBottom: Platform.OS === 'ios' ? 20 : 6,
              elevation: 0,
            },
            tabBarShowLabel: false,
          }}>

          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              title: 'FRIDAY',
              tabBarIcon: ({ focused }) => (
                <TabIcon icon="💬" label="CHAT" focused={focused} />
              ),
            }}
          />

          <Tab.Screen
            name="Device"
            component={DeviceScreen}
            options={{
              title: 'DEVICE',
              tabBarIcon: ({ focused }) => (
                <TabIcon icon="📱" label="DEVICE" focused={focused} />
              ),
            }}
          />

          <Tab.Screen
            name="Permissions"
            component={PermissionsScreen}
            options={{
              title: 'ACCESS',
              tabBarIcon: ({ focused }) => (
                <TabIcon icon="🔐" label="ACCESS" focused={focused} />
              ),
            }}
          />

          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{
              title: 'ABOUT',
              tabBarIcon: ({ focused }) => (
                <TabIcon icon="ℹ️" label="INFO" focused={focused} />
              ),
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
