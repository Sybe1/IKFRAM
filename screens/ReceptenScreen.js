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
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        fetchRecepten(setRecepten);
    }, []);

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
        return (
            <View>
                {labels.map(label => (
                    <View key={label} style={styles.checkbox}>
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
                ))}
            </View>
        );
    };

    const renderCategoryItem = ({ item }) => {
        return (
            <CategoryGridTile
                choosenRecipe={item}
            />
        );
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={filterRecepten()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCategoryItem}
                numColumns={1}
            />

            {dropdownOpen && (
                <View style={styles.dropdown}>

                    <View style={styles.dropdownContent}>
                        <View style={styles.sortButtons}>
                            <TouchableOpacity onPress={sorteerOpRatingAsc} style={styles.button}>
                                <Text style={[styles.buttonText, sortBy === 'asc' && styles.selected]}>Rating ↑</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={sorteerOpRatingDesc} style={styles.button}>
                                <Text style={[styles.buttonText, sortBy === 'desc' && styles.selected]}>Rating ↓</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            {renderCheckboxes()}
                        </View>
                    </View>
                </View>
            )}

            {/* Dropdown toggle button */}
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownToggle}>
                <Text style={styles.dropdownToggleText}>{dropdownOpen ? 'Close Menu' : 'Open Menu'}</Text>
            </TouchableOpacity>
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
        justifyContent: 'center',
    },
    button: {
        margin: 5,
        marginTop: 10,
    },
    selected: {
        backgroundColor: 'black',
        color: 'white',
    },
    checkbox: {
        width: '100%',
    },
    dropdown: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingTop: 60,
    },
    dropdownContent: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '60%',
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 10,
        padding: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    dropdownToggle: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
    },
    dropdownToggleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
