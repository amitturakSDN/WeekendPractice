import { logout, uploadProfileImage } from '@/actions/UserActions';
import AlertModal from '@/components/AlertModal';
import { Button } from '@/components/Button';
import { FastImageComponent } from '@/components/FastImage.js';
import { NAVIGATION } from '@/constants';
import { imageBaseUrl } from '@/controllers/ApiList';
import { styles } from '@/screens/Profile/Profile.styles';
import { globalColors } from '@/theme';
import { useTheme } from '@react-navigation/native';
import idx from 'idx';
import React, { useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Images from './assets';
import { ProfileOptions } from './ProfileOption';

export function Profile(props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const { navigation } = props;
  let uploadingImage = useSelector((state) => state.user.uploadingImage);

  let loadingImage = useSelector((state) => state.profile.myAddingAddress);

  let myPicture = useSelector((state) => idx(state, (_) => _.profile.myadd.profileImage.src));

  const confirm = () => {
    dispatch(logout());
    setDeleteModal(false);
  };

  const cancel = () => {
    setDeleteModal(false);
  };

  const openCamera = () => {
    const options = { quality: 0.1 };
    launchImageLibrary(options, (res) => {
      let formData = new FormData();

      formData.append('profileImage', {
        uri: res && res.assets && res.assets[0] && res.assets[0].uri,
        name: res && res.assets && res.assets[0] && res.assets[0].fileName,
        type: res && res.assets && res.assets[0] && res.assets[0].type,
      });

      dispatch(uploadProfileImage(formData));
    });
  };

  return (
    <View style={styles.container} style={{position:'relative', top:300}}>
      {/* <View style={styles.pHeader}>
        <View style={styles.header}>
          <Text style={styles.settings}>Settings</Text>
        </View>
        <View style={styles.headerCard}>
          <View style={styles.cardOne}></View>
          <View style={styles.cardMiddle}>
            {uploadingImage || loadingImage ? (
              <ActivityIndicator color={globalColors.primaryTheme} />
            ) : (
              <Pressable
                onPress={() => {
                  openCamera();
                }}
              >
                {myPicture && myPicture.length > 1 ? (
                  FastImageComponent(`${imageBaseUrl}${myPicture}`, styles.imageLogo)
                ) : (
                  <Image style={styles.imageLogo} source={Images.user} resizeMode={'contain'} />
                )}
              </Pressable>
            )}
            <Text style={styles.usrname}>Adam johnson</Text>
            <Text style={styles.email} adjustsFontSizeToFit>
              adamjohnson@gmail.com
            </Text>
          </View>

          <TouchableOpacity
            style={styles.cardOne}
            onPress={() => navigation.navigate(NAVIGATION.editProfile)}
          >
            <Image style={styles.logo} source={Images.edit} resizeMode={'contain'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 0.6 }}>
        <ProfileOptions props={props} />
      </View> */}
      <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          onPress={() => {
            setDeleteModal(true);
          }}
          style={styles.buttonstyle}
          textStyle={styles.buttonText}
          title={'Logout'}
          // isLoading={loginLoader}
          // disabled={loginLoader}
        />
      </View>
      <AlertModal
        visibility={deleteModal}
        confirm={() => {
          confirm();
        }}
        cancel={() => {
          cancel();
        }}
        title={'Are you sure you want to logout?'}
      />
    </View>
  );
}
