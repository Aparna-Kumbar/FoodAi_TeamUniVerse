import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LandingScreen from './frontend/screens/login/landing';
import LoginScreen from './frontend/screens/login/login';
import CompanyDashboardScreen from './frontend/screens/dashboard/companyDashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Landing');

  // Navigation controller object compatible with React Navigation patterns
  const navigation = {
    navigate: (screenName) => {
      setCurrentScreen(screenName);
    },
    goBack: () => {
      setCurrentScreen('Landing');
    },
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {currentScreen === 'Landing' && (
        <LandingScreen
          navigation={navigation}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}
      {currentScreen === 'Login' && (
        <LoginScreen
          navigation={navigation}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}
      {currentScreen === 'CompanyDashboard' && (
        <CompanyDashboardScreen
          navigation={navigation}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
