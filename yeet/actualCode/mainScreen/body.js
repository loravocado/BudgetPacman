import React, { Component } from 'react';
import {View, StyleSheet, Image, Button, Text, Modal} from 'react-native';
import InputName from '../inputName/inputNameScreen.js';

export default class body extends Component {
  state = {
    modalVisible: false,
  };
  render() {
    return (
      <View style={main_body.container}>
        <View style={main_body.borderContainer}>
          <Image
           style={main_body.border}
           source={require('../../images/border.png')}
          />
        </View>
        <View style={main_body.main_body}>
          <View style={main_body.ghost_image_wrapper}>
            <Image
             style={main_body.ghost_image}
             source={require('../../images/blue_ghost.png')}
            />
          </View>
        <InputName/>
        </View>
        <View style={main_body.borderContainer}>
          <Image
           style={main_body.border}
           source={require('../../images/border.png')}
          />
        </View>
      </View>
    );
  }
}

const main_body = StyleSheet.create({
  container: {
    flex:10,
    backgroundColor:'#282626',
    flexDirection:'row'
  },
  ghost_image_wrapper: {
    alignItems:'center',
    flex:10,
    justifyContent: 'center',
    marginBottom:50,
  },
  ghost_image: {
    width:240,
    height:240
  },
  borderContainer: {
    flex:1
  },
  border: {
    height:705,
    width: 9,
    margin:5,

  },

  main_body: {
    flex:20
  },
})
