import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { hide } from 'react-native-bootsplash';

import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootNavigator } from '@/navigation';
import { persistor, store } from '@/store';
import { SafeAreaView } from 'react-native';

export function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <PersistGate onBeforeLift={hide} persistor={persistor}>
          <SafeAreaView style={{ backgroundColor: '#EC008C' }} />
          <RootNavigator />
        </PersistGate>
      </PaperProvider>
    </StoreProvider>
  );
}
