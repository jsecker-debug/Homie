import { Platform } from 'react-native';
import firebase from '@react-native-firebase/app';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDmJczohuSIuG8PAlHwSiEFnYsfBlVIOIo',
    authDomain: 'homie-a3213.firebaseapp.com',
    projectId: 'homie-a3213',
    storageBucket: 'homie-a3213.firebasestorage.app',
    messagingSenderId: '805104925329',
    appId: '1:805104925329:web:9bacc976ac799a4e441d30',
    measurementId: 'G-MQ767XKD2K',
};

// Initialize Firebase for each platform
export const initializeFirebase = () => {
  if (Platform.OS === 'web') {
    // Web initialization
    return initializeApp(firebaseConfig);
  } else {
    // iOS and Android initialization
    if (!firebase.apps.length) {
      return firebase.initializeApp(firebaseConfig);
    }
    return firebase.app();
  }
};