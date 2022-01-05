/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { styles } from '@/screens/OrderDetails/Technician.styles';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View, Linking, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Images from '@/assets';
import idx from 'idx';
import { FastImageComponent } from '@/components/FastImage.js';
import { imageBaseUrl } from '@/controllers/ApiList';

function TechnicianMemo({ props }) {
  const technicians = idx(props, (_) => _.staffData);

  const renderItem = (item, index) => {
    return (
      <View style={styles.child} key={index}>
        <View style={styles.img}>
          <View style={styles.circle}>
            {idx(item, (_) => _.profileImage.src) ? (
              FastImageComponent(
                `${imageBaseUrl}${idx(item, (_) => _.profileImage.src)}`,
                styles.imageLogo
              )
            ) : (
              <Image style={styles.imageLogo} source={Images.user} resizeMode={'contain'} />
            )}
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.header}>{idx(item, (_) => _.username)}</Text>
          <Text style={styles.subHeader}>
            {idx(item, (_) => _.mobile.code)}
            {idx(item, (_) => _.mobile.number)}
          </Text>
        </View>

        <Pressable
          disabled={idx(props, (_) => _.status) == 4}
          onPress={() => {
            Linking.openURL(`tel:${idx(item, (_) => _.mobile.number)}}`);
          }}
          style={styles.chat}
        >
          {idx(props, (_) => _.status) != 4 && (
            <Image style={styles.callicon} source={Images.call} resizeMode={'contain'} />
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {technicians && technicians.length > 0 ? (
        <Text style={styles.header}>Technicians</Text>
      ) : null}
      {technicians &&
        technicians.map((item, index) => {
          return renderItem(item, index);
        })}
    </View>
  );
}

export const Technician = React.memo(TechnicianMemo);
