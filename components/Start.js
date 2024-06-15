import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
    const [background, setBackground] = useState('');

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
                            >

                            </TouchableOpacity>
                        ))}
                    </View>


                    <Button
                        title="Start Chatting"
                        onPress={() => navigation.navigate('Chat', { name: name })}
                    />

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

    }


});

export default Start;