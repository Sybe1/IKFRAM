import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {fetchUserReceptenScore} from "../service/UserReceptService";
import Icon from 'react-native-vector-icons/Ionicons';

function CategoryGridTile({title, image, id, description}) {
    const navigation = useNavigation();
    const [rating, setRating] = useState(0); // Initialiseer met 0

    useEffect(() => {
        const getScore = async () => {
            try {
                const score = await fetchUserReceptenScore(id);
                setRating(score);
            } catch (error) {
                console.error("Error fetching recipe score:", error);
            }
        };

        getScore();
    }, [id]);

    // Bereken het aantal sterren gebaseerd op de score
    const calculateStars = (score) => {
        if (score < 20) return 0;
        if (score < 35) return 1;
        if (score < 50) return 2;
        if (score < 70) return 3;
        if (score < 90) return 4;
        return 5;
    };

    // Het aantal sterren om in te kleuren
    const stars = calculateStars(rating);

    return(
        <View style={styles.gridItem}>
            <Pressable
                style={({pressed}) => [styles.button, pressed ? styles.buttonPressed : null]}
                onPress={() => navigation.navigate('ReceptInformatie', {
                    id: id,
                    title: title,
                    description: description,
                    image: image
                })}
            >
                <View style={styles.imageContainer}>
                    <Image style={styles.tinyLogo} source={{uri: image}}/>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.starsContainer}>
                        {[...Array(5)].map((_, index) => (
                            <Icon
                                key={index}
                                name={index < stars ? "star" : "star-outline"}
                                color="#FFD700" // Goudkleur voor ingekleurde sterren
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
