import { styles } from '@/screens/OrderDetails/Invoice.styles';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { globalColors, globalFonts, spacing } from '@/theme';

var RNFS = require('react-native-fs');
export function InvoiceDownload(props) {
  const [loader, setLoader] = useState(false);
  const actualDownload = async () => {
    const path = `${RNFS.DocumentDirectoryPath}/TidalWaveInvoice_${Math.floor(
      100000 + Math.random() * 90000
    )}.pdf`;

    const options = {
      fromUrl: `https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf`,
      toFile: path,
      background: true,
    };
    const response = RNFS.downloadFile(options);
    response.promise.then(async (res) => {
      console.log(res, 'FILE_WRITTENNNNNN');

      if (res && res.statusCode === 200) {
        Toast.show('Files successfully saved to your local storage.');
        setLoader(false);
      } else {
        Toast.show('Error while downloading invoice.');
        setLoader(false);
      }
    });
  };
  const downloadInvoice = async () => {
    try {
      setLoader(true);
      if (Platform.OS == 'ios') {
        actualDownload();
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          actualDownload();
        } else {
          Alert.alert(
            'Permission Denied!',
            'You need to give storage permission to download the file'
          );
        }
      }
    } catch (err) {
      setLoader(false);
      Toast.show('Error while downloading invoice.');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          downloadInvoice();
        }}
        style={styles.button}
      >
        {loader ? (
          <ActivityIndicator color={globalColors.primaryTheme} />
        ) : (
          <Text style={styles.invoice}>Download Invoice</Text>
        )}
      </Pressable>
    </View>
  );
}
