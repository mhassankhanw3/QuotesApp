import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMainContext} from '../context/Main';
import IconShare from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LikeIcon from 'react-native-vector-icons/Entypo';
import ScreenWrapper from '../components/Wrapper/ScreenWrapper';
import GoBackBtn from '../components/prev/GoBackBtn';
import UserIcon from 'react-native-vector-icons/FontAwesome5';
import Loading from '../components/loadings/loading';

export default function UserProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [userQuotes, setUserQuotes] = useState([]);
  const [userQuotesData, setUserQuotesData] = useState(null); // Initialize as null
  const [userFollow, setUserFollow] = useState(false);
  const {user, func, isEnabled, loading, setLoading} = useMainContext();
  const [likedQuotes, setLikedQuotes] = useState(userQuotes.map(() => false));

  const funcLike = index => {
    const updatedLikes = [...likedQuotes];
    updatedLikes[index] = !updatedLikes[index];
    setLikedQuotes(updatedLikes);
  };

  const colors = {
    boxIcon: isEnabled ? 'bg-zinc-800' : 'bg-gray-100',
    userDetails: isEnabled
      ? 'bg-zinc-900 border-zinc-700'
      : 'bg-white border-gray-200',
  };
  //   useEffect(() => {
  //     if (user) {
  //       func
  //         .getAllUsersFromFirestore(user)
  //         .then(quotes => {
  //           setUserQuotes(quotes);
  //           console.log(quotes, 'quotesquotesquotesquotesquotes');
  //         })
  //         .catch(error => {
  //           console.error(error);
  //         });
  //       // setLoading(false);
  //     }
  //     // console.log(quotesData, 'useEffect quotesData');
  //   }, [user]);

  useEffect(() => {
    if (user && userQuotesData) {
      // Check if user and userQuotesData exist
      setLoading(true);
      func
        .getAllUsersFromFirestore(userQuotesData.user) // Fetch quotes for the specific user
        .then(quotes => {
          // Filter the quotes to include only the quotes associated with the specific user
          const userSpecificQuotes = quotes.filter(
            quote => quote.user === userQuotesData.user,
          );
          setUserQuotes(userSpecificQuotes);
          console.log(userQuotes, 'userQuotes');
          console.log(userQuotesData, 'userQuotesData');
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [user, userQuotesData]);

  useEffect(() => {
    setUserQuotesData(route?.params?.user);
  }, [userQuotesData]);

  const followUser = () => {
    setUserFollow(!userFollow);
  };

  return (
    <ScreenWrapper>
      <ScrollView
        className="h-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flexGrow: 1}}>
          <GoBackBtn
            title={userQuotesData?.displayName + "'s"}
            isEnabled={isEnabled}
          />
          <View className="mt-10 mb-2 flex items-center justify-center rounded-full mx-auto">
            {userQuotesData?.photoURL ? (
              <Image
                source={{uri: userQuotesData.photoURL}}
                style={{width: 100, height: 100}}
                className="rounded-full"
              />
            ) : (
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
                  {userQuotesData?.displayName.slice(0, 1)}
                </Text>
              </View>
            )}
          </View>
          <View className="flex flex-row items-center space-x-2 mb-2">
            <Text
              className={`lowercase ${
                isEnabled
                  ? 'text-gray-400 bg-zinc-700'
                  : 'text-gray-700 bg-gray-200'
              } px-1 rounded-md  font-medium`}>
              @{userQuotesData?.displayName.split(' ').join('')}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between mb-2">
            <View
              className={` ${colors.userDetails} flex border shadow-lg w-[48%] flex-row items-center justify-center space-x-2 rounded-xl py-2`}>
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
            <TouchableOpacity
              onPress={followUser}
              activeOpacity={0.4}
              underlayColor={'#030712'}
              className={`flex items-center justify-center py-2 px-6 rounded-xl border-[1px] ${
                isEnabled
                  ? 'border-zinc-400 bg-transparent'
                  : 'border-gray-400 bg-transparent'
              }`}>
              <Text
                className={`${isEnabled ? 'text-zinc-300' : 'text-gray-600'}`}>
                {userFollow ? 'following' : 'follow'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            className={`flex flex-row items-center justify-start space-x-4 border shadow-lg ${colors.userDetails}  rounded-2xl py-4 px-4 mb-2`}>
            <View
              className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.boxIcon}`}>
              <UserIcon name="user-alt" size={24} color="#9ca3af" />
            </View>
            <Text
              className={`${
                isEnabled ? 'text-zinc-200' : 'text-gray-600'
              } font-bold text-[18px]`}>
              {userQuotesData?.displayName}
            </Text>
          </View>
          {userQuotes.length >= 0 && (
            <Text
              className={`font-bold ml-2 ${
                isEnabled ? 'text-gray-300' : 'text-gray-600'
              } text-lg mb-2 mt-4`}>
              {userQuotesData?.displayName}' s Quotes:
            </Text>
          )}
          <View>
            {loading ? (
              <Loading IsUIActivityIndicator={true} isEnabled={isEnabled} />
            ) : (
              <View>
                {userQuotes.length >= 0 ? (
                  <View className="flex flex-col items-center justify-center space-y-2 w-full mx-auto">
                    {userQuotes.map((item, index) => (
                      <View
                        key={item.id}
                        className={`border-[0.8px] ${
                          isEnabled
                            ? 'bg-zinc-900 border-zinc-700'
                            : 'bg-white border-gray-300'
                        }  rounded-3xl flex flex-row w-full mx-auto items-start justify-between px-3 py-4 `}>
                        <View className="flex flex-row items-start w-[75%]">
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
                                    isEnabled
                                      ? 'text-gray-300'
                                      : 'text-gray-500'
                                  }`}>
                                  {item?.userName.slice(0, 1)}
                                </Text>
                              </View>
                            )}
                          </View>
                          <View className="flex flex-col items-start justify-start mt-1 ml-3">
                            <Text
                              className={`${
                                isEnabled ? 'text-gray-300' : 'text-gray-700'
                              } font-medium ml-1`}>
                              {item.author ? item.author : item.userName}
                            </Text>
                            <Text
                              style={styles.italic}
                              className={`text-[16px] mr-10 ${
                                isEnabled ? 'text-gray-400' : 'text-gray-500'
                              } `}>
                              &ldquo;{item.quote}&rdquo;
                            </Text>
                          </View>
                        </View>
                        <View className="flex flex-row items-center justify-end">
                          <TouchableOpacity
                            onPress={() => funcLike(index)}
                            activeOpacity={0.4}
                            underlayColor={'#030712'}
                            className={
                              'bg-transparent flex items-center justify-center p-1'
                            }>
                            <LikeIcon
                              name={
                                likedQuotes[index] ? 'heart' : 'heart-outlined'
                              }
                              size={26}
                              color="rgb(255, 48, 64)"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.4}
                            underlayColor={'#e5e7eb'}
                            className={
                              'bg-transparent flex items-center justify-center p-1'
                            }>
                            <IconShare
                              name={'share-social'}
                              size={26}
                              color={'#3b82f6'}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : (
                  <View className="flex items-center justify-center">
                    <Text
                      className={`text-start font-bold mt-4 text-2xl leading-10 ${
                        isEnabled ? 'text-zinc-300' : 'text-gray-500'
                      } `}>
                      {userQuotesData?.displayName} has No &ldquo;Quotes&rdquo;
                      Yet!
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  bold: {fontWeight: 'bold'},
  italic: {fontStyle: 'italic'},
  underline: {textDecorationLine: 'underline'},
});
