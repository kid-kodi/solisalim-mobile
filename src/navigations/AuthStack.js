import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import Navigations from '../constants/Navigations';
import RegisterScreen from '../screens/RegisterScreen';
import VerifyAccountScreen from '../screens/VerifyAccountScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import InitialScreen from '../screens/InitialScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={Navigations.INITIAL}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Navigations.INITIAL} component={InitialScreen} />
      <Stack.Screen name={Navigations.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Navigations.REGISTER} component={RegisterScreen} />
      <Stack.Screen
        name={Navigations.VERIFY_ACCOUNT}
        component={VerifyAccountScreen}
      />
      <Stack.Screen
        name={Navigations.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={Navigations.VERIFY_CODE}
        component={VerifyCodeScreen}
      />
      <Stack.Screen
        name={Navigations.RESET_PASSWORD}
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
}
