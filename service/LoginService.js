import baseURL from "../config/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";

export const authenticateUser = (username, password, navigation) => {
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
                AsyncStorage.setItem('userToken', data.token);
                AsyncStorage.setItem('userID', data.id);
                navigation.navigate('ReceptenStack');
            })
            .catch((error) => {
                console.error('Fout bij het inloggen:', error);
                Alert.alert('Fout', 'Fout bij het inloggen. Controleer uw gebruikersnaam en wachtwoord.');
            });
    } else {
        Alert.alert('Ongeldige invoer', 'Voer zowel gebruikersnaam als wachtwoord in.');
    }
};