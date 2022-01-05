/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { getUserCards, selectedCard } from '@/actions/UserActions';
import { card, radio_check, radio_uncheck } from '@/assets';
import { Button } from '@/components';
import { EmptyComponent } from '@/components/EmptyComponent';
import { styles } from '@/screens/OrderSummary/Payment.styles';
import { globalColors, globalFonts } from '@/theme';
import idx from 'idx';
import React, { useState } from 'react';
import { FlatList, Image, Modal, Pressable, SafeAreaView, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
export const PaymentModal = ({ visible, onCloseModal, addNewCard }) => {
  const gettingCard = useSelector((state) => state.user.gettingCard);
  const addingCard = useSelector((state) => state.user.addingCard);
  const allMyCards = useSelector((state) => state.user.allMyCards);
  let userData = useSelector((state) => state.user.user);
  let myStripeId = idx(userData, (_) => _.response.data.stripe.customerId);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dispatch = useDispatch();

  const CardItem = ({ item, index }) => {
    return (
      <Pressable
        style={styles.cardItemView}
        onPress={() => {
          setSelectedIndex(index);
          dispatch(selectedCard(item));
        }}
      >
        <View style={styles.leftCardView}>
          <Image source={card} style={styles.cardImage} resizeMode="contain" />
          <Text style={styles.cardNum}>
            XXXX XXXX {item.last4}
            {'\n'}
            <Text style={styles.cardNum}>{item.brand}</Text>
          </Text>
        </View>
        <View style={styles.rightCardView}>
          <Image
            style={styles.radioButton}
            source={index == selectedIndex ? radio_check : radio_uncheck}
            resizeMode="contain"
          />
        </View>
      </Pressable>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      style={{ flex: 1 }}
      visible={visible}
      onRequestClose={() => {}}
    >
      <SafeAreaView />
      <View style={styles.safeArea}>
        <Pressable style={{ flex: 0.5 }} onPress={onCloseModal} />
        <View style={styles.modalView}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>Payment</Text>
          </View>

          <FlatList
            onRefresh={() => {
              dispatch(
                getUserCards({
                  stripeCustomerId: myStripeId,
                })
              );
            }}
            refreshing={gettingCard}
            data={allMyCards}
            ListEmptyComponent={() => {
              return <EmptyComponent title={'No cards added.'} />;
            }}
            renderItem={CardItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
          <Text
            onPress={() => addNewCard()}
            style={{
              fontFamily: globalFonts.medium,
              fontSize: RFValue(16),
              textAlign: 'center',
              color: globalColors.primaryTheme,
              textDecorationLine: 'underline',
              paddingTop: RFValue(10),
            }}
          >
            Add new card
          </Text>
          <Button
            onPress={() => {
              if (selectedIndex >= 0) {
                onCloseModal();
              } else {
                Toast.show('Please select a card to continue');
              }
            }}
            title="Proceed"
            style={[styles.button]}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    </Modal>
  );
};
