import React, { Component } from 'react';
import {View, StyleSheet, Image} from 'react-native';

export default class header extends Component {
  render() {
    return (
      <View style={main_body.container}>
        <View style={main_body.ghost_image_wrapper}>
          <Image
           style={main_body.ghost_image}
           source={require('../../images/blue_ghost.png')}
          />
        </View>
      </View>
    );
  }
}

const main_body = StyleSheet.create({
  container: {
    flex:10,
    backgroundColor:'#282626'
  },
  ghost_image_wrapper: {
    alignItems:'center',
    flex:10,
    justifyContent: 'center',
    marginBottom:100,
  },
  ghost_image: {
    width:240,
    height:240
  },
  button_wrapper: {
    flex:1
  },

})
