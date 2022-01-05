/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  RefreshControl,
} from 'react-native';
import { NAVIGATION } from '@/constants';
import { getMyAddressDetails, selectedAddress } from '@/actions/ProfileActions';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { hideTab, showTab } from '@/test-utils/hideBottomTab';
import _ from 'lodash';
import { styles } from './MyAddress.styles';
import { Header } from '@/components/header';
import * as Images from '../Profile/assets';
import AlertModal from '@/components/AlertModal';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import idx from 'idx';
import { deleteAddressDetails } from '@/actions/ProfileActions';
export const MyAddress = (props) => {
  const { navigation } = props;

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const dispatch = useDispatch();

  let myLoadingAddress = useSelector((state) => state.profile.myAddingAddress);
  let myAllAddress = useSelector((state) => idx(state, (_) => _.profile.myadd.customerAddress));
  let fromRequest = idx(props, (_) => _.route.params.fromRequest);

  let hideLoader = false;

  useEffect(() => {
    // dispatch(getMyAddressDetails());
    hideTab(props);
    return () => {
      showTab(props);
    };
  }, []);

  const _onRefresh = () => {
    dispatch(getMyAddressDetails());
  };

  // useEffect(() => {
  //   console.log('myLoadingAddress<<<<<', myLoadingAddress);
  // }, []);

  const confirm = () => {
    dispatch(deleteAddressDetails({ customerAddressId: deleteId }));
    setDeleteModal(false);
  };

  const cancel = () => {
    setDeleteModal(false);
  };

  const renderItem = ({ item, index }) => (
    <Pressable
      style={styles.section}
      onPress={() => {
        if (fromRequest) {
          dispatch(selectedAddress(item));
          navigation.navigate(NAVIGATION.serviceRequest);
        }
      }}
    >
      <View style={styles.field}>
        <View style={styles.image}>
          <Image style={styles.logo} source={Images.pin} resizeMode={'contain'} />
        </View>
        <View style={styles.body}>
          <Text style={styles.optionName}>{item.name}</Text>
        </View>
        <View style={styles.deletion}>
          <TouchableOpacity
            style={{ paddingVertical: 30, paddingRight: 10 }}
            onPress={() => navigation.navigate(NAVIGATION.addAddress, { prefilledDetails: item })}
          >
            <Image style={styles.deleteIcon} source={Images.edit} resizeMode={'contain'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ paddingVertical: 30, paddingRight: 10 }}
            onPress={() => {
              setDeleteId(item._id);
              setDeleteModal(true);
            }}
          >
            <Image style={styles.deleteIcon} source={Images.delete} resizeMode={'contain'} />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );

  return (
    <>
      <Header title={'My Address'} backEnable navProps={props} />
      <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
        <View style={{ flex: 1, paddingHorizontal: RFPercentage(2), paddingVertical: RFValue(10) }}>
          <View style={styles.paymentMethodView}>
            <Text style={styles.paymentMethodText}>Address</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(NAVIGATION.addAddress)}
              style={styles.addBtn}
            >
              <Text style={styles.btnTxtColor}>Add</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={myAllAddress}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            refreshControl={<RefreshControl refreshing={myLoadingAddress} onRefresh={_onRefresh} />}
          />
        </View>
        <AlertModal
          visibility={deleteModal}
          confirm={() => {
            confirm();
          }}
          cancel={() => {
            cancel();
          }}
          title={'Are you sure you want to delete this address?'}
        />
      </View>
    </>
  );
};
