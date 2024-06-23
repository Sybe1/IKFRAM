import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import CategoryGridTile from "../components/CategoryGridTile";
import { fetchRecepten } from "../service/ReceptService";

function ReceptenScreen({ navigation }) {
    const [recepten, setRecepten] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [checkedCategories, setCheckedCategories] = useState({
        Italiaans: true,
        Indiaas: true,
        Mexicaans: true,
    });

    useEffect(() => {
        fetchRecepten(setRecepten);
    }, []);

    // Filterfunctie gebaseerd op de geselecteerde checkboxes
    const filterRecepten = useCallback(() => {
        return recepten.filter(recept => {
            if (checkedCategories.Italiaans && recept.cuisine === 'Italiaans') {
                return true;
            }
            if (checkedCategories.Indiaas && recept.cuisine === 'Indiaas') {
                return true;
            }
            if (checkedCategories.Mexicaans && recept.cuisine === 'Mexicaans') {
                return true;
            }
            return false;
        });
    }, [checkedCategories, recepten]);

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

    const renderCheckboxes = () => {
        const labels = ['Italiaans', 'Indiaas', 'Mexicaans'];
        return labels.map(label => (
            <View key={label} style={styles.checkboxContainer}>
                <CheckBox
                    title={label}
                    checked={checkedCategories[label]}
                    onPress={() => {
                        setCheckedCategories(prevState => ({
                            ...prevState,
                            [label]: !prevState[label]
                        }));
                    }}
                />
            </View>
        ));
    };

    const renderCategoryItem = ({ item }) => {
        return (
            <CategoryGridTile
                choosenRecipe={item}
            />
        );
    };

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

            <View style={styles.checkboxes}>
                {renderCheckboxes()}
            </View>

            <FlatList
                data={filterRecepten()}
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
    },
    checkboxes: {
        flexDirection: 'row',
        marginTop: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
});
