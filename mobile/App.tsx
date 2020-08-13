import React from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import {
  Archivo_400Regular,
  Archivo_700Bold,
  useFonts,
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppStack />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default App;
