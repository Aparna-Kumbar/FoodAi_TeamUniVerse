import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LandingScreen from './frontend/screens/login/landing';
import LoginScreen from './frontend/screens/login/login';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'Landing' | 'Login'>('Landing');

  const navigation = {
    navigate: (screenName: 'Landing' | 'Login') => {
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
          onNavigate={(screen: 'Landing' | 'Login') => setCurrentScreen(screen)}
        />
      )}
      {currentScreen === 'Login' && (
        <LoginScreen
          navigation={navigation}
          onNavigate={(screen: 'Landing' | 'Login') => setCurrentScreen(screen)}
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
