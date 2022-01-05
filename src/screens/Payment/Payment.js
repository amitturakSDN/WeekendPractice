import { Header } from '@/components/header';
import { styles } from '@/screens/Payment/Payment.styles';
import { hideTab, showTab } from '@/test-utils/hideBottomTab';
import idx from 'idx';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { AddCard } from './AddCard';
import { Card } from './Card';
export function Payment(props) {
  let reopenModal = idx(props, (_) => _.route.params.reCall);

  useEffect(() => {
    hideTab(props);
    return () => {
      reopenModal();
      if (!reopenModal) showTab(props);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Header title={`Payment`} backEnable navProps={props} />
      <View style={styles.addCard}>
        <AddCard />
      </View>
      <View style={styles.listCard}>
        <Card />
      </View>
    </View>
  );
}
