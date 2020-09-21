import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, View } from 'react-native';
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

import AppProvider from './src/hooks';
import Routes from './src/routes';

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
    <NavigationContainer>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <StatusBar style="light" />
      <AppProvider>
        <View style={{ flex: 1 }}>
          <Routes />
        </View>
      </AppProvider>
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
};

export default App;
