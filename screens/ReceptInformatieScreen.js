import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { fetchRecipesByUserId, updateMood } from "../service/UserReceptService";

function ReceptInformatieScreen() {
    const route = useRoute();
    const { id, title, description, image } = route.params;
    const [recept, setRecept] = useState(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        fetchRecipesByUserId((fetchedRecepten) => {
            const matchedRecipe = fetchedRecepten.find(recipe => recipe.recipeId.id === id);
            setRecept(matchedRecipe);
            if (matchedRecipe?.saved) {
                setLiked(true);
            }
            if (matchedRecipe?.rating) {
                setRecept(matchedRecipe);
            }
        });
    }, [id]);

    const toggleLiked = () => {
        if (!recept) return;
        setLiked(prevLiked => !prevLiked);
        recept.saved = !recept.saved;
        updateMood(recept).then(r => console.log(r));
    };

    const changeRating = (newRating) => {
        if (!recept) return;
        let updatedRating = newRating;
        if (recept.rating === newRating) {
            updatedRating = newRating - 1; // Verlaag de rating als deze al was geselecteerd
        }
        const updatedRecept = { ...recept, rating: updatedRating };
        setRecept(updatedRecept);
        updateMood(updatedRecept).then(r => console.log(r));
    };


    const renderRatingButton = (ratingValue) => {
        const isSelected = recept?.rating >= ratingValue;
        return (
            <TouchableOpacity
                key={ratingValue}
                style={[styles.spaceRatingButtons, isSelected ? styles.selectedButton : styles.ratingButton]}
                onPress={() => changeRating(ratingValue)}
            >
                <Icon
                    name={isSelected ? "star" : "star-outline"}
                    color={"black"}
                    size={25}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Image style={styles.tinyLogo} source={{ uri: image }} />
            <TouchableOpacity style={styles.iconButton} onPress={toggleLiked}>
                <Icon name={liked ? "heart" : "heart-outline"} color="black" size={30} />
            </TouchableOpacity>
            <View style={styles.ratingButtonsCluster}>
                {[1, 2, 3, 4, 5].map(renderRatingButton)}
            </View>
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
    ratingButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    ratingButtonsCluster: {
        flexDirection: "row",
    },
    selectedButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    spaceRatingButtons: {
        margin: 2,
    }
});
