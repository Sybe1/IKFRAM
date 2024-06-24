import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Image, Modal, Text, TouchableOpacity } from 'react-native';
import {addRecept} from "../service/ReceptService";

const ToevoegenReceptScreen = () => {
    const [name, setName] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showModal, setShowModal] = useState(false);

    const cuisines = ['Indiaas', 'Italiaans', 'Mexicaans'];

    const handleSaveRecipe = () => {
        console.log(name)
        const recept = {
            name: name,
            cuisine: cuisine,
            description: description,
            imageUrl: imageUrl
        }
        console.log(recept)
       addRecept(recept).then(r =>
           console.log(r)
       );
    };

    const selectCuisine = (cuisine) => {
        setCuisine(cuisine);
        setShowModal(false);
    };

    const isFormValid = () => {
        return name.trim() !== '' && cuisine.trim() !== '' && description.trim() !== '' && imageUrl.trim() !== '';
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Naam"
                value={name}
                onChangeText={setName}
            />
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowModal(true)}>
                <Text>{cuisine ? cuisine : "Selecteer een keuken"}</Text>
            </TouchableOpacity>
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {cuisines.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.modalItem}
                                onPress={() => selectCuisine(item)}
                            >
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
            <TextInput
                style={styles.input}
                placeholder="Beschrijving"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            />
            <TextInput
                style={styles.input}
                placeholder="Afbeelding URL"
                value={imageUrl}
                onChangeText={setImageUrl}
            />
            <Button title="Opslaan" onPress={handleSaveRecipe} disabled={!isFormValid()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    dropdownButton: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: 10,
        padding: 20,
        maxHeight: 300,
    },
    modalItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
    },
});

export default ToevoegenReceptScreen;
