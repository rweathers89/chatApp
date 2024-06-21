import { useState, useEffect } from 'react';
import {
    StyleSheet, View, KeyboardAvoidingView,
    Platform
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

//import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
    const { name, background, userID } = route.params;
    const [messages, setMessages] = useState([]);

    const onSend = async (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        let newItem = {
            ...newMessages[0],
            createdTime: new Date()
        }
        await addDoc(collection(db, collectionName), newItem);
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

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    let unsubMessages;
    useEffect(() => {
        navigation.setOptions({ title: name });

        if (isConnected === true) {

            // unregister current onSnapshot() listener to avoid registering multiple listeners when
            // useEffect code is re-executed.
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            // Create a query to get the "messages" collection from the Firestore database
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();

        // Clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    };

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }


    return (
        <View style={[styles.container,
        { backgroundColor: background }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
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

{/**
 * 
 *     setMessages([
            /* {
                 _id: 1,
                 text: "Hello developer",
                 createdAt: new Date(),
                 user: {
                     _id: 2,
                     name: "React Native",
                     avatar: "https://placeimg.com/140/140/any",
                 },
             }, 
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
 */}