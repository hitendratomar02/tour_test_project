/**
 * Root Stack Screen
 */
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SearchTourPlace from '../SearchTourPlace/SearchTourPlace';

const RootStack = createStackNavigator();

const RootStackScreen = (props) => {
  return (
    <RootStack.Navigator headerMode='none'>
      <RootStack.Screen options={{ gestureEnabled: false }} name="SearchTourPlace" component={SearchTourPlace} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;