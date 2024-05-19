import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CategoryGridTile from "../components/CategoryGridTile";
import {useEffect, useState} from "react";
import {fetchRecepten} from "../service/ReceptService"

function ReceptenScreen({ navigation }) {
    const [recepten, setRecepten] = useState([]);
    const [sortBy, setSortBy] = useState(null);

    useEffect(() => {
        fetchRecepten(setRecepten);
        console.log("Recepten: ", recepten);
    }, []);

    const sorteerOpRatingDesc = () => {
        setSortBy('desc');
        const sortedRecepten = [...recepten].sort((a, b) => b.score - a.score);
        setRecepten(sortedRecepten);
    };

    const sorteerOpRatingAsc = () => {
        setSortBy('asc');
        const sortedRecepten = [...recepten].sort((a, b) => a.score - b.score);
        setRecepten(sortedRecepten);
    };
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
        <View style={styles.container}>
            <View style={styles.sortButtons}>
                <TouchableOpacity onPress={sorteerOpRatingAsc} style={styles.button}>
                    <Text style={[styles.buttonText, sortBy === 'asc' && styles.selected]}>Rating ↑</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={sorteerOpRatingDesc} style={styles.button}>
                    <Text style={[styles.buttonText, sortBy === 'desc' && styles.selected]}>Rating ↓</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={recepten}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCategoryItem}
                numColumns={1}
            />
        </View>
    );
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
