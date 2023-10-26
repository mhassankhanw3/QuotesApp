import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {colors} from '../theme';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default function Loading({IsUIActivityIndicator, isEnabled, quote}) {
  return (
    <View className="flex-row justify-center py-8">
      {IsUIActivityIndicator ? (
        <UIActivityIndicator
          size={30}
          color={isEnabled ? '#52525b' : '#374151'}
        />
      ) : (
        <DotIndicator size={10} color={isEnabled ? '#52525b' : '#374151'} />
      )}
    </View>
  );
}
