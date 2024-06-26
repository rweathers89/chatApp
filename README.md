## Project description

A mobile chat application built with React Native. The app will provide users with a chat interface and options to share images and their location.

## Project Features

- Send and receive messages in real-time

- Share location

- Take a photo and share

- Choose a photo from library and share

- Customize theme

### Getting Started

- **Technologies**

  - React Native
  - Expo and Expo Go App
  - Google Firestore Database

- **Libraries**
  - Gifted Chat library
  - Expo ImagePicker
  - Expo MediaLibrary
  - Expo Location

To run this app locally, you'll need to follow these steps:

- Clone this repository.
- Set up Expo in your development environment:

  - Install Expo and Expo CLI, as this is the platform you’ll use to build your app;

        npm install -g expo-cli

  - Install Expo Go app on your mobile device, so that you can test your app on your own mobile device;

    Search for the Expo Go app in the relevant app store for your device (iOS or Android)

  - Create an Expo account.

### Prerequisites

Before installing Expo, ensure you have a suitable version of Node installed. At the time of writing, Expo only supports Node 16.. at max.

Node.js: Download and install Node.js. For this you can use the nvm tool https://github.com/nvm-sh/nvm

    nvm install 16.19.0
    nvm use 16.19.0
    nvm alias default 16.19.0

Navigate to the chat-app directory and install all dependencies:

    npm install

    
  ### Dependencies:
- @react-navigation/native: ^6.1.17
- @react-navigation/native-stack: ^6.9.26
- expo: ~50.0.13
- expo-status-bar: ~1.11.1
- firebase: ^10.3.1
- react: "18.2.0
- react-native: 0.73.5
- react-native-gifted-chat: ^2.4.0
- react-native-safe-area-context: 4.8.2
- react-native-screens: ~3.29.0
- @react-native-async-storage/async-storage: 1.21.0
- @react-native-community/netinfo: 11.1.0
- expo-image-picker: ~14.7.1
- expo-location: ~16.5.5
- react-native-maps: 1.10.0

### Google Firestore/Firebase
- create an account and a new project
- obtain the configuration code, and add it to App.js:
- set up the database under build --> Firestore Database
- activate storage
- change rules to: `allow read, write: if true`

## Start the expo project
- `npx expo start`
- `npm start`