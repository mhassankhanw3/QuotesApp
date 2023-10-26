import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import IconShare from 'react-native-vector-icons/Ionicons';
import {useMainContext} from '../../context/Main';
const transparent = 'rgba(0,0,0,0.5)';
export default function Quote({data, shareQuote}) {
  const [likedQuotes, setLikedQuotes] = useState(data.map(() => false));
  const {isEnabled} = useMainContext();

  const funcLike = index => {
    const updatedLikes = [...likedQuotes];
    updatedLikes[index] = !updatedLikes[index];
    setLikedQuotes(updatedLikes);
  };
  return (
    <View className="flex flex-col items-center justify-center space-y-2 w-full mx-auto">
      {data.map((item, index) => (
        <View
          key={item.id}
          className={` shadow-lg border-[0.8px] ${
            isEnabled
              ? 'bg-zinc-900 shadow-zinc-800 border-zinc-700'
              : 'bg-white shadow-gray-400 border-gray-200'
          }  rounded-3xl flex flex-col gap-2 w-full mx-auto items-center justify-center px-6 py-4 `}>
          <View className="z-50">
            {item?.userImg ? (
              <Image
                source={{uri: item?.userImg}}
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
                  {item?.userName?.slice(0, 1)}
                </Text>
              </View>
            )}
          </View>
          <View className="flex flex-row items-start justify-center space-x-1">
            {/* <View
              className={`h-[1px] rounded-full mt-3 ${
                isEnabled ? 'bg-gray-400' : 'bg-gray-500'
              } w-2`}></View> */}
            <Text
              style={styles.italic}
              className={`text-center text-[16px] mx-2 ${
                isEnabled ? 'text-gray-400' : 'text-gray-500'
              } `}>
              &ldquo;{item.quote}&rdquo;
            </Text>
          </View>
          <Text
            className={`${
              isEnabled ? 'text-gray-300' : 'text-gray-700'
            } font-medium text-center`}>
            {item.author ? item.author : item.userName}
          </Text>
          <View className="flex flex-row items-center justify-center space-x-6">
            <TouchableOpacity
              onPress={() => funcLike(index)}
              activeOpacity={0.4}
              underlayColor={'#030712'}
              className={'bg-transparent flex items-center justify-center p-1'}>
              <Icon
                name={likedQuotes[index] ? 'heart' : 'heart-outlined'}
                size={26}
                color="rgb(255, 48, 64)"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => shareQuote(item.quote, item.author, item.userName)}
              activeOpacity={0.4}
              underlayColor={'#e5e7eb'}
              className={'bg-transparent flex items-center justify-center p-1'}>
              <IconShare name={'share-social'} size={26} color={'#3b82f6'} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bold: {fontWeight: 'bold'},
  italic: {fontStyle: 'italic'},
  underline: {textDecorationLine: 'underline'},
});
