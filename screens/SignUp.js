import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScreenWrapper from '../components/Wrapper/ScreenWrapper';
import GoBackBtn from '../components/prev/GoBackBtn';
import Loading from '../components/loadings/loading';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useMainContext} from '../context/Main';
import Snackbar from 'react-native-snackbar';
import {launchImageLibrary} from 'react-native-image-picker';

export default function SignUp() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 30;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const {func} = useMainContext();

  const handleSignUp = async () => {
    if (displayName && email && password) {
      await func.newUser(email, password, displayName, photoURL, navigation);
      setDisplayName('');
      setEmail('');
      setPassword('');
      // navigation?.navigate('Home');
      // good to go
    } else {
      // show error message
      Snackbar.show({
        text: 'All fields are required required!',
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

  const handleChooseImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    await launchImageLibrary(options, response => {
      setLoading(true);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        setLoading(false);
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setPhotoURL(imageUri);
        console.log(imageUri, 'imageUri');
        setLoading(false);
      }
      setLoading(false);
    });
  };
  useEffect(() => {
    console.log(photoURL, 'photoURL');
  }, [photoURL]);

  return (
    <ScreenWrapper useDarkTheme={false}>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        className="h-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flexGrow: 1}}>
          <GoBackBtn
            title={'Sign Up'}
            useDarkTheme={false}
          />
          {photoURL ? (
            <View className="mt-10 mb-4 flex items-center justify-center w-32 h-32 rounded-full mx-auto">
              <Image
                source={{uri: photoURL}}
                // style={{width: 100, height: 100}}
                className="rounded-full w-28 h-28"
              />
            </View>
          ) : (
            <View className="mb-4">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleChooseImage} // Add the onPress event to open the image picker
                className="bg-gray-200 mt-10 flex items-center justify-center w-32 h-32 rounded-full mx-auto">
                <Icon name={'upload'} size={40} color="#6b7280" />
                <Text className="text-sm absolute bottom-4">Upload</Text>
              </TouchableOpacity>
            </View>
          )}
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={keyboardVerticalOffset}>
            <View className="space-y-1 mx-2">
              <Text className="text-[16px] font-medium text-gray-500">
                User Name:
              </Text>
              <TextInput
                autoCapitalize="none"
                value={displayName}
                placeholder="username"
                placeholderTextColor={'#a1a1aa'}
                onChangeText={value => setDisplayName(value)}
                className="bg-gray-50 border-[0.5px] border-gray-300 py-3 px-4 rounded-xl mb-1 font-normal text-[16px] text-gray-700"
              />
              <Text className="text-[16px] font-medium text-gray-500">
                Email:
              </Text>
              <TextInput
                Editable
                autoCapitalize="none"
                value={email}
                placeholder="Email"
                placeholderTextColor={'#a1a1aa'}
                onChangeText={value => setEmail(value)}
                className="bg-gray-50 border-[0.5px] border-gray-300 py-3 px-4 rounded-xl mb-1 text-[16px] text-gray-700"
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
                className="bg-gray-50 border-[0.5px] border-gray-300 py-3 px-4 rounded-xl mb-1 text-[16px] text-gray-700"
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        <View className="mt-6">
          <View className="mb-2 mx-2 flex flex-row items-center">
            <Text>Already have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Signin')}>
              <Text className="text-blue-500 text-[16px]">Sign In</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSignUp}
              className="bg-gray-700 shadow-xl shadow-gray-200 flex items-center justify-center rounded-full p-4">
              <Text className="text-white text-center text-[16px] font-semibold ">
                Sign Up
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
