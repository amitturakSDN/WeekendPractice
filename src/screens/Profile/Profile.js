import { useTheme } from '@react-navigation/native';
import { NAVIGATION } from '@/constants';
import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '@/actions/UserActions';
import { Button } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Profile/Profile.styles';
import { typography } from '@/theme';

export function Profile(props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { navigation } = props;
  const logoutUser = () => {
    // dispatch(logout());
    navigation.navigate(NAVIGATION.login)
  };

  return (
    <View style={styles.container}>
      <Text style={[typography.title, styles.title, { color: colors.text }]}>
        {strings.profile.message}
      </Text>
      <Button title={strings.profile.logout} onPress={logoutUser} />
    </View>
  );
}