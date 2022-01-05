// import {colors, fonts, moderateScale} from 'constants/common/theme';
import { globalColors } from '@/theme';
import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
const AlertModal = (props) => {
  const { visibility, confirm, cancel, title } = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibility}
      onRequestClose={() => null}
    >
      <View style={styles.body}>
        <TouchableOpacity onPress={cancel} style={styles.dark} />
        <View style={styles.bodyCenter}>
          <View style={styles.modal}>
            <View style={styles.heading}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.buttonHolder}>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={confirm}
                  style={[
                    styles.touchable,
                    {
                      backgroundColor: '#ff4c4c',
                    },
                  ]}
                >
                  <Text style={[styles.buttonText, { color: globalColors.white }]}>Yes </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.button}>
                <TouchableOpacity onPress={cancel} style={styles.touchable}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={cancel} style={styles.dark} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#0009',
  },
  modal: {
    height: 180,
    width: 300,
    borderRadius: 10,
    backgroundColor: globalColors.white,
    borderWidth: 2,
    borderColor: 'white',
  },
  heading: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    // fontFamily: fonts.REGULAR,
    color: globalColors.primaryTheme,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonHolder: {
    flex: 0.5,
    flexDirection: 'row',
  },
  button: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    height: '40%',
    width: '80%',
    borderWidth: 0.7,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: globalColors.lightPrimary,
  },
  buttonText: {
    fontSize: 15,
    // fontFamily: fonts.MEDIUM,
    color: globalColors.primaryTheme,
    fontWeight: 'bold',
  },
  dark: { flex: 0.35 },
  bodyCenter: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AlertModal;
