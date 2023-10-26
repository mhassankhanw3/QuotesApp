import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScreenWrapper from '../components/Wrapper/ScreenWrapper';
import GoBackBtn from '../components/prev/GoBackBtn';
import Loading from '../components/loadings/loading';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useMainContext} from '../context/Main';
import Snackbar from 'react-native-snackbar';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false); // State to track if the keyboard is open

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const navigation = useNavigation();
  const {func, loading} = useMainContext();

  const handleSignIn = async () => {
    if (email && password) {
      await func.signIn(email, password, navigation);
      setEmail('');
      setPassword('');
      // navigation?.navigate('Home');
      // good to go
    } else {
      // show error message
      Snackbar.show({
        text: 'Email and password required!',
        textColor: '#b91c1c',
        backgroundColor: '#fecaca',
        numberOfLines: 2,
        action: {
          text: 'ok',
          textColor: '#b91c1c',
        },
      });
    }
  };

  const passReset = async () => {
    await func.resetPassword(email, navigation);
  };

  return (
    <ScreenWrapper useDarkTheme={false}>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        className="h-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flexGrow: 1}}>
          <GoBackBtn title={'Sign In'} useDarkTheme={false} />
          <View className="flex-row justify-center">
            <Image
              className={`${
                isFocused || isKeyboardOpen ? 'w-56 h-56' : 'w-72 h-72'
              } transition-all `}
              source={require('../assets/images/signin.png')}
            />
          </View>
          <KeyboardAvoidingView
            behavior="position"
            // keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <View className="space-y-1 mx-2">
              <Text className="text-[16px] font-medium text-gray-500">
                Email:
              </Text>
              <TextInput
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                Editable
                autoCapitalize="none"
                value={email}
                placeholder="Email"
                placeholderTextColor={'#a1a1aa'}
                onChangeText={value => setEmail(value)}
                className="bg-gray-50 outline-none focus:border-blue-500 border-[0.8px] border-gray-300 py-3 px-4 rounded-xl mb-2 text-[16px] text-gray-700"
              />
              <Text className="text-[16px] font-medium text-gray-500">
                Password:
              </Text>
              <TextInput
                secureTextEntry
                Editable
                autoCapitalize="none"
                maxLength={8}
                value={password}
                placeholder="Password"
                placeholderTextColor={'#a1a1aa'}
                onChangeText={value => setPassword(value.trim())}
                className="bg-gray-50 outline-none border-[0.8px] border-gray-300 py-3 px-4 rounded-xl mb-1 text-[16px] text-gray-700"
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={passReset}
                className="flex-row justify-end mr-2">
                <Text>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
        <View className="mt-6">
          <View className="mb-2 mx-2 flex flex-row items-center">
            <Text>Don't have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Signup')}>
              <Text className="text-blue-500 text-[16px]">Sign Up</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSignIn}
              className="bg-gray-700 shadow-xl shadow-gray-200 flex items-center justify-center rounded-full p-4">
              <Text className="text-white text-center text-[16px] font-semibold ">
                Sign In
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
