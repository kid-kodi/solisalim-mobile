import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigations from '../constants/Navigations';
import ItemFormScreen from '../screens/ItemFormScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import ItemListScreen from '../screens/ItemListScreen';

const Stack = createNativeStackNavigator();

export default function ItemStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Navigations.ITEM_LIST}>
      <Stack.Screen name={Navigations.ITEM_FORM} component={ItemFormScreen} />
      <Stack.Screen
        name={Navigations.ITEM_DETAILS}
        component={ItemDetailScreen}
      />
      <Stack.Screen name={Navigations.ITEM_LIST} component={ItemListScreen} />
    </Stack.Navigator>
  );
}
