import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigations from '../constants/Navigations';
import PostFormScreen from '../screens/PostFormScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import PostListScreen from '../screens/PostListScreen';
import {Button, Text} from 'react-native';
import {useUser} from '../contexts/UserProvider';

const Stack = createNativeStackNavigator();

function LogoTitle({title}) {
  return <Text>{title}</Text>;
}

export default function PostStack() {
  const {user} = useUser();
  return (
    <Stack.Navigator initialRouteName={Navigations.POST_LIST}>
      <Stack.Screen
        options={{headerShown: true, title: 'Nouvel Article'}}
        name={Navigations.POST_FORM}
        component={PostFormScreen}
      />
      <Stack.Screen
        name={Navigations.POST_DETAILS}
        component={PostDetailScreen}
        options={{headerShown: true, title: 'Article'}}
      />
      <Stack.Screen
        name={Navigations.POST_LIST}
        component={PostListScreen}
        options={({navigation, route}) => ({
          title: 'Articles',
          // Add a placeholder button without the `onPress` to avoid flicker
          headerRight: () => (
            <>
              {user?.isAdmin && (
                <Button
                  onPress={() => navigation.navigate(Navigations.POST_FORM)}
                  title="Créer"
                />
              )}
            </>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
