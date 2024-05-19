import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useRoute} from "@react-navigation/native";


function ReceptInformatieScreen() {
    const route = useRoute();
    const {id, title, description, image} = route.params;

    return (
        <View style={styles.container}>
            <Image style={styles.tinyLogo} source={{uri: image}}/>
            <Text>{description}</Text>
        </View>
    )
}

export default ReceptInformatieScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: "center"
    },
    tinyLogo: {
        marginBottom: 10,
        width: 200,
        height: 200,
    }
});
