import { styles } from '@/screens/OrderDetails/Concern.styles';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Images from '@/assets';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ComplainModal from '@/components/ComplainModal';
import { raiseConcern } from '@/actions/ScheduleActions';
export function Concern({ props }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const raisingConcern = useSelector((state) => state.schedule.raisingConcern);
  const [complainModal, setComplainModal] = useState(false);
  const confirm = (complain) => {
    dispatch(
      raiseConcern({
        serviceRequestId: props._id,
        raiseConcern: complain,
      })
    );
    setComplainModal(false);
  };
  const cancel = () => {
    setComplainModal(false);
  };

  return (
    <>
      <Pressable
        onPress={() => {
          setComplainModal(true);
        }}
        style={styles.container}
      >
        <Image style={styles.serviceicon} source={Images.concern} resizeMode={'contain'} />
        <Text style={styles.concern}>Raise Complain ?</Text>
      </Pressable>
      <ComplainModal
        visibility={complainModal}
        confirm={(value) => {
          confirm(value);
        }}
        cancel={() => {
          cancel();
        }}
      />
    </>
  );
}
