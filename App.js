import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MenuScreen from "./screens/MenuScreen";
import ReceptInformatieScreen from "./screens/ReceptInformatieScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userNumber, setUserNumber] = useState();

  return (
      <>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="ReceptenStack" component={MenuScreen} />
              <Stack.Screen name="ReceptInformatie" component={ReceptInformatieScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
