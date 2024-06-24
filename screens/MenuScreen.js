import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ReceptenScreen from './ReceptenScreen';
import SavedScreen from './SavedScreen';
import ToevoegenReceptScreen from './ToevoegenReceptScreen'

const Tab = createBottomTabNavigator();

export default function MenuScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Recepten"
                component={ReceptenScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="restaurant-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Toevoegen"
                component={ToevoegenReceptScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="add" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Liked"
                component={SavedScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="heart" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
