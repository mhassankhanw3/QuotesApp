import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Modal,
  StyleSheet,
  Pressable,
  Button,
  FlatList,
  TextInput,
  StatusBar,
} from 'react-native';
import IconShare from 'react-native-vector-icons/Ionicons';
import LikeIcon from 'react-native-vector-icons/Entypo';
import React, {useState, useEffect} from 'react';
import ScreenWrapper from '../components/Wrapper/ScreenWrapper';
import GoBackBtn from '../components/prev/GoBackBtn';
import UserIcon from 'react-native-vector-icons/FontAwesome5';
import MateIcon from 'react-native-vector-icons/MaterialIcons';
import {useMainContext} from '../context/Main';
import IconOut from 'react-native-vector-icons/Octicons';
import UserProfile from '../components/User/UserProfile';
import LottieView from 'lottie-react-native';
import UserImg from '../components/User/UserImg';
import Followers from '../components/User/UserFollow';
import Loading from '../components/loadings/loading';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Share} from 'react-native';
import NativeModal from '../components/Modal/Modal';
import DeleteModal from '../components/Modal/DeleteModal';

const transparent = 'rgba(0,0,0,0.5)';
export default function UserScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userQuotes, setUserQuotes] = useState([]); // State to store user's quotes
  const [userQuotesData, setUserQuotesData] = useState(null); // Initialize as null
  const [likedQuotes, setLikedQuotes] = useState(userQuotes.map(() => false));
  const [deleteQuote, setDeleteQuote] = useState(null);
  const [quoteToDelete, setQuoteToDelete] = useState(null);

  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(null);

  const {user, func, isEnabled, toggleSwitch, loading, setLoading} =
    useMainContext();

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const funcLike = index => {
    const updatedLikes = [...likedQuotes];
    updatedLikes[index] = !updatedLikes[index];
    setLikedQuotes(updatedLikes);
  };

  useEffect(() => {
    if (user && isFocused) {
      func
        .getUserQuotesFromFirestore(user)
        .then(quotes => {
          setUserQuotes(quotes);
          // console.log(userQuotes, 'userQuotes: ');
        })
        .catch(error => {
          console.error('Error fetching user quotes:', error);
        });
    }
  }, [user, isFocused, userQuotes]);

  //                     removeQuoteFromState

  const removeQuoteFromState = quoteId => {
    const updatedQuotes = userQuotes.filter(quote => quote.id !== quoteId);
    setUserQuotes(updatedQuotes);
  };

  //                       handleDeleteQuote

  const handleDeleteQuote = async quoteId => {
    if (quoteId) {
      try {
        // Attempt to delete the quote in Firestore
        await func.deleteQuoteFromFirestore(quoteId);
        // If successful, update the local state
        const updatedUserQuotes = userQuotes.filter(
          quote => quote.id !== quoteId,
        );
        setUserQuotes(updatedUserQuotes);
        setQuoteToDelete(null);
        setSelectedQuoteIndex(null);
      } catch (error) {
        console.error('Error deleting quote:', error);
        // Handle the error, such as displaying an error message to the user
      }
    }
  };

  //                     USER logout

  const logout = async navigation => {
    await func.Logout(navigation);
  };

  //                      shareQuote

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

  const colors = {
    boxIcon: isEnabled ? 'bg-zinc-800' : 'bg-gray-100',
    userDetails: isEnabled
      ? 'bg-zinc-900 border-zinc-700'
      : 'bg-white border-gray-200',
  };

  return (
    <ScreenWrapper>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        className="h-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flexGrow: 1}}>
          <GoBackBtn title={'Your Profile'} isEnabled={isEnabled} />
          <View>
            <UserImg user={user} isEnabled={isEnabled} />
            <Followers colors={colors} user={user} isEnabled={isEnabled} />
            <View
              className={`flex border shadow-lg ${colors.userDetails}  flex-row items-start justify-start space-x-4 rounded-2xl py-4 px-4 mb-2`}>
              <View
                className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.boxIcon}`}>
                <UserIcon name="user-alt" size={24} color="#9ca3af" />
              </View>
              <View>
                <Text
                  className={`${
                    isEnabled ? 'text-zinc-200' : 'text-gray-600'
                  } font-bold text-[18px]`}>
                  {user?.displayName}
                </Text>
                <Text
                  className={`${
                    isEnabled ? 'text-zinc-400' : 'text-gray-400'
                  }`}>
                  {user?.email}
                </Text>
              </View>
            </View>
            <View
              className={`flex border ${
                isEnabled ? 'border-zinc-700' : 'border-gray-200'
              }  shadow-lg ${
                isEnabled ? 'bg-zinc-900' : 'bg-white'
              }  flex-row items-center justify-between space-x-4 rounded-2xl py-2 px-4 mb-2`}>
              <View className=" flex flex-row items-center justify-start space-x-4">
                <View
                  className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.boxIcon}`}>
                  <MateIcon
                    name={isEnabled ? 'dark-mode' : 'light-mode'}
                    size={28}
                    color="#9ca3af"
                  />
                </View>
                <Text
                  className={`${
                    isEnabled ? 'text-zinc-400' : 'text-gray-500'
                  } text-lg font-medium`}>
                  {isEnabled ? 'dark-theme' : 'light-theme'}
                </Text>
              </View>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#3b82f6' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            {/* Contact us */}
            <View
              className={`flex border shadow-lg ${
                isEnabled
                  ? 'bg-zinc-900 border-zinc-700'
                  : 'bg-white border-gray-200'
              } flex-row items-start justify-start space-x-4 rounded-2xl py-4 px-4 mb-2`}>
              <View
                className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.boxIcon}`}>
                <MateIcon name="email" size={24} color="#9ca3af" />
              </View>
              <View className="flex items-start  justify-center">
                <Text
                  className={`${
                    isEnabled ? 'text-zinc-400' : 'text-gray-500'
                  } text-lg font-medium`}>
                  contact us
                </Text>
                <Text className={`${isEnabled ? 'text-zinc-500' : ''}`}>
                  If you have any concern
                </Text>
                <Text
                  className={`text-xs mt-1 ${
                    isEnabled ? 'text-zinc-500' : ''
                  } `}>
                  developer:
                  <Text
                    className={`${
                      isEnabled ? 'text-blue-500' : 'text-blue-600'
                    }`}>
                    {' '}
                    mhassankhanw3@gmail.com
                  </Text>
                </Text>
              </View>
            </View>
            {/* Logout */}
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.7}
              className={`flex border ${
                isEnabled
                  ? 'bg-zinc-700 border-zinc-500'
                  : 'bg-red-200 border-red-400'
              }  flex-row items-center justify-start space-x-4 rounded-2xl py-3 px-4 mb-2`}>
              <View
                className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  isEnabled ? 'bg-zinc-800' : 'bg-red-100'
                }`}>
                <IconOut
                  name="sign-out"
                  size={24}
                  color={`${isEnabled ? '#e5e7eb' : '#ef4444'}`}
                />
              </View>
              <Text
                className={`${
                  isEnabled ? 'text-gray-100' : 'text-red-500'
                } text-xl font-semibold`}>
                Log out
              </Text>
            </TouchableOpacity>

            <View className="mt-4 mb-24">
              {loading ? (
                <Loading IsUIActivityIndicator={true} isEnabled={isEnabled} />
              ) : (
                <View>
                  {userQuotes.length > 0 && (
                    <Text
                      className={`${
                        isEnabled ? 'text-zinc-300' : 'text-gray-600'
                      } font-bold text-[18px] mb-2 ml-2`}>
                      {user?.displayName}' s Quotes:
                    </Text>
                  )}
                  {userQuotes.length > 0 ? (
                    <View className="flex flex-col items-center justify-center space-y-2 w-full mx-auto">
                      {userQuotes.map((item, index) => (
                        <TouchableOpacity
                          activeOpacity={isEnabled ? 0.7 : 0.6}
                          onLongPress={() => setQuoteToDelete(item.id)}
                          key={item?.id}
                          className={`  border-[0.8px] ${
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
                                    {user?.displayName.slice(0, 1)}
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
                                  likedQuotes[index]
                                    ? 'heart'
                                    : 'heart-outlined'
                                }
                                size={26}
                                color="rgb(255, 48, 64)"
                              />
                            </TouchableOpacity>
                            {/* <TouchableOpacity
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
                              </TouchableOpacity> */}
                            <TouchableOpacity
                              onPress={() =>
                                shareQuote(
                                  item.quote,
                                  item.author,
                                  item.userName,
                                )
                              }
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
                          <Modal
                            animationType="none"
                            transparent={true}
                            visible={quoteToDelete !== null}
                            // backdropStyle={styles.backdrop}
                            onRequestClose={() => {
                              Alert.alert('Modal has been closed.');
                              setQuoteToDelete(null);
                              setSelectedQuoteIndex(null);
                            }}>
                            <View style={styles.centeredView}>
                              <View
                                className={`max-w-full w-[70%] mx-auto ${
                                  isEnabled ? 'bg-zinc-800' : 'bg-white'
                                } pt-4 pb-2 px-4 rounded-xl shadow-2xl shadow-gray-800 backdrop-blur-xl`}>
                                <Text
                                  className={`${
                                    isEnabled
                                      ? 'text-gray-300'
                                      : 'text-gray-600'
                                  } text-[17px] font-medium`}>
                                  Delete Quote?
                                </Text>
                                <View className="p-0 w-20 h-20 flex items-center justify-center mx-auto">
                                  <LottieView
                                    style={{
                                      width: 50,
                                      height: 50,
                                      borderColor: 'black',
                                      borderWidth: 1,
                                    }}
                                    source={require('../assets/animations/deleteQuote.json')}
                                    autoPlay
                                    loop
                                  />
                                </View>
                                <View className="flex flex-row items-center justify-end space-x-2">
                                  <TouchableOpacity
                                    onPress={() => {
                                      setQuoteToDelete(null);
                                      setSelectedQuoteIndex(null);
                                    }}
                                    activeOpacity={0.8}
                                    className={`${
                                      isEnabled ? 'bg-red-500' : 'bg-red-500'
                                    } py-2 px-3 rounded-xl`}>
                                    <Text className="text-white ">Cancel</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      handleDeleteQuote(quoteToDelete);
                                      setQuoteToDelete(null);
                                      setSelectedQuoteIndex(null);
                                    }}
                                    activeOpacity={0.8}
                                    className={`${
                                      isEnabled ? 'bg-blue-500' : 'bg-blue-500'
                                    } py-2 px-4 rounded-xl`}>
                                    <Text className="text-white">Delete</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </Modal>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <View
                      className={`flex items-center justify-center rounded-xl p-4  border ${
                        isEnabled
                          ? 'border-zinc-700 bg-zinc-900 '
                          : 'border-gray-300 bg-white'
                      }`}>
                      <Text
                        className={`text-center w-[80%] font-bold text-lg leading-6 ${
                          isEnabled ? 'text-zinc-400' : 'text-gray-500'
                        } `}>
                        You haven't added any &ldquo;Quotes&rdquo; Yet!
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('AddQuote')}
                        className={`${
                          isEnabled ? 'bg-zinc-700' : 'bg-gray-300'
                        } flex items-center justify-center mt-4 rounded-lg py-3 w-[42%]`}>
                        <Text
                          className={`${
                            isEnabled
                              ? 'text-gray-200'
                              : 'text-gray-500 font-medium'
                          } text-center text-[16px]`}>
                          Add Quotes
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
        {/* <Modal /> */}
        <NativeModal
          isEnabled={isEnabled}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          logout={logout}
        />

        {/* <
          isEnabled={isEnabled}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          logout={logout}
        /> */}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: transparent,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bold: {fontWeight: 'bold'},
  italic: {fontStyle: 'italic'},
  underline: {textDecorationLine: 'underline'},
});
