import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import Landing from '../pages/Landing';
import SignIn from '../pages/SignIn';
import Step1 from '../pages/SignUp/Step1';
import Step2 from '../pages/SignUp/Step2';
import Finished from '../pages/SignUp/Finished';

import ForgotPassword from '../pages/ForgotPassword';
import SendEmail from '../pages/ForgotPassword/SendEmail';

import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="SignIn" component={SignIn} />
        <Screen name="Step1" component={Step1} />
        <Screen name="Step2" component={Step2} />
        <Screen name="Finished" component={Finished} />

        <Screen name="ForgotPassword" component={ForgotPassword} />
        <Screen name="ForgotSend" component={SendEmail} />

        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="Study" component={StudyTabs} />
      </Navigator>
    </NavigationContainer>
  );
};
export default AppStack;
