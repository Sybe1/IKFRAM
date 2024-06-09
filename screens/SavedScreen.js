import {FlatList, StyleSheet, Text, View} from "react-native";
import {useCallback, useEffect, useState} from "react";
import {fetchRecipesByUserId} from "../service/UserReceptService";
import CategoryGridTile from "../components/CategoryGridTile";
import {useFocusEffect} from "@react-navigation/native";

function SavedScreen() {
    const [recepten, setRecepten] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                await fetchRecipesByUserId((fetchedRecepten) => {
                    const savedRecepten = fetchedRecepten.filter(recipe => recipe.saved === true);
                    setRecepten(savedRecepten);
                    console.log("Saved Recepten: ", savedRecepten);
                });
            };
            fetchData();
        }, [])
    );
    function renderCategoryItem(itemData){
        return(
            <CategoryGridTile
                title={itemData.item.recipeId.name}
                id={itemData.item.recipeId.id}
                description={itemData.item.recipeId.description}
                image={itemData.item.recipeId.imageUrl}
            />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={recepten}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCategoryItem}
                numColumns={1}
            />
        </View>

    )
}

export default SavedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
});