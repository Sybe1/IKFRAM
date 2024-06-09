import {FlatList, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {fetchRecipesByUserId} from "../service/UserReceptService";
import CategoryGridTile from "../components/CategoryGridTile";

function SavedScreen() {
    const [recepten, setRecepten] = useState([]);

    useEffect(() => {
        fetchRecipesByUserId(setRecepten);
        console.log("Recepten: ", recepten);
    }, []);
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
            <Text>Bam</Text>
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