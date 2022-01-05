import { styles } from '@/screens/ClientDetails/DetailCard.styles';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import * as Images from '@/screens/Dashboard/assets';
export function DetailsCard({ props }) {
  const { navigation } = props;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  const onDateSelection = (date) => {};
  const onChangeText = (value) => {};

  const renderItem = () => {
    return (
      <Pressable
        style={styles.card}
        onPress={() => {
          // console.log(props, 'adsdasdasd');
          navigation.navigate('OrderDetails');
        }}
      >
        <View style={styles.footer}>
          <View style={styles.service}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image style={styles.serviceicon} source={Images.case} resizeMode={'contain'} />
              <Text style={styles.type} numberOfLines={1}>
                Service Type{' '}
              </Text>
            </View>

            <Text style={styles.servicename}>Window Cleaning </Text>
          </View>
          <View style={styles.date}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image style={styles.serviceicon} source={Images.calendar} resizeMode={'contain'} />
              <Text style={styles.type} numberOfLines={1}>
                Date time{' '}
              </Text>
            </View>

            <Text style={styles.servicename}>02 : 20 12 October</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.service}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image style={styles.serviceicon} source={Images.case} resizeMode={'contain'} />
              <Text style={styles.type} numberOfLines={1}>
                Order Status{' '}
              </Text>
            </View>
            <Text style={styles.servicename}>Assigned</Text>
          </View>
          <View style={styles.date}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image style={styles.serviceicon} source={Images.calendar} resizeMode={'contain'} />
              <Text style={styles.type} numberOfLines={1}>
                Payment Received
              </Text>
            </View>

            <Text style={styles.amount}>£200</Text>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
