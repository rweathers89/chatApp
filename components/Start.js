import { useState } from 'react';
import {
    StyleSheet, View, Text, Button,
    TextInput, ImageBackground, TouchableOpacity, Alert
} from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
    const auth = getAuth();
    const [name, setName] = useState('');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
    const [background, setBackground] = useState(colors[3]);

    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate("Chat", { userID: result.user.uid, name: name, background: background });
                Alert.alert("Signed in Successfully!");
            })
            .catch((error) => {
                Alert.alert("Unable to sign in, try later again.");
            })
    }

    return (
        <View style={styles.container}>
            {/* Image background */}
            <ImageBackground
                source={require('../img/bgImage.png')}
                style={styles.imageBackground}>

                <Text style={styles.title}>Chat App!</Text>

                <View style={styles.box}>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder='Type your username here'
                    />

                    <Text style={styles.chooseBgColor}>Choose a background color:</Text>
                    <View style={styles.colorButtonContainer}>
                        {colors.map((color, index) => (
                            // Render a TouchableOpacity for each color option
                            <TouchableOpacity
                                key={index}
                                accessible={true}
                                accessibilityRole='button'
                                accessibilityHint='Allows you to choose background color for your chat screen'
                                style={[styles.colorButton,
                                { backgroundColor: color },
                                background === color && styles.selectedColor,
                                ]}
                                onPress={() => setBackground(color)}
                            />
                        ))}
                    </View>

                    {/**to start chat */}
                    <TouchableOpacity
                        accessible={true}
                        accessibilityRole='button'
                        accessibilityHint='Allows you to enter the chat room'

                        onPress={signInUser}
                        // => navigation.navigate('Chat', { name: name })}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: "88%",
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 50,
    },

    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',

    },
    title: {
        flex: 1,
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        margin: 25,
    },
    box: {
        backgroundColor: '#f2f2f2',
        borderRadius: 4,
        width: '88%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    chooseBgColor: {
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
        opacity: 100,
    },
    colorButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5

    },
    button: {
        alignItems: 'center',
        backgroundColor: "#757083",
        padding: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: "#FFFFFF"
    }


});

export default Start;