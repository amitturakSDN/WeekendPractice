import { styles } from '@/screens/OrderDetails/JobPhotos.styles';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadProfileImage, rateImageUpload } from '@/actions/UserActions';
import idx from 'idx';
import { RFValue } from 'react-native-responsive-fontsize';
import { imageBaseUrl } from '@/controllers/ApiList';
import { ActivityIndicator } from 'react-native-paper';
import { globalColors } from '@/theme';
export function Photos(props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [jobPic, setJobPic] = useState('');
  let groupImages = idx(props, (_) => _.props.route.params.fromCompleted);
  let ratingGiven = idx(props, (_) => _.ratingGiven);
  let ratingImage = idx(props, (_) => _.ratingGiven.images);

  let allImages = useSelector((state) => state.user.allRateImage);
  let uploadingImages = useSelector((state) => state.user.ratingImage);

  const openCamera = () => {
    const options = { quality: 0.5 };
    launchImageLibrary(options, (res) => {
      setJobPic(res && res.assets && res.assets[0] && res.assets[0].uri);

      if (groupImages) {
        let formData = new FormData();

        formData.append('chatImage', {
          uri: res && res.assets && res.assets[0] && res.assets[0].uri,
          name: res && res.assets && res.assets[0] && res.assets[0].fileName,
          type: res && res.assets && res.assets[0] && res.assets[0].type,
        });

        dispatch(rateImageUpload(formData));
      } else {
        let formData = new FormData();

        formData.append('profileImage', {
          uri: res && res.assets && res.assets[0] && res.assets[0].uri,
          name: res && res.assets && res.assets[0] && res.assets[0].fileName,
          type: res && res.assets && res.assets[0] && res.assets[0].type,
        });
        dispatch(uploadProfileImage(formData));
      }
    });
  };

  console.log(props, 'ratingGivenratingGiven', ratingGiven && ratingGiven);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Photos</Text>
      {jobPic
        ? allImages.map((item, Index) => {
            return (
              <View
                key={Index}
                disabled={jobPic && jobPic.length > 5}
                style={[styles.card, { marginTop: RFValue(15) }]}
                onPress={() => {
                  openCamera();
                }}
              >
                <Image
                  style={styles.picStyles}
                  source={{ uri: `${imageBaseUrl}${item}` }}
                  resizeMode={'contain'}
                />
              </View>
            );
          })
        : ratingImage && ratingImage.length > 0
        ? ratingImage.map((item, Index) => {
            return (
              <View
                key={Index}
                disabled={jobPic && jobPic.length > 5}
                style={[styles.card, { marginTop: RFValue(15) }]}
                onPress={() => {
                  openCamera();
                }}
              >
                <Image
                  style={styles.picStyles}
                  source={{ uri: `${imageBaseUrl}${item}` }}
                  resizeMode={'contain'}
                />
              </View>
            );
          })
        : null}

      {!ratingGiven ? (
        <Pressable
          disabled={uploadingImages || (ratingGiven && ratingGiven.rating)}
          style={[styles.card, { marginTop: RFValue(15), height: RFValue(60) }]}
          onPress={() => {
            openCamera();
          }}
        >
          {uploadingImages ? (
            <ActivityIndicator color={globalColors.primaryTheme} />
          ) : (
            <Text style={styles.photo}>Add photos</Text>
          )}
        </Pressable>
      ) : null}
    </View>
  );
}
