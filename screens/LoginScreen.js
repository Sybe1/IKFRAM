import React, { useState } from 'react';
import { authenticateUser } from "../service/LoginService";
import {
    StatusBar,
    TextInput,
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        authenticateUser(username, password, navigation);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.titleText}>Reception</Text>
            <Image source={require('../assets/chef.png')} />
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
            <TouchableOpacity
                style={styles.buttonBack}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Inloggen</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
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
    titleText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    buttonBack: {
        marginTop: 10,
        padding: 15,
        backgroundColor: 'black',
        width: '100%',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});