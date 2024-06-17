import { StyleSheet, Text, View } from 'react-native';
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import Firebase from firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);


// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDqLCysl-vuyWuE3jnDZD_S-VVzP7AsHQQ",
    authDomain: "chatapp-8ba3c.firebaseapp.com",
    projectId: "chatapp-8ba3c",
    storageBucket: "chatapp-8ba3c.appspot.com",
    messagingSenderId: "210932772186",
    appId: "1:210932772186:web:50ed1b3958affdad095763",
    measurementId: "G-JRYFW83S3Z"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (

    <NavigationContainer>
      {/* Create a stack navigator with initial route Start  */}
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
        {props => <Chat db={db} {...props} />}
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
