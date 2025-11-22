import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { MemoProvider } from './src/context/MemoContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <MemoProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </MemoProvider>
    </SafeAreaProvider>
  );
}
