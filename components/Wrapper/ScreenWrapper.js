import React from 'react';
import {useMainContext} from '../../context/Main';
import {View, Text, StatusBar, Platform} from 'react-native';

export default function ScreenWrapper({children, useDarkTheme = true}) {
  const StatusBarHeight = Platform.OS === 'ios' ? 30 : 10;
  const {isEnabled} = useMainContext();
  const backgroundColor = useDarkTheme
    ? isEnabled
      ? '#27272a'
      : '#f1f5f9'
    : '#f1f5f9';
  const textColor = useDarkTheme
    ? isEnabled
      ? 'light-content'
      : 'dark-content'
    : 'dark-content';

  return (
    <View
      style={{
        paddingTop: StatusBarHeight,
        paddingLeft: 14,
        paddingRight: 14,
        paddingBottom: 10,
        backgroundColor: backgroundColor,
      }}>
      <StatusBar barStyle={textColor} backgroundColor={backgroundColor} />
      {children}
    </View>
  );
}
