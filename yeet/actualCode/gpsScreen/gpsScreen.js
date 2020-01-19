import React, { Component } from 'react';
import {View, Image, StyleSheet, Button, Modal} from 'react-native';
import Ben from '../mainScreen/bensucks.js'


export default class gpsScreen extends Component {
  state = {
    gpsVisible: false,
  };

  setGpsVisible(visible) {
    this.setState({gpsVisible: visible});
  };
  render() {
    return (
      <View style={{backgroundColor:'#282626'}}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.gpsVisible}
        onRequestClose={() => {this.setGpsVisible(true)}}
        >
        <Ben/>

      </Modal>
        <View style={main_header.buttonContainer}>
          <Button
             color='white'
             title="Start"
             onPress={() => {this.setGpsVisible(true)}}
           />
        </View>
      </View>
    );
  }
}

const main_header = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#C11A1A',
    marginHorizontal: 100,
    borderRadius:5,
    paddingHorizontal:50,
    marginBottom:10

  }
})
