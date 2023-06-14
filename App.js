import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RouteStack from './src/navigations/RouteStack';
import Navigations from './src/constants/Navigations';
import ApiProvider from './src/contexts/ApiProvider';
import UserProvider from './src/contexts/UserProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  const [firstLaunch, setFirstLaunch] = React.useState(null);

  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem('appLaunched');
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem('appLaunched', 'false');
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  return (
    <ApiProvider>
      <UserProvider>
        {firstLaunch != null && (
          <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                {firstLaunch && (
                  <Stack.Screen
                    name={Navigations.ONBOARDING}
                    component={OnboardingScreen}
                  />
                )}
                <Stack.Screen
                  name={Navigations.ROUTE_STACK}
                  component={RouteStack}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
        )}
      </UserProvider>
    </ApiProvider>
  );
}

const styles = StyleSheet.create({});
