import React from 'react';
import './assets/styles/global.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/index';
import AppProvider from './hooks/index';

const src: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>
  </Router>
);

export default src;
