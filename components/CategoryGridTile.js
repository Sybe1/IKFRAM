import {Image, ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";

function CategoryGridTile({title, background, onPress}) {
    return(
        <View style={styles.gridItem}>
            <Pressable
                style={({pressed}) => [styles.button, pressed ? styles.buttonPressed : null]}
                onPress={onPress}
            >
                <View style={styles.imageContainer}>
                    <Image style={styles.tinyLogo} source={{uri: background}}/>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    )
}
export default CategoryGridTile;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    button: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    buttonPressed: {
        opacity: 0.8,
    },
    imageContainer: {

    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});