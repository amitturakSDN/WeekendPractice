import InfoModal from '@/components/InfoModal';
import { HttpClient } from '@/controllers';
import { AppNavigator } from '@/navigation/AppNavigator';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { getUser } from '@/selectors/UserSelectors';
import { globalColors, theme } from '@/theme';
import { NavigationContainer } from '@react-navigation/native';
import idx from 'idx';
import React, { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import socket from '@/test-utils/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hideInfoModal } from '@/actions/PersistActions';
export function RootNavigator() {
  const user = useSelector(getUser);
  const scheme = useColorScheme();
  console.log('user',user)
  const dispatch = useDispatch();
  let userToken = idx(user, (_) => _.response.data.loginToken);
  let infoModalStatus = useSelector((state) => state.permanentPersist.infoModalStatus);

  const retrieveToken = async () => {
    const value = await AsyncStorage.getItem('userToken');
    if (value !== null) {
      HttpClient.setAuthorization(value);
    }
  };

  if (Platform.OS == 'android') {
    retrieveToken();
  } else {
    HttpClient.setAuthorization(userToken);
  }
  const displayInfoModal = async () => {
    const alreadyDisplayed = await AsyncStorage.getItem('alreadyDisplayed');
    if (!alreadyDisplayed) dispatch(hideInfoModal(true));
  };

  useEffect(() => {
    displayInfoModal();
  }, []);

  return (
    <NavigationContainer theme={theme[scheme]}>
      <StatusBar barStyle="light-content" backgroundColor={globalColors.primaryTheme} />
      {user ? <AppNavigator /> : <AuthNavigator />}
      {Platform.OS != 'ios' && (
        <InfoModal
          cancel={() => {
            dispatch(hideInfoModal(false));
          }}
          visibility={infoModalStatus}
        />
      )}
    </NavigationContainer>
  );
}
