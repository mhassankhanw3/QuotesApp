import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Followers({user, colors, isEnabled}) {
  return (
    <View
      className={` ${colors.userDetails} flex border-2 shadow-lg w-[48%] mx-auto flex-row items-center justify-center space-x-2 rounded-xl py-2 mb-2`}>
      <Icon
        name={'user-friends'}
        size={16}
        color={isEnabled ? '#a1a1aa' : '#9ca3af'}
      />
      <Text
        className={` text-[16px] ${
          isEnabled ? 'text-zinc-300' : 'text-gray-500'
        }`}>
        - 2 -
      </Text>
      <Text
        className={` text-[16px] ${
          isEnabled ? 'text-zinc-300' : 'text-gray-500'
        }`}>
        Followers
      </Text>
    </View>
  );
}
