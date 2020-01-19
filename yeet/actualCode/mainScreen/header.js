import React, { Component } from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default class header extends Component {
  render() {
    return (
      <View style={main_header.container}>
        <Image
         style={main_header.logo}
         source={require('../../images/logo.png')}
        />
      </View>
    );
  }
}

const main_header = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#C11A1A',
    alignItems:'center',
    justifyContent:'center',
    paddingTop:10,
  },
  logo: {
    width: 224,
    height: 71
  }
});
