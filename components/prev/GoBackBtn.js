import {View, Text, Pressable, TouchableHighlight} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useMainContext} from '../../context/Main';

const transparent = 'rgba(0,0,0,0.5)';
export default function GoBackBtn({title, navigate, useDarkTheme, isEnabled}) {
  // const {isEnabled} = useMainContext();
  const navigation = useNavigation();
  return (
    <View>
      <View className="relative p-1">
        <View className="absolute top-0 left-0 z-10">
          <TouchableHighlight
            underlayColor={`${!isEnabled ? '#e5e7eb' : '#18181b'}`}
            className={'bg-transparent p-1 rounded-full'}
            onPress={() => {
              navigate ? navigation.navigate(navigate) : navigation.goBack();
            }}>
            <Icon
              name={'chevron-back'}
              size={30}
              color={`${isEnabled ? '#d4d4d8' : '#6b7280'}`}
            />
          </TouchableHighlight>
        </View>
        {title ? (
          <Text
            className={`${
              isEnabled ? 'text-zinc-300' : 'text-gray-600'
            } text-xl font-medium text-center`}>
            {title}
          </Text>
        ) : (
          <View className="flex flex-col items-center justify-center">
            <Text className="text-gray-700 text-[24px] font-bold">{''}</Text>
            <Text className="text-xs">{''}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
