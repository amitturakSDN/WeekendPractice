import * as Images from '@/assets';
import { styles } from '@/screens/OrderDetails/Rating.styles';
import { globalColors } from '@/theme';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View, TextInput } from 'react-native';
import Stars from 'react-native-stars';
import { useDispatch } from 'react-redux';
import idx from 'idx';
export function Rating(props) {
  let ratingComment = idx(props, (_) => _.ratingGiven.comment);
  let ratingStar = idx(props, (_) => _.ratingGiven.rating);

  console.log('ratingImageratingImageratingImage');
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customer's Feedback</Text>
      <View style={styles.star}>
        <Stars
          update={(val) => {
            props.setRating(val);
          }}
          disabled={ratingStar ? true : false}
          default={ratingStar ? ratingStar : 1}
          count={5}
          half={true}
          starSize={50}
          fullStar={<Image style={styles.imageLogo} source={Images.fStar} resizeMode={'contain'} />}
          emptyStar={
            <Image style={styles.imageLogo} source={Images.estar} resizeMode={'contain'} />
          }
          halfStar={<Image style={styles.imageLogo} source={Images.fStar} resizeMode={'contain'} />}
        />
      </View>
      {ratingComment ? (
        <TextInput
          editable={false}
          placeholderTextColor={globalColors.primaryTheme}
          style={styles.card}
          value={ratingComment}
          onChangeText={(value) => {}}
          multiline
          placeholder="Please enter your feedback here..."
        />
      ) : (
        <TextInput
          placeholderTextColor={globalColors.primaryTheme}
          style={styles.card}
          onChangeText={(value) => {
            props.commentText(value);
          }}
          multiline
          placeholder="Please enter your feedback here..."
        />
      )}
    </View>
  );
}
