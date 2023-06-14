import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigations from '../constants/Navigations';
import AudioFormScreen from '../screens/AudioFormScreen';
import AudioDetailScreen from '../screens/AudioDetailScreen';
import AudioListScreen from '../screens/AudioListScreen';

const Stack = createNativeStackNavigator();

export default function AudioStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Navigations.AUDIO_LIST}>
      <Stack.Screen name={Navigations.AUDIO_FORM} component={AudioFormScreen} />
      <Stack.Screen
        name={Navigations.AUDIO_DETAILS}
        component={AudioDetailScreen}
      />
      <Stack.Screen name={Navigations.AUDIO_LIST} component={AudioListScreen} />
    </Stack.Navigator>
  );
}
