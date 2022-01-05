import { styles } from '@/screens/OrderDetails/Signature.styles';
import { useTheme } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import { Text, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import SignatureScreen from 'react-native-signature-canvas';

export function Signature(props) {
  const { setScroll } = props;
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const ref = useRef();

  const handleOK = (signature) => {
    // onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {};

  // Called after ref.current.clearSignature()
  const handleClear = () => {};

  // Called after ref.current.getData()
  const handleData = (data) => {};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customer's Signature</Text>
      <View style={styles.card}>
        <SignatureScreen
          ref={ref}
          onBegin={() => {
            setScroll(false);
          }}
          onEnd={(value) => {
            setScroll(true), handleOK(value);
            ref.current.readSignature();
          }}
          onOK={handleOK}
          onEmpty={handleEmpty}
          onClear={handleClear}
          onGetData={handleData}
          // autoClear={true}
          descriptionText={'Sign here'}
        />
      </View>
    </View>
  );
}
