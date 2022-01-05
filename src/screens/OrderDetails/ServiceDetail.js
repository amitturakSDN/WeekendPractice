import { logout } from '@/actions/UserActions';
import { styles } from '@/screens/OrderDetails/ServiceDetail.styles';
import { useTheme } from '@react-navigation/native';
import idx from 'idx';
import React from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';

export function ServiceDetail({ props }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const services = idx(props, (_) => _.serviceData);
  const addOnServices = idx(props, (_) => _.addonServiceData);
  let x = [1, 2];
  const logoutUser = () => {
    dispatch(logout());
  };
  console.log(props, 'servicesservices');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Service Details</Text>
      {services &&
        services.map((item, index) => {
          const serviceDescription = String(idx(item, (_) => _.serviceDesc)).replace(
            /<(.|\n)*?>/g,
            ''
          );

          return (
            <View
              key={index}
              style={[
                styles.card,
                {
                  borderTopLeftRadius: index == 0 ? RFValue(15) : 0,
                  borderTopRightRadius: index == 0 ? RFValue(15) : 0,

                  borderBottomRightRadius: index == services.length - 1 ? RFValue(15) : 0,
                  borderBottomLeftRadius: index == services.length - 1 ? RFValue(15) : 0,
                },
              ]}
            >
              <View style={[styles.serviceCont]}>
                <Text style={styles.serviceName}>{idx(item, (_) => _.serviceName)}</Text>
                <Text style={styles.type} numberOfLines={1}>
                  {serviceDescription}
                </Text>
              </View>
              <View style={styles.amtCnt}>
                <Text style={styles.amtTxt}>£{idx(item, (_) => _.servicePrice)}</Text>
              </View>
            </View>
          );
        })}

      {addOnServices && addOnServices.length > 0 ? (
        <Text style={styles.addons}>Add-On Services</Text>
      ) : null}

      {addOnServices &&
        addOnServices.map((item, index) => {
          const serviceDescription = String(idx(item, (_) => _.serviceDesc)).replace(
            /<(.|\n)*?>/g,
            ''
          );

          return (
            <View
              key={index}
              style={[
                styles.card,
                {
                  borderTopLeftRadius: index == 0 ? RFValue(15) : 0,
                  borderTopRightRadius: index == 0 ? RFValue(15) : 0,

                  borderBottomRightRadius: index == addOnServices.length - 1 ? RFValue(15) : 0,
                  borderBottomLeftRadius: index == addOnServices.length - 1 ? RFValue(15) : 0,
                },
              ]}
            >
              <View style={[styles.serviceCont]}>
                <Text style={styles.serviceName}>{idx(item, (_) => _.serviceName)}</Text>
                <Text style={styles.type} numberOfLines={1}>
                  {serviceDescription}
                </Text>
              </View>
              <View style={styles.amtCnt}>
                <Text style={styles.amtTxt}>£{idx(item, (_) => _.servicePrice)}</Text>
              </View>
            </View>
          );
        })}
      <View style={styles.calculation}>
        {/* <View style={styles.field}>
          <Text style={styles.title}>Sub Total</Text>
          <Text style={styles.titleText}>£400</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.title}>Extra</Text>
          <Text style={styles.titleText}>£400</Text>
        </View> */}
        <View style={[styles.totField]}>
          <Text style={styles.titleText}>Total</Text>
          <Text style={styles.titleText}>£{idx(props, (_) => _.totalServicePrice)}</Text>
        </View>
      </View>
    </View>
  );
}
