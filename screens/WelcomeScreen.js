import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/Wrapper/ScreenWrapper';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <ScreenWrapper useDarkTheme={false}>
      <View className="h-full flex justify-around">
        <View className="h-[80%] flex flex-col items-center justify-center">
          <View className="mb-6">
            <LottieView
              style={{width: 200, height: 200}}
              source={require('../assets/animations/quoteOne.json')}
              autoPlay
              loop={false}
            />
          </View>
          <View className="flex flex-row items-center justify-center gap-2">
            <View className="h-[2px] rounded-full bg-gray-500 w-5"></View>
            <Text
              className="text-3xl font-bold text-gray-600"
              style={styles.italic}>
              &ldquo;Daily Quotes&rdquo;
            </Text>
          </View>
          <Text className="text-[17px] text-gray-500 mt-2 text-center w-[90%] leading-6 mx-auto">
            Discover inspiration in our vast collection of quotes. Quotivia
            brightens your day with the power of words
          </Text>
        </View>
        <View className="mt-10 space-y-2">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Signin')}
            className="bg-gray-700 shadow-xl shadow-gray-600 flex items-center justify-center rounded-xl py-4">
            <Text className="text-gray-200 text-center text-[16px]">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  bold: {fontWeight: 'bold'},
  italic: {fontStyle: 'italic'},
  underline: {textDecorationLine: 'underline'},
});

{
  /* <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            className="bg-gray-700 shadow-xl shadow-gray-600 flex items-center justify-center rounded-xl py-4">
            <Text className="text-gray-200 text-center text-[16px]">
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            className="bg-gray-700 shadow-xl shadow-gray-600 flex items-center justify-center rounded-xl py-4">
            <Text className="text-gray-200 text-center text-[16px]">
              Sign Up
            </Text>
          </TouchableOpacity> */
}
