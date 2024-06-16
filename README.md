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