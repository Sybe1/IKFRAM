import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useState} from "react";
import {fetchUserReceptenScore} from "../service/UserReceptService";
import Icon from 'react-native-vector-icons/Ionicons';

function CategoryGridTile({choosenRecipe}) {
    const navigation = useNavigation();
    const [rating, setRating] = useState(0);

    useFocusEffect(
        useCallback(() => {
            const getScore = async () => {
                try {
                    const score = await fetchUserReceptenScore(choosenRecipe.id);
                    setRating(score);
                } catch (error) {
                    console.error("Error fetching recipe score:", error);
                }
            };

            getScore();
        }, [choosenRecipe.id])
    );

    const calculateStars = (score) => {
        if (score <= 20) return 1;
        if (score <= 40) return 2;
        if (score <= 60) return 3;
        if (score <= 80) return 4;
        return 5;
    };

    const stars = calculateStars(rating);

    return(
        <View style={styles.gridItem}>
            <Pressable
                style={({pressed}) => [styles.button, pressed ? styles.buttonPressed : null]}
                onPress={() => navigation.navigate('ReceptInformatie', {
                    choosenRecipe: choosenRecipe
                })}
            >
                <View style={styles.imageContainer}>
                    <Image style={styles.tinyLogo} source={{uri: choosenRecipe.imageUrl}}/>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{choosenRecipe.name}</Text>
                    <View style={styles.starsContainer}>
                        {[...Array(5)].map((_, index) => (
                            <Icon
                                key={index}
                                name={index < stars ? "star" : "star-outline"}
                                color="#FFD700"
                                size={20}
                            />
                        ))}
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

export default CategoryGridTile;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 8,
    },
    button: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    buttonPressed: {
        opacity: 0.8,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tinyLogo: {
        width: 360,
        height: 180,
        borderRadius: 10
    },
    starsContainer: {
        flexDirection: 'row',
        marginTop: 8,
    },
});
