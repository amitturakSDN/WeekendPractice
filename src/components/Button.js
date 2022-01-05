import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { typography } from '@/theme';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0,
    padding: 10,
    width: '100%',
  },
});

export function Button({ style, textStyle, title, isLoading, loaderColor, ...rest }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={loaderColor ? loaderColor : 'white'} />
      ) : (
        <Text style={[{ color: colors.text }, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  // style: PropTypes.object,
  // textStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
};

Button.defaultProps = {
  style: null,
  textStyle: null,
};
