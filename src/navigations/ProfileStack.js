import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileFormScreen from '../screens/ProfileFormScreen';
import Navigations from '../constants/Navigations';
import {useUser} from '../contexts/UserProvider';
import AuthStack from './AuthStack';
import MyPostsScreen from '../screens/MyPostsScreen';
import MessagesListScreen from '../screens/MessagesListScreen';
import SubscriptionsListScreen from '../screens/SubscriptionsListScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  const {user} = useUser();
  return (
    <>
      {user ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            options={{headerShown: true, title: 'Mon Profile'}}
            name={Navigations.PROFILE}
            component={ProfileScreen}
          />
          <Stack.Screen
            options={{headerShown: true, title: 'Modifier Votre Profile'}}
            name={Navigations.PROFILE_FORM}
            component={ProfileFormScreen}
          />
          <Stack.Screen
            options={{headerShown: true, title: 'Mes Articles'}}
            name={Navigations.MY_POSTS}
            component={MyPostsScreen}
          />
          <Stack.Screen
            options={{headerShown: true, title: 'Mes Messages'}}
            name={Navigations.MY_MESSAGES}
            component={MessagesListScreen}
          />
          <Stack.Screen
            options={{headerShown: true, title: 'Mes Abonnements'}}
            name={Navigations.SUBSCRIPTIONS}
            component={SubscriptionsListScreen}
          />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
    </>
  );
}
