import { logout } from '@/actions/UserActions';
import { styles } from '@/screens/OrderDetails/ServiceQuestions.styles';
import { globalColors } from '@/theme';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import * as Images from '@/assets';
import { useState } from 'react';
import idx from 'idx';

export function ServiceQuestions({ props }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const allQuestions = idx(props, (_) => _.questionnaire);
  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Questions</Text>

      <View style={styles.card}>
        {!open ? (
          <View style={styles.cardChild}>
            <Text style={styles.question}>
              1. {allQuestions && idx(allQuestions[0], (_) => _.question)}
            </Text>
            <Text style={styles.answer}>
              {allQuestions && idx(allQuestions[0], (_) => _.answer)}
            </Text>
          </View>
        ) : (
          allQuestions &&
          allQuestions.map((item, index) => {
            return (
              <View style={styles.cardChild} key={index}>
                <Text style={styles.question}>
                  {index + 1}. {idx(item, (_) => _.question)}
                </Text>
                <Text style={styles.answer}>{idx(item, (_) => _.answer)}</Text>
              </View>
            );
          })
        )}
        <Pressable
          onPress={() => {
            setOpen(!open);
          }}
          style={{
            height: RFValue(40),
            width: '100%',
            alignSelf: 'center',
            borderTopWidth: 1,
            borderTopColor: globalColors.grey,
            justifyContent: 'center',
          }}
        >
          <Image
            style={styles.serviceicon}
            source={open ? Images.up : Images.down}
            resizeMode={'contain'}
          />
        </Pressable>
      </View>
    </View>
  );
}
