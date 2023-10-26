import {View, Text, ScrollView, Share} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScreenWrapper from '../components/Wrapper/ScreenWrapper';
import Quote from '../components/Quotes/Quote';
import {useMainContext} from '../context/Main';
import {useIsFocused} from '@react-navigation/native';
import Loading from '../components/loadings/loading';

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const {isEnabled, func, user, loading, setLoading} = useMainContext();
  const [quotesData, setQuotesData] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && isFocused) {
      setLoading(true);
      func
        .getAllUsersFromFirestore(user)
        .then(quotes => {
          setQuotesData(quotes);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
    // console.log(quotesData, 'useEffect quotesData');
  }, [user, isFocused]);

  const shareQuote = (quote, author, userName) => {
    const ownerMessage = `Shared by ${userName}:`;
    const content = `${ownerMessage}\n\nQuote: "${quote}"\nAuthor: ${author}`;

    Share.share({
      message: content,
    })
      .then(result => {
        if (result.action === Share.sharedAction) {
          // Quote shared successfully
          console.log('Shared');
        } else if (result.action === Share.dismissedAction) {
          // User dismissed the sharing dialog
          console.log('Dismissed');
        }
      })
      .catch(error => {
        // Handle any errors that occur during sharing
        console.error('Error sharing:', error);
      });
  };

  return (
    <ScreenWrapper>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        className="h-screen"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flexGrow: 1}}>
          {quotesData.length > 0 && (
            <Text
              className={`${
                isEnabled ? 'text-zinc-200' : 'text-gray-700'
              } text-3xl font-bold ml-4 mt-4`}>
              Quotes
            </Text>
          )}
          <View className="px-2 py-2 mt-8 mb-24">
            <View>
              {loading ? (
                <Loading IsUIActivityIndicator={true} isEnabled={isEnabled} />
              ) : (
                <View>
                  {quotesData.length > 0 ? (
                    <Quote
                      data={quotesData}
                      isEnabled={isEnabled}
                      shareQuote={shareQuote}
                    />
                  ) : (
                    <View className="flex items-center justify-center mt-20 w-[70%] ">
                      <Text
                        className={`text-start font-bold text-4xl leading-10 ${
                          isEnabled ? 'text-zinc-300' : 'text-gray-500'
                        } `}>
                        No Quotes &ldquo;Found&rdquo;
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
