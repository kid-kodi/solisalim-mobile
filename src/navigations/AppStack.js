import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import HomeScreen from '../screens/HomeScreen';
import Navigations from '../constants/Navigations';
import ProfileStack from './ProfileStack';
import VideoStack from './VideoStack';
import PostStack from './PostStack';
import AudioStack from './AudioStack';

const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <>
      <Tab.Navigator
        initialRouteName={Navigations.HOME}
        screenOptions={{
          tabBarActiveTintColor: 'green',
        }}>
        <Tab.Screen
          name={Navigations.HOME}
          component={HomeScreen}
          options={{
            title: 'Accueil',
            tabBarLabel: 'Accueil',
            tabBarIcon: ({color, size}) => (
              <SimpleLineIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={Navigations.POST_STACK}
          component={PostStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Articles',
            tabBarIcon: ({color, size}) => (
              <SimpleLineIcons name="layers" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={Navigations.VIDEO_STACK}
          component={VideoStack}
          options={{
            title: 'Videos',
            tabBarLabel: 'Videos',
            tabBarIcon: ({color, size}) => (
              <SimpleLineIcons name="film" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={Navigations.AUDIO_STACK}
          component={AudioStack}
          options={{
            title: 'Audios',
            tabBarLabel: 'Audios',
            tabBarIcon: ({color, size}) => (
              <SimpleLineIcons name="music-tone" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={Navigations.PROFILE_STACK}
          component={ProfileStack}
          options={{
            headerShown: false,
            title: 'Profile',
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <SimpleLineIcons name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
