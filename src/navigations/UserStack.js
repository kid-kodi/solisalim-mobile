import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigations from '../constants/Navigations';
import UserFormScreen from '../screens/UserFormScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import UserListScreen from '../screens/UserListScreen';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Navigations.USER_LIST}>
      <Stack.Screen name={Navigations.USER_FORM} component={UserFormScreen} />
      <Stack.Screen
        name={Navigations.USER_DETAILS}
        component={UserDetailScreen}
      />
      <Stack.Screen name={Navigations.USER_LIST} component={UserListScreen} />
    </Stack.Navigator>
  );
}
