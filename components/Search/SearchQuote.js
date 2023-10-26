import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconShare from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function SearchQuote({isEnabled, data, user, otherUser}) {
  const [likedQuotes, setLikedQuotes] = useState(data.map(() => false));
  const funcLike = index => {
    const updatedLikes = [...likedQuotes];
    updatedLikes[index] = !updatedLikes[index];
    setLikedQuotes(updatedLikes);
  };

  const getQuoteCount = userId => {
    const quotesCount = data.filter(item => item.user === userId).length;
    return quotesCount;
  };

  const navigation = useNavigation();
  const navigateToUserProfile = user => {
    navigation.navigate('UserProfile', {user}); // Pass the user data as a parameter
  };

  return (
    <View>
      <View className={` flex flex-col space-y-1 w-full mx-auto`}>
        {data.map((item, index) => (
          <TouchableOpacity
            onPress={() => navigateToUserProfile(item)}
            activeOpacity={0.7}
            key={item.user}
            className={` ${
              isEnabled ? 'bg-transparent shadow-zinc-800 ' : 'bg-white  '
            }  rounded-3xl flex flex-row w-full mx-auto items-center justify-between px-6 py-4 `}>
            <View className="flex flex-row items-center">
              <View className="z-50">
                {item?.photoURL ? (
                  <Image
                    source={{uri: item?.photoURL}}
                    style={{width: 50, height: 50}}
                    className="z-0 rounded-full"
                  />
                ) : (
                  <View
                    style={{width: 50, height: 50}}
                    className={`rounded-full mx-auto border-[1px] ${
                      isEnabled
                        ? 'bg-zinc-900 border-[2px] border-zinc-700'
                        : 'bg-gray-50 border-gray-200'
                    } flex items-center justify-center`}>
                    <Text
                      className={`uppercase font-bold text-xl ${
                        isEnabled ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                      {item?.displayName?.slice(0, 1)}
                    </Text>
                  </View>
                )}
              </View>
              <View className="flex flex-col ml-4">
                <Text
                  className={`${
                    isEnabled ? 'text-gray-300' : 'text-gray-700'
                  } font-medium text-[16px]`}>
                  {item.author
                    ? item.author
                    : item.displayName.charAt(0).toUpperCase() +
                      item.displayName.slice(1)}
                </Text>
                <Text
                  className={` text-xs ${
                    isEnabled ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                  {`${item?.quoteCount ? item?.quoteCount : '0'} Quotes`}
                </Text>
              </View>
            </View>
            <View className="flex flex-row items-center justify-center space-x-6">
              <TouchableOpacity
                onPress={() => funcLike(index)}
                activeOpacity={0.4}
                underlayColor={'#030712'}
                className={`flex items-center justify-center py-2 px-4 rounded-xl border-[1px] ${
                  isEnabled
                    ? 'border-zinc-400 bg-transparent'
                    : 'border-gray-400 bg-transparent'
                }`}>
                <Text
                  className={`${
                    isEnabled ? 'text-zinc-300' : 'text-gray-600'
                  }`}>
                  {likedQuotes[index] ? 'following' : 'follow'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bold: {fontWeight: 'bold'},
  italic: {fontStyle: 'italic'},
  underline: {textDecorationLine: 'underline'},
});
