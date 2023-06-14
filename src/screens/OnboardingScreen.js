import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

export default function OnboardingScreen({navigation}) {
  const Done = ({...props}) => (
    <TouchableOpacity {...props}>
      <Text style={{fontSize: 16, marginHorizontal: 20}}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      onSkip={() => navigation.replace('ROUTE_STACK')}
      onDone={() => navigation.replace('ROUTE_STACK')}
      DoneButtonComponent={Done}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/1.png')} />,
          title: 'MAKE ORDER',
          subtitle: 'Welcome to the first slide of the Onboarding Swiper.',
        },
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/2.png')} />,
          title: 'CHOOSE PAYMENT',
          subtitle: 'Welcome to the first slide of the Onboarding Swiper.',
        },
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/3.png')} />,
          title: 'FAST DELIVERY',
          subtitle: 'Welcome to the first slide of the Onboarding Swiper.',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
