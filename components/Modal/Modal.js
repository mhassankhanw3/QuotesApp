import {
  View,
  Text,
  Alert,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const transparent = 'rgba(0,0,0,0.5)';
export default function NativeModal({
  isEnabled,
  setModalVisible,
  modalVisible,
  logout,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      backdropStyle={styles.backdrop}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View
          className={`max-w-full w-[70%] mx-auto ${
            isEnabled ? 'bg-zinc-800' : 'bg-white'
          } pt-4 pb-2 px-4 rounded-xl shadow-2xl shadow-gray-800 backdrop-blur-xl`}>
          <Text
            className={`${
              isEnabled ? 'text-gray-300' : 'text-gray-600'
            } text-[17px] font-medium`}>
            Are you sure?
          </Text>
          <View className="p-0 w-20 h-20 flex items-center justify-center mx-auto">
            <LottieView
              style={{
                width: 140,
                height: 140,
                borderColor: 'black',
                borderWidth: 1,
              }}
              source={require('../../assets/animations/check.json')}
              autoPlay
              loop
            />
          </View>
          <View className="flex flex-row items-center justify-end space-x-2">
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              activeOpacity={0.8}
              className={`${
                isEnabled ? 'bg-red-500' : 'bg-red-500'
              } py-2 px-4 rounded-xl`}>
              <Text className="text-white ">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={logout}
              className={`${
                isEnabled ? 'bg-blue-500' : 'bg-blue-500'
              } py-2 px-4 rounded-xl`}>
              <Text className="text-white ">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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
});
