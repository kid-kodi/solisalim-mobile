import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Loader from './Loader';

export default function Screen({
  isLoading,
  statusBarColor,
  barStyle,
  children,
  style = {},
}) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <StatusBar barStyle={barStyle} backgroundColor={'#fff'} />
        <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
        <Loader isLoading={isLoading} />
      </>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
