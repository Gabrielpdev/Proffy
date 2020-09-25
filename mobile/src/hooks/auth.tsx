import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  avatar_url: string;
  bio: string;
  is_teacher: boolean;
}
interface Class_Schedule {
  id: string;
  from: number;
  to: number;
  fromFormatted: string;
  toFormatted: string;
  week_day: [
    {
      id: string;
      name: string;
    },
  ];
  is_available: boolean;
}
interface Favorite {
  id: string;
  favorite_id: string;
  cost: string;
  subject: {
    name: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    bio: string;
    is_teacher: boolean;
    avatar_url: string;
  };
  class_schedule: [Class_Schedule];
}

interface AuthState {
  token: string;
  user: User;
  favorites: Favorite[];
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  favorites: Favorite[];
  loading: boolean;
  signIn(credentials: SingInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
  updateFavorites(favorite: Favorite[]): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user, favorites] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
        '@GoBarber:favorite',
      ]);

      // console.log(favorites);

      if (token[1] && user[1] && favorites[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({
          token: token[1],
          user: JSON.parse(user[1]),
          favorites: JSON.parse(favorites[1]),
        });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    api.defaults.headers.authorization = `Bearer ${token}`;

    const responseFav = await api.get('/favorite');

    const favorites = responseFav.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
      ['@GoBarber:favorite', JSON.stringify(favorites)],
    ]);

    setData({ token, user, favorites });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@GoBarber:token',
      '@GoBarber:user',
      '@GoBarber:favorite',
    ]);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      setData({
        token: data.token,
        user,
        favorites: data.favorites,
      });

      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
    },

    [data.token, data.favorites],
  );

  const updateFavorites = useCallback(
    async (favorites: Favorite[]) => {
      setData({
        token: data.token,
        user: data.user,
        favorites,
      });

      await AsyncStorage.setItem(
        '@GoBarber:favorite',
        JSON.stringify(favorites),
      );
    },

    [data.token, data.user],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        favorites: data.favorites,
        signIn,
        signOut,
        updateUser,
        updateFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
