import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CategoryGridTile from "../components/CategoryGridTile";
import {useEffect, useState} from "react";
import {fetchRecepten} from "../service/ReceptService"

function ReceptenScreen({ navigation }) {
    const [recepten, setRecepten] = useState([]);
    const [sortBy, setSortBy] = useState(null);

    useEffect(() => {
        fetchRecepten(setRecepten);
    }, []);

    const sorteerOpRatingDesc = () => {
        setSortBy('desc');
        const sortedRecepten = [...recepten].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
        setRecepten(sortedRecepten);
    };

    const sorteerOpRatingAsc = () => {
        setSortBy('asc');
        const sortedRecepten = [...recepten].sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
        setRecepten(sortedRecepten);
    };
    function renderCategoryItem(itemData){
        return(
            <CategoryGridTile
                choosenRecipe={itemData.item}
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
    buttonText: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        padding: 6,
        borderRadius: 6
    },
    sortButtons: {
        flexDirection: 'row',
    },
    button: {
        margin: 5,
        marginTop: 10,
    },
    selected: {
        backgroundColor: 'black',
        color: 'white',
    }
});
