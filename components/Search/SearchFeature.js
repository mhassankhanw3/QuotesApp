import {View, Text} from 'react-native';
import React from 'react';

export default function SearchFeature({isEnabled}) {
  return (
    <View className="flex flex-row items-center justify-between mt-4">
      <Text
        className={`${
          isEnabled ? 'text-zinc-200' : 'text-gray-700'
        } text-3xl font-bold`}>
        Search
      </Text>
      <View className="flex items-center justify-center rounded-full border-2 border-blue-500 w-7 h-7 ">
        <Text
          className={`text-md font-bold ${
            isEnabled ? 'text-blue-500' : 'text-blue-600'
          }`}>
          ?
        </Text>
      </View>
    </View>
  );
}
