import { AppRegistry } from 'react-native';
import Routes from './src/routes';
import { name as appName } from './app.json';
import React from 'react';
import { Provider } from 'react-redux';
import { loja, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const RNRedux = () => (
  <Provider store={loja}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
