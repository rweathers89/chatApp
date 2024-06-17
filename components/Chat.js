import { useState, useEffect } from 'react';
import {
    StyleSheet, View, KeyboardAvoidingView,
    Platform
} from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
    const { name, background, userID } = route.params;
    const [messages, setMessages] = useState([]);


    //useEffect hook to set messages options
    useEffect(() => {
        navigation.setOptions({ title: name });

        // Create a query to get the "messages" collection from the Firestore database
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        // This function will be called whenever there are changes in the collection.
        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                })
            })
            setMessages(newMessages);
        })
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, []);

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
        //setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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

    return (
        <View style={[styles.container,
        { backgroundColor: background }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
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