import { getUserCards, deleteUserCards } from '@/actions/UserActions';
import AlertModal from '@/components/AlertModal';
import { EmptyComponent } from '@/components/EmptyComponent';
import { styles } from '@/screens/Payment/Card.styles';
import { useTheme } from '@react-navigation/native';
import idx from 'idx';
import React, { useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Images from '../Profile/assets';
export function Card(props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);

  const gettingCard = useSelector((state) => state.user.gettingCard);
  const addingCard = useSelector((state) => state.user.addingCard);
  const allMyCards = useSelector((state) => state.user.allMyCards);
  let userData = useSelector((state) => state.user.user);
  let myStripeId = idx(userData, (_) => _.response.data.stripe.customerId);

  const confirm = () => {
    // dispatch(logout());
    setDeleteModal(false);
    dispatch(
      deleteUserCards({
        stripeCustomerId: myStripeId,
        cardId: cardDetails,
      })
    );
  };

  const cancel = () => {
    setDeleteModal(false);
  };

  const renderItem = ({ item, index }) => {
    return (
      <Pressable style={styles.card}>
        <View style={styles.amount}>
          <Image style={styles.imageLogo} source={Images.card} resizeMode={'contain'} />
        </View>
        <View style={styles.details}>
          <Text style={styles.cName}>XXXXXX XXXX {item.last4}</Text>
          <Text style={styles.cName}>{item.brand}</Text>
        </View>
        <Pressable
          onPress={() => {
            setSelectedCard(index);
            setDeleteModal(true);
            setCardDetails(item.id);
          }}
          style={styles.delete}
        >
          <Image style={styles.deleteIcon} source={Images.delete} resizeMode={'contain'} />
        </Pressable>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cardTxt}>Added Cards</Text>

      <FlatList
        onRefresh={() => {
          dispatch(
            getUserCards({
              stripeCustomerId: myStripeId,
            })
          );
        }}
        refreshing={gettingCard || addingCard}
        data={allMyCards}
        ListEmptyComponent={() => {
          return <EmptyComponent title={'No cards added.'} />;
        }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <AlertModal
        visibility={deleteModal}
        confirm={() => {
          confirm();
        }}
        cancel={() => {
          cancel();
        }}
        title={'Are you sure you want to delete this card?'}
      />
    </View>
  );
}
