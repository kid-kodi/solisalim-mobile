import React from 'react';
import AppStack from './AppStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import Navigations from '../constants/Navigations';

const Stack = createNativeStackNavigator();

export default function RouteStack() {
  return (
    <Stack.Navigator
      initialRouteName={Navigations.APP_STACK}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Navigations.AUTH_STACK} component={AuthStack} />
      <Stack.Screen name={Navigations.APP_STACK} component={AppStack} />
    </Stack.Navigator>
  );
  // return (
  //   <Stack.Navigator
  //     screenOptions={{headerShown: false}}
  //     initialRouteName={Navigations.USER_LIST}>
  //     <Stack.Screen name={Navigations.USER_FORM} component={UserFormScreen} />
  //     <Stack.Screen
  //       name={Navigations.USER_DETAILS}
  //       component={UserDetailScreen}
  //     />
  //     <Stack.Screen name={Navigations.USER_LIST} component={UserListScreen} />
  //   </Stack.Navigator>
  // );
}
