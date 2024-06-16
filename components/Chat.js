import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
    const { name, background } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#000"
                    },
                    left: {
                        backgroundColor: "#FFF"
                    },
                }}
            />
        );
    }

    useEffect(() => {
        setMessages([
            /* {
                 _id: 1,
                 text: "Hello developer",
                 createdAt: new Date(),
                 user: {
                     _id: 2,
                     name: "React Native",
                     avatar: "https://placeimg.com/140/140/any",
                 },
             }, */
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
            {
                _id: 3,
                text: `Hello ${name}`,
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: `${name}`,
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
        ]);
    }, []);

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container,
        { backgroundColor: background }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                    name
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    )

    {/*return (
        <View style={[styles.container,
        { backgroundColor: background }]}>
            <Text>Welcome to the Chat!</Text>
        </View>
    );
    */}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});

export default Chat;