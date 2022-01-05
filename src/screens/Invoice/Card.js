import { EmptyComponent } from '@/components/EmptyComponent';
import { styles } from './Card.styles';
import idx from 'idx';
import moment from 'moment';
import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMyAddressDetails, getMyInvoices } from '@/actions/ProfileActions';

console.log(styles, 'stylesstyles');
export function Card(props) {
  const dispatch = useDispatch();

  let loadingInvoice = useSelector((state) => idx(state, (_) => _.profile.loadingInvoice));
  let myInvoices = useSelector((state) => idx(state, (_) => _.profile.myInvoices));

  const getAllInvoices = () => {
    dispatch(
      getMyInvoices({
        pageNum: 0,
        limit: 100,
      })
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.card}
        onPress={() => {
          console.log('propspropsprops', props);

          props.props.navigation.navigate('OrderDetails', {
            id: item._id,
            fromCompleted: true,
            fromInvoice: true,
          });
        }}
      >
        <View style={styles.details}>
          <Text style={styles.cName} numberOfLines={1} adjustsFontSizeToFit>
            Paid for {idx(item, (_) => _.serviceData[0].serviceName)}
          </Text>
          <Text style={styles.sName}>
            {moment(idx(item, (_) => _.serviceDateTime)).format('DD-MM-yyyy')}
          </Text>
          <Text numberOfLines={1} style={styles.aName}>
            {idx(item, (_) => _.location.address)}
          </Text>
        </View>
        <View style={styles.amount}>
          <Text style={styles.amtText}>-£{idx(item, (_) => _.serviceData[0].servicePrice)}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={() => {
          getAllInvoices();
        }}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        refreshing={loadingInvoice}
        data={myInvoices || []}
        ListEmptyComponent={() => {
          return <EmptyComponent title={'No invoices found.'} />;
        }}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
