import { globalColors } from '@/theme';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/AntDesign';

export const DropDown = ({ label, value, items, onValueChange }) => {
  return (
    <View style={pickerStyles.viewStyle}>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={items}
        value={value}
        // placeholder={value}
        Icon={() => {
          return Platform.OS == 'ios' ? (
            <Icon name="caretdown" size={16} color={globalColors.grey} />
          ) : null;
        }}
        style={{
          iconContainer: pickerStyles.iconStyles,
          ...pickerStyles,
        }}
      />
    </View>
  );
};
const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: RFValue(16),
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(8),
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(8),
    color: 'black',
    paddingRight: 30, //re the text is never behind the icon
  },
  iconStyles: {
    borderWidth: 0,
    top: RFValue(12),
    right: RFValue(10),
  },
  viewStyle: {
    borderWidth: 0.7,
    borderRadius: RFValue(5),
    borderColor: globalColors.grey,
    marginVertical: RFValue(5),
  },
});
