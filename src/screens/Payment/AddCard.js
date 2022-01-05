import { EmptyComponent } from '@/components/EmptyComponent';
import { styles } from '@/screens/Payment/AddCard.styles';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { FlatList, Pressable, Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Images from '@/assets';
import { Button, TextField } from '@/components';
import { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { addNewCard } from '@/actions/UserActions';
import idx from 'idx';
import Toast from 'react-native-simple-toast';
export function AddCard(props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const addingCard = useSelector((state) => state.user.addingCard);
  let userData = useSelector((state) => state.user.user);
  let myStripeId = idx(userData, (_) => _.response.data.stripe.customerId);

  const addCard = () => {
    let year = expiry.match(/.{1,2}/g)[0];
    let month = expiry.match(/.{1,2}/g)[1];

    let addCardObj = {
      stripeCustomerId: myStripeId,
      number: cardNumber,
      exp_month: parseInt(month),
      exp_year: parseInt(year),
      cvc: cvv,
    };

    if (cardNumber.length < 16) {
      Toast.show('Card number must be of 16 digit');
    } else if (expiry.length < 4) {
      Toast.show('Card expiry must be in format YYMM(2805)');
    } else if (cvv.length < 3) {
      Toast.show('CVV must be of 3 digit');
    } else {
      dispatch(addNewCard(addCardObj));
      setCardNumber(null);
      setCvv(null);
      setExpiry(null);
    }
  };
  return (

    
    <View style={styles.container}>
      <Text style={styles.cardTxt}>Add New Card</Text>
      <TextField
        label="Card Number"
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={(value) => setCardNumber(value)}
        autoCapitalize={'none'}
        maxLength={16}
        keyboardType={'numeric'}
      />
      <View style={styles.detailHolder}>
        <View
          style={[
            styles.child,
            {
              paddingRight: RFValue(10),
            },
          ]}
        >
          <TextField
            label="Expiry date(YYMM)"
            placeholder="Expiry date(YYMM)"
            value={expiry}
            onChangeText={(value) => setExpiry(value)}
            autoCapitalize={'none'}
            maxLength={4}
            keyboardType={'numeric'}
          />
        </View>
        <View style={styles.child}>
          <TextField
            label="CVV"
            placeholder="CVV"
            value={cvv}
            onChangeText={(value) => setCvv(value)}
            autoCapitalize={'none'}
            maxLength={3}
            keyboardType={'numeric'}
          />
        </View>
      </View>
      <Button
        onPress={() => {
          addCard();
        }}
        style={styles.button}
        textStyle={styles.buttonText}
        title={'Add Card'}
        isLoading={addingCard}
        disabled={addingCard}
      />
    </View>
  );
}
