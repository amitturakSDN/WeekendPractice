import { Header } from '@/components/header';
import { styles } from '@/screens/CardlessPayment/Cardless.styles';
import { hideTab, showTab } from '@/test-utils/hideBottomTab';
import { Button, TextField } from '@/components';
import { globalColors } from '@/theme';
import { isEmpty } from '@/test-utils/validation';
import idx from 'idx';
import React, { useEffect } from 'react';
import Toast from 'react-native-simple-toast';
import { View } from 'react-native';
import { AddCard } from './AddCard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
export function Cardless(props) {


  const[accountNumber,setAccountNumber] = useState('');
  const[branchCode,setBranchCode] = useState('');
  const[accountHolderName, setAccountHolderName] = useState('');
  const[countryCode,setCountryCode] = useState('');

  useEffect(() => {
    hideTab(props);
  }, []);

  const validateAddressDetails = () =>{
    if (isEmpty(accountNumber)) {
      Toast.show('Account Number cannot be empty');
    } else if (isEmpty(branchCode)) {
      Toast.show('Branch Code cannot be empty');
    } else if (isEmpty(accountHolderName)) {
      Toast.show('Account Holder Name cannot be empty');
      return;
    } else if (isEmpty(countryCode)) {
      Toast.show('Country Code cannot be empty');
      return;
    }
    let cardlessDetails = {
      account_number:accountNumber,
      branch_code:branchCode,
      account_holder_name:accountHolderName,
      country_code:countryCode
    };
    // dispatch(setServiceDetails(cardlessDetails));
    // navigation.navigate(NAVIGATION.serviceQuestion);
  }

  return (
    <>
    <Header
      title={'Go-Cardless'}
      backEnable
      navProps={props}
    />
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: globalColors.white }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      // scrollEnabled={true}
    >
      <View style={{ flex: 1, paddingHorizontal: RFPercentage(2), paddingVertical: RFValue(10) }}>
        <TextField
          label=" Account Number"
          onChangeText={(text) => setAccountNumber(text)}
          placeHolder={'Account Number'}
          // value={name}
        />
        <TextField
          label=" Branch Code"
          onChangeText={(text) => setBranchCode(text)}
          placeHolder={'Branch Code'}
          // value={houseNumber}
        />
        <TextField
          label=" Account Holder Name"
          onChangeText={(text) => setAccountHolderName(text)}
          placeHolder={'Account Holder Name'}
          // value={houseNumber}
        />
        <TextField
          label=" Country Code"
          onChangeText={(text) => setCountryCode(text)}
          placeHolder={'Country Code'}
          // value={houseNumber}
        />
   
        <Button
          onPress={() => {
            validateAddressDetails();
          }}
          style={[styles.button]}
          textStyle={styles.buttonText}
          title={'Add'}
          isLoading={false}
          disabled={false}
        />
      </View>
    </KeyboardAwareScrollView>
  </>
  );
}
