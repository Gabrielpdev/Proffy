import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './routes';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/dashboard" component={TeacherList} isPrivate />
    <Route path="/give-classes" component={TeacherForm} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
