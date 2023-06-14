import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigations from '../constants/Navigations';
import VideoFormScreen from '../screens/VideoFormScreen';
import VideoDetailScreen from '../screens/VideoDetailScreen';
import VideoListScreen from '../screens/VideoListScreen';

const Stack = createNativeStackNavigator();

export default function VideoStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Navigations.VIDEO_LIST}>
      <Stack.Screen name={Navigations.VIDEO_FORM} component={VideoFormScreen} />
      <Stack.Screen
        name={Navigations.VIDEO_DETAILS}
        component={VideoDetailScreen}
      />
      <Stack.Screen name={Navigations.VIDEO_LIST} component={VideoListScreen} />
    </Stack.Navigator>
  );
}
