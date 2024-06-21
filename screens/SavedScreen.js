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
                });
            };
            fetchData();
        }, [])
    );
    function renderCategoryItem(itemData){
        return(
            <CategoryGridTile
                choosenRecipe = {itemData.item}
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