import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size={50} color="#999" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
