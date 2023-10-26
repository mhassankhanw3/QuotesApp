import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconOut from 'react-native-vector-icons/Octicons';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function UserProfile({isFlex, logout, title, email, isSwitch}) {
  const navigation = useNavigation();
  const backgroundColorClass = logout
    ? 'bg-red-200 shadow-2xl shadow-gray-500'
    : 'white shadow-lg shadow-gray-300';

  return (
    <View
      onPress={logout}
      className={`bg-white space-x-4 border mb-2 border-gray-200 w-full rounded-2xl flex py-3 px-4 flex-row ${
        isFlex ? 'items-start' : 'items-center'
      } ${
        isSwitch ? 'justify-between' : 'justify-start'
      } ${backgroundColorClass}`}>
      <View
        className={`${
          logout ? 'bg-rose-100' : 'bg-gray-200'
        } rounded-full flex items-center justify-center h-12 w-12 shadow-2xl shadow-gray-300`}>
        {logout ? (
          <IconOut name="sign-out" size={24} color="#ef4444" />
        ) : (
          <Icon name="user-alt" size={24} color="#9ca3af" />
        )}
      </View>
      <View>
        <Text
          className={`text-xl font-semibold ${
            logout ? 'text-red-500 ' : 'text-gray-700'
          } `}>
          {title}
        </Text>
        <Text>{email ? email : ''}</Text>
      </View>
    </View>
  );
}
