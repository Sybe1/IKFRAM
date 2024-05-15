import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

function LoginScreen() {
    return (
        <View style={styles.appContainer}>
            <Text style={styles.textStyle}>Login Screen!</Text>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
    },
    appContainer: {
        paddingTop: 50,
        paddingHorizontal: 16,
    },
});
