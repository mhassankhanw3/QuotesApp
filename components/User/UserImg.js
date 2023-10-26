import {View, Text, Image} from 'react-native';
import React from 'react';
import {useMainContext} from '../../context/Main';

export default function UserImg({user, isEnabled}) {
  return (
    <View className="mt-10 mb-2 flex items-center justify-center rounded-full mx-auto">
      {user?.photoURL === null ? (
        <View
          className={`border-2 flex items-center justify-center ${
            isEnabled
              ? 'bg-zinc-900 border-zinc-700'
              : 'bg-white border-gray-200'
          } w-24 h-24 rounded-full`}>
          <Text
            className={`uppercase font-bold text-[40px] ${
              isEnabled ? 'text-gray-300' : 'text-gray-500'
            } `}>
            {user?.displayName.slice(0, 1)}
          </Text>
        </View>
      ) : (
        <Image
          source={{uri: user?.photoURL}}
          // style={{width: 100, height: 100}}
          className="rounded-full w-40 h-40"
        />
      )}
    </View>
  );
}
