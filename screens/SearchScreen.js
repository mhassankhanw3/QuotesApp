import {View, Text, StatusBar, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useMainContext} from '../context/Main';
import SearchFeature from '../components/Search/SearchFeature';
import SearchInput from '../components/Search/SearchInput';
import {useIsFocused} from '@react-navigation/native';
import SearchQuote from '../components/Search/SearchQuote';
import Loading from '../components/loadings/loading';
import {useNavigation} from '@react-navigation/native';

export default function SearchScreen({props}) {
  const [userQuotes, setUserQuotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userScreenData, setUserScreenData] = useState('');

  const StatusBarHeight = Platform.OS === 'ios' ? 30 : 10;
  const {isEnabled, func, user, loading, setLoading} = useMainContext();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (user && user.uid) {
      setLoading(true);
      func
        .getAllUsersFromFirestore()
        .then(quotes => {
          const userQuoteCounts = new Map();

          quotes.forEach(quote => {
            const userId = quote.user;
            if (userQuoteCounts.has(userId)) {
              userQuoteCounts.set(userId, userQuoteCounts.get(userId) + 1);
            } else {
              userQuoteCounts.set(userId, 1);
            }
          });
          const userProfiles = [];
          userQuoteCounts.forEach((count, userId) => {
            const userData = quotes.find(quote => quote.user === userId);
            userProfiles.push({
              user: userId,
              displayName: userData.userName,
              photoURL: userData.userImg,
              quoteCount: count,
            });
          });
          const filteredUserProfiles = userProfiles
            .filter(profile =>
              profile.displayName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
            )
            .filter(profile => profile.user !== user.uid);

          setUserQuotes(filteredUserProfiles);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.error(error);
        });
    }
  }, [user, searchQuery]);

  return (
    <View
      style={{
        paddingTop: StatusBarHeight,
        paddingBottom: 10,
        backgroundColor: isEnabled ? '#27272a' : '#f1f5f9',
      }}
      className="w-full mx-auto ">
      <View className="px-7">
        <StatusBar
          barStyle={isEnabled ? 'light-content' : 'dark-content'}
          backgroundColor={isEnabled ? '#27272a' : '#f1f5f9'}
        />
        <View className="">
          <SearchFeature isEnabled={isEnabled} />
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isEnabled={isEnabled}
          />
        </View>
      </View>
      <View
        className={`mt-10  h-screen ${isEnabled ? 'bg-zinc-900' : 'bg-white'}`}>
        {loading ? (
          <Loading isEnabled={isEnabled} />
        ) : (
          <View>
            {userQuotes.length > 0 ? (
              <SearchQuote
                data={userQuotes}
                isEnabled={isEnabled}
                user={user}
                otherUser={userScreenData}
              />
            ) : (
              <View className="mt-6">
                <Text
                  className={`text-xl text-center ${
                    isEnabled ? 'text-zinc-300' : 'text-gray-600'
                  }`}>
                  No Users Found!
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
