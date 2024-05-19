import React, { useState } from 'react';
import { StatusBar, TextInput, Button, View, Alert, Image, StyleSheet, AppRegistry } from 'react-native';
import baseURL from '../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authenticateUser = (username, password, navigation) => {
    if (username && password) {
        fetch(`${baseURL}/auth/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Fout bij het inloggen!');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Ingelogd!');
                AsyncStorage.setItem('userToken', data.token);
                AsyncStorage.setItem('userID', data.id);
                navigation.navigate('Recepten');
            })
            .catch((error) => {
                console.error('Fout bij het inloggen:', error);
                Alert.alert('Fout', 'Fout bij het inloggen. Controleer uw gebruikersnaam en wachtwoord.');
            });
    } else {
        Alert.alert('Ongeldige invoer', 'Voer zowel gebruikersnaam als wachtwoord in.');
    }
};


export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        authenticateUser(username, password, navigation);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <TextInput
                style={styles.input}
                placeholder="Gebruikersnaam"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Wachtwoord"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Inloggen" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});