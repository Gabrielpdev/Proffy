import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import Landing from '../pages/Landing';
import SignIn from '../pages/SignIn';
import Step1 from '../pages/SignUp/Step1';
import Step2 from '../pages/SignUp/Step2';
import Finished from '../pages/SignUp/Finished';

import ForgotPassword from '../pages/ForgotPassword';
import SendEmail from '../pages/ForgotPassword/SendEmail';

// import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="Step1" component={Step1} />
      <Screen name="Step2" component={Step2} />
      <Screen name="Finished" component={Finished} />

      <Screen name="ForgotPassword" component={ForgotPassword} />
      <Screen name="ForgotSend" component={SendEmail} />

      {/* <Screen name="Dashboard" component={StudyTabs} /> */}
    </Navigator>
  );
};
export default AuthRoutes;
