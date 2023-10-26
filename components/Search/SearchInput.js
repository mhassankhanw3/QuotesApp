import {View, Text, TextInput} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchInput({
  isEnabled,
  searchQuote,
  setSearchQuote,
  searchQuery,
  setSearchQuery,
}) {
  const iconColor = isEnabled ? '#9ca3af' : '#9ca3af';
  return (
    <View
      className={`flex flex-row items-center justify-start  w-full px-4 rounded-full mt-4 ${
        isEnabled
          ? 'bg-zinc-700 shadow-md shadow-gray-800'
          : 'bg-white shadow-md shadow-gray-400'
      }`}>
      <Ionicons name={'search'} size={22} color={iconColor} />
      <TextInput
        Editable
        autoCapitalize="none"
        value={searchQuery}
        placeholder="Search Quotes"
        placeholderTextColor={'#a1a1aa'}
        onChangeText={value => setSearchQuery(value)}
        className={`text-[16px] w-[90%] py-3 ml-2 ${
          isEnabled ? 'text-zinc-200' : 'text-gray-700'
        } `}
      />
    </View>
  );
}
