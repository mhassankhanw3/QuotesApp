import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {View} from 'react-native';
import {useMainContext} from '../../context/Main';

const TabIcon = ({focused, name, isSearch, isFeather}) => {
  const {isEnabled} = useMainContext();

  // Define the default and focused icon colors
  const defaultColor = isEnabled ? '#9ca3af' : '#9ca3af';
  const focusedColor = isEnabled ? 'white' : '#030712';

  // Define the icon size
  const iconSize = focused ? 30 : 26;

  // Determine the icon color based on focus and isEnabled
  const iconColor = focused ? focusedColor : defaultColor;

  return (
    <>
      {isSearch ? (
        <Ionicons name={name} size={iconSize} color={iconColor} />
      ) : isFeather ? (
        <Feather name={name} size={iconSize} color={iconColor} />
      ) : (
        <Icon name={name} size={iconSize} color={iconColor} />
      )}
    </>
  );
};

export default TabIcon;
