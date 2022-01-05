import { Header } from '@/components/clientHeader';
import { styles } from '@/screens/ClientDetails/ClientDetails.styles';
import { hideTab, showTab } from '@/test-utils/hideBottomTab';
import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { ClientCard } from './ClientCard';
import * as Images from '@/assets';
import { DetailsCard } from './DetailCard';
export function ClientDetails(props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    hideTab(props);
    return () => {
      showTab(props);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header
        backEnable
        title={'Client Details'}
        tabSelected={(val) => {}}
        navProps={props}
        title1={'Client Info'}
        title2={'Client Jobs'}
        addExtra={true}
      />
      <DetailsCard props={props} />
    </View>
  );
}
