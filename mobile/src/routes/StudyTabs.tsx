import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import GiveClasses from '../pages/GiveClasses';

const { Navigator, Screen } = createBottomTabNavigator();

const StudyTabs: React.FC = () => {
  const Teacher = true;

  return (
    <Navigator
      tabBarOptions={{
        style: { elevation: 0, shadowOpacity: 0, height: 64 },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 0,
          height: 0,
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 11,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264d',
      }}
    >
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="ios-easel"
              size={size}
              color={focused ? '#8257e5' : color}
            />
          ),
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="ios-heart"
              size={size}
              color={focused ? '#8257e5' : color}
            />
          ),
        }}
      />
      {Teacher && (
        <Screen
          name="Give-Classes"
          component={GiveClasses}
          options={{
            tabBarLabel: 'Dar aulas',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name="ios-book"
                size={size}
                color={focused ? '#8257e5' : color}
              />
            ),
          }}
        />
      )}
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="ios-person"
              size={size}
              color={focused ? '#8257e5' : color}
            />
          ),
        }}
      />
    </Navigator>
  );
};

export default StudyTabs;
