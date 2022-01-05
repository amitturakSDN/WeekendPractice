/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { Header } from '@/components/header';
import { hideTab, showTab } from '@/test-utils/hideBottomTab';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from './Card';
export const Invoice = (props) => {
  useEffect(() => {
    hideTab(props);
    return () => {
      showTab(props);
    };
  }, []);
  let loadingInvoice = useSelector((state) => state.profile.isInvoice);
  return (
    <>
      <Header title={'Invoices'} backEnable navProps={props} />
      <Card jobList={[1]} props={props} />
    </>
  );
};
