import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import WelcomeScreen from '../screens/WelcomeScreen';
import {useMainContext} from '../context/Main';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SearchScreen from '../screens/SearchScreen';
import SelectQuoteScreen from '../screens/SelectQuoteScreen';
import UserScreen from '../screens/UserScreen';
import AddQuoteScreen from '../screens/AddQuoteScreen';
import {View, Text, Platform} from 'react-native';
import TabIcon from '../components/Icon/TabIcon';
import UserProfileScreen from '../screens/UserProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const homeName = 'Home';
const searchName = 'Search';
const addQuoteName = 'AddQuote';
const selectQuoteName = 'SelectQuote';
const userName = 'User';
const userProfileName = 'UserProfile';

function TabScreens() {
  const {user, isEnabled} = useMainContext();
  return (
    <Tab.Navigator
      // tabBarOptions={{keyboardHidesTabBar: true}}
      initialRouteName={homeName}
      screenOptions={{
        tabBarHideOnKeyboard: Platform.OS !== 'ios',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: isEnabled ? '#18181b' : 'white', // Set the background color
          // paddingBottom: 4,
          paddingTop: 10,
          paddingLeft: 14,
          paddingRight: 14,
          height: 62,
          borderTopWidth: isEnabled ? 0.8 : 0.5,
          borderBottomWidth: isEnabled ? 0.8 : 0.5,
          borderLeftWidth: isEnabled ? 0.8 : 0.5,
          borderRightWidth: isEnabled ? 0.8 : 0.5,
          borderColor: isEnabled ? '#52525b' : '#9ca3af',
          width: '95%',
          maxWidth: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          // marginBottom: 8,
          borderRadius: 50,
          // shadowColor: 'black',
          // shadowOffset: {width: 0, height: 2},
          // shadowOpacity: 0.2,
          // shadowRadius: 10,
          // elevation: 4,
          position: 'absolute',
          bottom: 10,
          left: '2.3%',
          right: '2%',
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabIcon isFeather={true} name="message-square" focused={focused} />
          ),
        }}
        name={homeName}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          tabBarLabel: '',
          tabBarIcon: ({focused, isSearch}) => (
            <TabIcon isSearch={true} name="search" focused={focused} />
          ),
        }}
        name={searchName}
        component={SearchScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          tabBarLabel: '',
          tabBarIcon: ({focused, isSearch}) => (
            <TabIcon
              isSearch={true}
              name="add-circle-outline"
              focused={focused}
            />
          ),
        }}
        name={addQuoteName}
        component={AddQuoteScreen}
      />
      <Tab.Screen
        options={({route}) => ({
          headerShown: false,
          animation: 'slide_from_right',
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabIcon name="heart-outlined" focused={focused} />
          ),
        })}
        name={selectQuoteName}
        component={SelectQuoteScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          tabBarLabel: '',
          // tabBarIcon: () => (
          //   <Feather name={'user'} size={24} color="#6b7280" />
          // ),
          tabBarIcon: ({focused}) => (
            <TabIcon isFeather={true} name="user" focused={focused} />
          ),
        }}
        name={userName}
        component={UserScreen}
      />
    </Tab.Navigator>
  );
}

export default function appNavigation() {
  const {user, isEnabled} = useMainContext();
  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TabScreens"
          screenOptions={{
            contentStyle: {
              backgroundColor: '#FFFFFF',
            },
          }}>
          <Stack.Screen
            name="TabScreens"
            component={TabScreens}
            options={{headerShown: false}}
          />
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_bottom'}}
            name="UserProfile"
            component={UserProfileScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            contentStyle: {
              backgroundColor: '#FFFFFF',
            },
          }}>
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_right'}}
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_bottom'}}
            name="Signup"
            component={SignUp}
          />
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_bottom'}}
            name="Signin"
            component={SignIn}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
