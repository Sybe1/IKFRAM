import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ReceptenScreen from "./screens/ReceptenScreen";
import ReceptInformatieScreen from "./screens/ReceptInformatieScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userNumber, setUserNumber] = useState();

  return (
      <>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Recepten" component={ReceptenScreen} />
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
