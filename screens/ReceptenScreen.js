import {FlatList, StyleSheet, Text, View} from 'react-native';
import {CATEGORIES} from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

function ReceptenScreen({ navigation }) {
    function renderCategoryItem(itemData){
        function pressHandler() {
            navigation.navigate('ReceptInformatie');
        }

        return(
            <CategoryGridTile
                title={itemData.item.title}
                background={itemData.item.image}
                onPress={() => pressHandler()}
            />
        );
    }

    return (
        <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={3}
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
