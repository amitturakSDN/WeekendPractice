/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { Header } from '@/components/header';
import { hideTab, showTab } from '@/test-utils/hideBottomTab';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from './Card';
import { NAVIGATION } from '@/constants';
import { FlatList, Pressable, Text, View } from 'react-native';
import { styles } from './Card.styles';
export const PaymentMethod = (props) => {
  const { navigation } = props;
  useEffect(() => {
    hideTab(props);
    return () => {
      showTab(props);
    };
  }, []);
  // let loadingInvoice = useSelector((state) => state.profile.isInvoice);
  return (
    <>
      <Header title={'Payment Method'} backEnable navProps={props} />
      {/* <Card  props={props} /> */}
      <View style={styles.container}>
       <Pressable
        style={styles.card}
        onPress={() => navigation.navigate(NAVIGATION.payment)}
      >
        <View style={styles.details}>
          <Text style={styles.cName} numberOfLines={1} adjustsFontSizeToFit>
            Stripe
          </Text>
        </View>
      </Pressable>
       <Pressable
       onPress={() => navigation.navigate(NAVIGATION.cardless)}
        style={styles.card}
      >
        <View style={styles.details}>
          <Text style={styles.cName} numberOfLines={1} adjustsFontSizeToFit>
            Go-Cardless
          </Text>
        </View>
      </Pressable>
    </View>
    </>
  );
};
