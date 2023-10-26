import React, {useState, createContext, useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import {getItem, setItem} from '../utils/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyContext = createContext();
export const useMainContext = () => useContext(MyContext);

export default MainContextProvider = props => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timestampField, setTimestampField] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    // Save the theme preference
    AsyncStorage.setItem('themePreference', JSON.stringify(!isEnabled))
      .then(() => {
        console.log('Theme preference saved');
      })
      .catch(error => {
        console.error('Error saving theme preference:', error);
      });
  };

  //                 Error handlers

  const ERROR_EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use';
  const ERROR_INVALID_EMAIL = 'auth/invalid-email';
  const ERROR_INVALID_LOGIN = 'auth/invalid-login';

  const handleAuthError = error => {
    let errorMessage = 'Something went wrong!';

    switch (error.code) {
      case ERROR_EMAIL_ALREADY_IN_USE:
        errorMessage = 'That email address is already in use!';
        break;
      case ERROR_INVALID_EMAIL:
        errorMessage = 'That email address is invalid!';
        break;
      case ERROR_INVALID_LOGIN:
        errorMessage = 'Invalid Login!';
        break;
      default:
        break;
    }

    Snackbar.show({
      text: errorMessage,
      textColor: '#b91c1c',
      backgroundColor: '#fecaca',
      action: {
        text: 'ok',
        textColor: '#b91c1c',
      },
    });
  };

  //                              USER SIGNUP

  const newUser = async (
    email,
    password,
    displayName,
    photoURL,
    navigation,
  ) => {
    setLoading(true);
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        console.log('User account created & signed in!');
        console.log(res, 'res User account created & signed in!');
        setLoading(false);
        navigation.navigate('Signup');
        await auth().currentUser.updateProfile({
          displayName: displayName,
          photoURL: photoURL,
        });
        setUser(auth().currentUser);
      })
      .catch(error => {
        setLoading(false);
        handleAuthError(error);
        navigation.navigate('Signup');
        console.error(error);
      });
  };

  //                              USER SIGNIN

  const signIn = async (email, password, navigation) => {
    setLoading(true);

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res, 'User account created & signed in!');
        // navigation?.navigate('Home');
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        handleAuthError(error);
        navigation.navigate('Signin');
        console.error(error);
      });
  };

  //                              USER LOGOUT

  const Logout = async (email, password, navigation) => {
    await auth()
      .signOut(email, password)
      .then(res => {
        console.log('User signed out!');
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
  };

  //                            RESET PASSWORD

  const resetPassword = async email => {
    // setLoading(true);
    await auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent successfully
        console.log('Password reset email sent successfully:', email);
        Snackbar.show({
          text: 'Password reset email sent. Check your inbox.',
          textColor: 'green',
          backgroundColor: 'white',
          numberOfLines: 2,
          action: {
            text: 'OK',
            textColor: 'green',
          },
        });
        // setLoading(false);
      })
      .catch(error => {
        // setLoading(false);
        // Error sending the password reset email
        console.error('Error sending password reset email:', error);
        Snackbar.show({
          text: 'Error sending password reset email.',
          textColor: '#b91c1c',
          backgroundColor: '#fecaca',
          numberOfLines: 2,
          action: {
            text: 'OK',
            textColor: '#b91c1c',
          },
        });
      });
  };

  //                             FIREBASE CONFIG

  const config = {
    apiKey: 'AIzaSyDlIUWSbAmKDrPQtx7yaVrZdgan0BdKHLs',
    authDomain: 'quotesapp-7b95e.firebaseapp.com',
    projectId: 'quotesapp-7b95e',
    storageBucket: 'quotesapp-7b95e.appspot.com',
    messagingSenderId: '49148949866',
    appId: '1:49148949866:web:158cd8bdbbc119f97ae113',
  };
  //                             Initialize the app

  useEffect(() => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
      const storage = firebase.storage();
    }
    AsyncStorage.getItem('themePreference')
      .then(themePreference => {
        if (themePreference !== null) {
          setIsEnabled(JSON.parse(themePreference));
        }
      })
      .catch(error => {
        console.error('Error loading theme preference:', error);
      });
  }, []);

  //                             Add User Quotes To Fire Store

  const addUserQuotesToFireStore = async (quote, author, user) => {
    setLoading(true);
    try {
      await firestore().collection('Quotes').add({
        quote,
        author,
        user: user.uid,
        userName: user?.displayName,
        userImg: user?.photoURL,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error, 'error database response');
      throw error;
    }
  };

  //                             get All Users From Firestore

  const getAllUsersFromFirestore = async () => {
    try {
      const querySnapshot = await firestore().collection('Quotes').get();
      const quotes = [];
      querySnapshot.forEach(documentSnapshot => {
        const quoteData = documentSnapshot.data();
        const quoteId = documentSnapshot.id;
        quotes.push({id: quoteId, ...quoteData});
      });

      // console.log('All quotes retrieved:', quotes);
      return quotes;
    } catch (error) {
      console.error('Error fetching quotes:', error);
      throw error;
    }
  };

  const getQuoteCountForUser = (userId, quotes) => {
    return quotes.filter(quote => quote.user === userId).length;
  };

  const getUserQuotesFromFirestore = async user => {
    try {
      const querySnapshot = await firestore()
        .collection('Quotes')
        .where('user', '==', user.uid)
        .get();

      const quotes = [];
      querySnapshot.forEach(documentSnapshot => {
        const quoteData = documentSnapshot.data();
        const quoteId = documentSnapshot.id;
        quotes.push({id: quoteId, ...quoteData});
      });

      // console.log('User quotes retrieved:', quotes);
      return quotes;
    } catch (error) {
      console.error('Error fetching user quotes:', error);
      throw error;
    }
  };

  //                               deleteQuoteFromFirestore

  const deleteQuoteFromFirestore = async quoteId => {
    try {
      await firestore().collection('Quotes').doc(quoteId).delete();
      console.log(`Quote with ID ${quoteId} deleted from Firestore.`);
    } catch (error) {
      console.error('Error deleting quote from Firestore:', error);
      throw error;
    }
  };

  // const deleteQuoteFromFirestore = async quoteId => {
  //   const quoteRef = firestore.collection('Quotes').doc(quoteId);

  //   try {
  //     await quoteRef.delete();
  //     console.log('Quote deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting quote:', error);
  //   }
  // };

  // //                             ADD USER ADD TRIPS COLLECTION

  // const addUserTripsExpenseToFirestore = async (
  //   title,
  //   amount,
  //   category,
  //   user,
  // ) => {
  //   setLoading(true);
  //   try {
  //     const docRef = await firestore()
  //       .collection('Users')
  //       .doc(user.uid)
  //       .collection('TripsExpenseRef')
  //       .add({
  //         title,
  //         amount,
  //         category,
  //         user: user.uid,
  //       });
  //     const docId = docRef.id;
  //     // console.log(`Document ID: ${docId}`);
  //     setLoading(false);
  //     return docId; // Return the document ID
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error, 'error database response');
  //     throw error;
  //   }
  // };

  // //                             GET TRIPS DATA FROM DATABASE

  // const getTripsExpenseFromFirestore = async user => {
  //   try {
  //     const querySnapshot = await firestore()
  //       .collection('Users')
  //       .doc(user.uid)
  //       .collection('TripsExpenseRef')
  //       .get();

  //     const expenses = [];
  //     querySnapshot.forEach(documentSnapshot => {
  //       const expenseData = documentSnapshot.data();
  //       const expenseId = documentSnapshot.id; // Get the document ID
  //       expenses.push({id: expenseId, ...expenseData}); // Include the document ID in the object
  //     });

  //     // console.log('Expenses retrieved:', expenses);
  //     return expenses;
  //   } catch (error) {
  //     console.error('Error fetching expenses:', error);
  //     throw error;
  //   }
  // };

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    console.log(user, 'user');
  }, [user]);

  const {children} = props;

  return (
    <MyContext.Provider
      value={{
        success: success,
        setSuccess: setSuccess,
        loading: loading,
        setLoading: setLoading,
        user: user,
        setUser: setUser,
        isEnabled: isEnabled,
        toggleSwitch: toggleSwitch,
        func: {
          newUser,
          signIn,
          Logout,
          resetPassword,
          addUserQuotesToFireStore,
          getAllUsersFromFirestore,
          getUserQuotesFromFirestore,
          getQuoteCountForUser,
          deleteQuoteFromFirestore,
          // addUserTripsExpenseToFirestore,
          // getTripsExpenseFromFirestore,
        },
      }}>
      {children}
    </MyContext.Provider>
  );
};
