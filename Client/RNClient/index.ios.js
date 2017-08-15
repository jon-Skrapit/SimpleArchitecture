/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Route from './App/index'
export default class RNClient extends Component {
  render() {
    return (
      <Route/>
    );
  }
}
AppRegistry.registerComponent('RNClient', () => RNClient);
