/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Platform, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { styles } from '@/screens/ServiceQuestion/ServiceQuestion.styles';
import { backArrow, check, mail, phone, calendar, settings } from '@/assets';
import { globalColors, globalFonts } from '@/theme';
import { TextField, Button } from '@/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRef } from 'react';
import { DropDown } from '@/components/DropDown';
import { NAVIGATION } from '@/constants';
import { getQuestionaire, setServiceQuestionaire } from '@/actions/HomeActions';
import { GlobalLoader } from '@/components/GlobalLoader';
import { Header } from '@/components/header';
let questions = [
  {
    question: 'How many bedrooms are there ?',
    options: [1, 2, 3, 4],
  },
  {
    question: 'What style is the property?',
    options: ['Terraced', 'Open'],
  },
  {
    question: 'Do you have a conservatory or extension?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Are there any issues with parking?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Would you be interested in a quote for fascia soffit and gutter cleaning?',
    options: ['Yes', 'No'],
  },
];
export function ServiceQuestion(props) {
  let { navigation } = props;
  const [selectedQuestion, setSelectedQuestions] = useState([]);
  const isServieQuestionRequest = useSelector((state) => state.home.isServiceQuestionRequest);
  const serviceQuestions = useSelector((state) => state.home.serviceQuestions);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuestionaire((cb) => {}));
  }, []);

  useEffect(() => {
    let prefilledQuestion = [];
    serviceQuestions &&
      serviceQuestions.map((item, index) => {
        prefilledQuestion.push({ answer: item.answer[0], question: item.question, id: index + 1 });
      });
    setSelectedQuestions(prefilledQuestion);
  }, [serviceQuestions]);

  const answerSelectedQuestion = (item, index, value) => {
    let valueFound = false;
    if (selectedQuestion.length > 0) {
      for (let i = 0; i < selectedQuestion.length; i++) {
        if (selectedQuestion[i].id == index) {
          selectedQuestion[i].answer = value;
          valueFound = true;
          break;
        }
      }
      if (valueFound == false) {
        selectedQuestion.push({
          id: index,
          question: item.question,
          answer: value,
        });
      }
    } else {
      selectedQuestion.push({
        id: index,
        question: item.question,
        answer: value,
      });
    }

    setSelectedQuestions([...selectedQuestion]);
  };
  const getPickerValues = (items) => {
    let values = [];
    items.map((item) =>
      values.push({
        label: '' + item,
        value: '' + item,
      })
    );
    return values;
  };
  const renderQuestions = (item, index) => {
    return (
      <View
        key={index}
        style={{
          paddingVertical: RFValue(10),
          width: '100%',
          borderWidth: 0,
          marginBottom: RFValue(5),
        }}
      >
        <Text style={styles.question}>
          {index + 1}.{item.question}
        </Text>
        <DropDown
          items={getPickerValues(item.answer)}
          value={selectedQuestion && selectedQuestion[index] && selectedQuestion[index].answer}
          onValueChange={(value) => answerSelectedQuestion(item, index + 1, value)}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header title={'Service Questions'} backEnable navProps={props} />

      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: globalColors.white }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
      >
        {isServieQuestionRequest ? (
          <GlobalLoader title={'Fetcing service Questions'} />
        ) : (
          <View style={{ paddingHorizontal: RFPercentage(3), flex: 1, paddingBottom: RFValue(10) }}>
            {serviceQuestions && serviceQuestions.length > 0
              ? serviceQuestions.map((item, index) => renderQuestions(item, index))
              : null}

            <Button
              style={[styles.button]}
              textStyle={styles.buttonText}
              title={'Submit'}
              onPress={() => {
                dispatch(setServiceQuestionaire(selectedQuestion));
                navigation.navigate(NAVIGATION.orderSummary);
              }}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}
