import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {globalStyle} from '../styles/global';
import Images from '../constants/Images';
import Navigations from '../constants/Navigations';
import Texts from '../constants/Texts';

export default function InitialScreen({navigation}) {
  return (
    <Screen>
      <View style={globalStyle.centerContainer}>
        <View style={globalStyle.logoView}>
          <Image
            source={Images.logo}
            resizeMode="contain"
            style={globalStyle.logo}
          />
        </View>
        <TouchableOpacity
          style={globalStyle.loginBtn}
          onPress={() => navigation.navigate(Navigations.REGISTER)}>
          <Text style={globalStyle.loginText}>{Texts.REGISTER}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyle.button}
          onPress={() => navigation.navigate(Navigations.LOGIN)}>
          <Text style={globalStyle.buttonText}>{Texts.LOGIN}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
