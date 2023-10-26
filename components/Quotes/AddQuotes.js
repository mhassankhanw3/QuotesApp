import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import GoBackBtn from '../prev/GoBackBtn';
import ScreenWrapper from '../Wrapper/ScreenWrapper';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';
import {useMainContext} from '../../context/Main';
import Loading from '../loadings/loading';

export default function AddQuotes() {
  const {user, func, loading, isEnabled} = useMainContext();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const navigation = useNavigation();

  // const handleAddQuote = async () => {
  //   if (quote.trim() !== '') {
  //     // Check if the quote contains non-whitespace characters
  //     await func.addUserQuotesToFireStore(quote, author, user);
  //     // Good to go
  //     navigation?.navigate('Home');
  //     setQuote('');
  //     setAuthor('');

  //     // Show a success message
  //     Snackbar.show({
  //       text: 'Quote added successfully!',
  //       textColor: '#1e4620', // Choose your text color
  //       backgroundColor: '#caf7e3', // Choose your background color
  //       duration: Snackbar.LENGTH_SHORT,
  //     });
  //   } else {
  //     // Show an error message for empty or whitespace-only quote
  //     Snackbar.show({
  //       text: 'Please enter a valid quote!',
  //       textColor: '#b91c1c',
  //       backgroundColor: '#fecaca',
  //       numberOfLines: 2,
  //       action: {
  //         text: 'OK',
  //         textColor: '#b91c1c',
  //       },
  //     });
  //   }
  // };

  const handleAddQuote = async () => {
    // Trim the quote to remove leading and trailing spaces
    const trimmedQuote = quote.trim();
    if (trimmedQuote !== '') {
      // Check if the trimmed quote contains non-whitespace characters
      if (/^\s*$/.test(trimmedQuote)) {
        // Show an error message for quotes with only spaces
        Snackbar.show({
          text: 'Please enter a valid quote!',
          textColor: '#b91c1c',
          backgroundColor: '#fecaca',
          numberOfLines: 2,
          action: {
            text: 'OK',
            textColor: '#b91c1c',
          },
        });
      } else {
        // Valid quote with non-whitespace characters, proceed to add it
        await func.addUserQuotesToFireStore(trimmedQuote, author, user);
        // Good to go
        navigation?.navigate('Home');
        setQuote('');
        setAuthor('');

        // Show a success message
        Snackbar.show({
          text: 'Quote added successfully!',
          textColor: '#1e4620',
          backgroundColor: '#caf7e3',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } else {
      // Show an error message for empty or whitespace-only quote
      Snackbar.show({
        text: 'Please enter a valid quote!',
        textColor: '#b91c1c',
        backgroundColor: '#fecaca',
        numberOfLines: 2,
        action: {
          text: 'OK',
          textColor: '#b91c1c',
        },
      });
    }
  };

  return (
    <ScreenWrapper>
      <View className="mb-4 border-b-[0.8px] border-gray-300 h-14 w-full">
        <TextInput
          Editable
          value={quote}
          placeholder="Add Quote"
          multiline={true}
          placeholderTextColor={'#a1a1aa'}
          onChangeText={value => setQuote(value)}
          className={` px-2 rounded-xl text-[16px] ${
            isEnabled ? 'text-zinc-200' : 'text-gray-700'
          }`}
        />
      </View>
      <View>
        <TextInput
          Editable
          value={author}
          placeholder="Author (optional)"
          multiline={true}
          placeholderTextColor={'#a1a1aa'}
          onChangeText={value => setAuthor(value)}
          className={`px-3 border-[0.8px] border-gray-300 rounded-xl mb-2 text-[16px] ${
            isEnabled ? 'text-zinc-200' : 'text-gray-700'
          }`}
        />
      </View>
      {loading ? (
        <Loading isEnabled={isEnabled} />
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleAddQuote}
          className={`${
            isEnabled ? 'bg-zinc-700' : 'bg-gray-600'
          } mt-4 shadow-xl shadow-gray-800 flex items-center justify-center rounded-xl py-4`}>
          <Text className="text-gray-200 text-center text-[16px]">Add</Text>
        </TouchableOpacity>
      )}
    </ScreenWrapper>
  );
}
