import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AppNavigation from './navigation/appNavigation';
import MainContextProvider from './context/Main';
function App() {
  return (
    <MainContextProvider>
      <AppNavigation />
    </MainContextProvider>
  );
}

export default App;
