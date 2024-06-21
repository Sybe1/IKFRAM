import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';
import {addMood, fetchRecipesByUserId, updateMood} from "../service/UserReceptService";

function ReceptInformatieScreen() {
    const route = useRoute();
    const {choosenRecipe } = route.params;
    const [recept, setRecept] = useState(null);
    const [liked, setLiked] = useState(false);
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        fetchRecipesByUserId((fetchedRecepten) => {
            const matchedRecipe = fetchedRecepten.find(recipe => recipe.recipeId.id === choosenRecipe.id);
            setRecept(matchedRecipe);
            if (matchedRecipe?.saved) {
                setLiked(true);
            }
            if (matchedRecipe?.rating) {
                setRecept(matchedRecipe);
            }
        });
    }, [choosenRecipe.id]);

    const toggleLiked = () => {
        setLiked(prevLiked => !prevLiked);
        if (!recept){
            addMood(choosenRecipe.id, null, liked).then(r => console.log("toegevoegd"))
        }
        else{
            recept.saved = !recept.saved;
            updateMood(recept).then(r => console.log("toegevoegd"));
        }
    };

    const changeRating = (newRating) => {
        let updatedRecept
        if (!recept){
            updatedRecept = {
                rating: newRating,
                recipeId: choosenRecipe,
                saved: false,
            };
            addMood(choosenRecipe.id, newRating, false).then(r => console.log("toegevoegd"))
        }
        else{
            updatedRecept = { ...recept, rating: newRating };
            updateMood(updatedRecept).then(r => console.log("toegevoegd"));
        }
        setRecept(updatedRecept);
    };

    const renderRatingButton = (ratingValue) => {
        const isSelected = recept?.rating >= ratingValue;
        return (
            <TouchableOpacity
                key={ratingValue}
                style={[styles.ratingButton, isSelected ? styles.selectedButton : null]}
                onPress={() => changeRating(ratingValue)}
            >
                <Icon
                    name={isSelected ? "star" : "star-outline"}
                    color={isSelected ? "#FCD000" : "#C4C4C4"}
                    size={25}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.titlePosition}>
                <Text style={styles.title}>{choosenRecipe.name}</Text>
            </View>
            <Image style={[styles.image, { width: windowWidth }]} source={{ uri: choosenRecipe.image }} />
            <View style={styles.flexRow}>
                <TouchableOpacity style={styles.likeButton} onPress={toggleLiked}>
                    <Icon name={liked ? "heart" : "heart-outline"} color="#FF6978" size={30} />
                </TouchableOpacity>
                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map(renderRatingButton)}
                </View>
            </View>

            <Text style={styles.description}>{choosenRecipe.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 250,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    likeButton: {
        marginLeft: 10,
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: "row",
        marginLeft: 'auto',
        marginRight: 10,
        marginBottom: 20,
    },
    ratingButton: {
        marginHorizontal: 4,
    },
    selectedButton: {
        color: "#FCD000",
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: "center",
    },
    flexRow: {
        flexDirection: "row",
        alignItems: 'center',
    },
    titlePosition: {
        alignItems: 'center',
        padding: 16,
    }
});

export default ReceptInformatieScreen;
