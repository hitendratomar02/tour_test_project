/**
 * NamoIndia React Native App
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import {
  NavigationContainer,
} from '@react-navigation/native';
import RootStackScreen from './app/screens/RootStackNavigator/RootStackScreen';
import { navigationRef, isReadyRef } from './app/screens/RootStackNavigator/RootNavigation';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    console.disableYellowBox = true;
  }

  render() {
    const { isConnected } = this.props;
    return (
        <NavigationContainer ref={navigationRef} onReady={() => { isReadyRef.current = true; }}>
          <RootStackScreen />
        </NavigationContainer>
    )
  }
}

export default App;
