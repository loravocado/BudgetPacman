import React, { Component } from 'react';
import {View, Text, Button, Alert} from 'react-native';

class header extends Component {
  render() {
    return (
      <View style={{flex:1, backgroundColor:'#282626', position:'absolute'}}>
      <Button
         title="Press me"
         onPress={() => Alert.alert('Simple Button pressed')}
       />
      </View>
    );
  }
}
