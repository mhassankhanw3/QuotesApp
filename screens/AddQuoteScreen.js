import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/Wrapper/ScreenWrapper';
import {useMainContext} from '../context/Main';
import AddQuotes from '../components/Quotes/AddQuotes';
import GoBackBtn from '../components/prev/GoBackBtn';

export default function AddQuoteScreen() {
  const {isEnabled} = useMainContext();
  return (
    <ScreenWrapper>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        className="h-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flexGrow: 1}}>
          <GoBackBtn isEnabled={isEnabled} />
          <AddQuotes />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
