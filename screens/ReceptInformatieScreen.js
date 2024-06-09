import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';
import {fetchRecipesByUserId} from "../service/UserReceptService";

function ReceptInformatieScreen() {
    const route = useRoute();
    const { id, title, description, image } = route.params;
    const [recepten, setRecepten] = useState([]);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        fetchRecipesByUserId(setRecepten);
        console.log("Recepten: ", recepten);
    }, []);

    const toggleLiked = () => {
        setLiked(prevLiked => !prevLiked);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.tinyLogo} source={{ uri: image }} />
             <TouchableOpacity style={styles.iconButton} onPress={toggleLiked}>
                <Icon name={liked ? "heart" : "heart-outline"}  color="#007bff" size={30} />
            </TouchableOpacity>
            <Text>{description}</Text>
        </View>
    );
}

export default ReceptInformatieScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center'
    },
    tinyLogo: {
        marginBottom: 10,
        width: 200,
        height: 200,
    },
    iconButton: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
