import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigations from '../constants/Navigations';
import CategoryFormScreen from '../screens/CategoryFormScreen';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import CategoryListScreen from '../screens/CategoryListScreen';

const Stack = createNativeStackNavigator();

export default function CategoryStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Navigations.CATEGORY_LIST}>
      <Stack.Screen
        name={Navigations.CATEGORY_FORM}
        component={CategoryFormScreen}
      />
      <Stack.Screen
        name={Navigations.CATEGORY_DETAILS}
        component={CategoryDetailScreen}
      />
      <Stack.Screen
        name={Navigations.CATEGORY_LIST}
        component={CategoryListScreen}
      />
    </Stack.Navigator>
  );
}
