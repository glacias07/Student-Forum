import React from 'react';
import {Component} from 'react';
import MainAppRoutes from '../routes/MainAppRoutes';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import {AuthProvider} from '../routes/AuthProvider';
import {MenuProvider} from 'react-native-popup-menu';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGgoQb95pxKLwaZMYJHNh_6Iv7Xi225ck",
  authDomain: "student-forum-57d6b.firebaseapp.com",
  databaseURL: "https://student-forum-57d6b-default-rtdb.firebaseio.com",
  projectId: "student-forum-57d6b",
  storageBucket: "student-forum-57d6b.appspot.com",
  messagingSenderId: "393671606142",
  appId: "1:393671606142:web:66fd9667b097ab67ce7d2f"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const App = () => {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <AuthProvider>
          <MenuProvider>
            <MainAppRoutes />
          </MenuProvider>
        </AuthProvider>
      </Provider>
    );
}

export default App;
