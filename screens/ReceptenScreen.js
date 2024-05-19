import {FlatList, StyleSheet, Text, View} from 'react-native';
import CategoryGridTile from "../components/CategoryGridTile";
import {useEffect, useState} from "react";
import {fetchRecepten} from "../service/ReceptService"

function ReceptenScreen({ navigation }) {
    const [recepten, setRecepten] = useState([]);

    useEffect(() => {
        fetchRecepten(setRecepten);
        console.log("Recepten: ", recepten);
    }, []);
    function renderCategoryItem(itemData){


        return(
            <CategoryGridTile
                title={itemData.item.name}
                id={itemData.item.id}
                description={itemData.item.description}
                image={itemData.item.imageUrl}
            />
        );
    }

    return (
        <FlatList
            data={recepten}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={1}
        />
    )
}

export default ReceptenScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
