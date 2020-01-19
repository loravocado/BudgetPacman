import React, { Component } from 'react';
import {View, Text} from 'react-native';

export default class header extends Component {
  render() {
    return (
      <View style={{flex:1, backgroundColor:'#282626', position:'absolute'}}>
        <Text> Hello </Text>
      </View>
    );
  }
}
