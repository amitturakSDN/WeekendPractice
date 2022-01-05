import { EmptyComponent } from '@/components/EmptyComponent';
import { styles } from './Card.styles';
import idx from 'idx';
import moment from 'moment';
import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NAVIGATION } from '@/constants';
import { getMyAddressDetails, getMyInvoices } from '@/actions/ProfileActions';

export function Card(props) {
  const dispatch = useDispatch();

  const { navigation } = props;
  return (
    <View style={styles.container}>
       <Pressable
        style={styles.card}
        onPress={() => navigation.navigate(NAVIGATION.paymentMethod)}
      >
        <View style={styles.details}>
          <Text style={styles.cName} numberOfLines={1} adjustsFontSizeToFit>
            Stripe
          </Text>
        </View>
      </Pressable>
       <Pressable
        style={styles.card}
      >
        <View style={styles.details}>
          <Text style={styles.cName} numberOfLines={1} adjustsFontSizeToFit>
            Go-Cardless
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
