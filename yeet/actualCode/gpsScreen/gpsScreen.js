import React, { Component } from 'react';
import {View, Image, StyleSheet, Text, Button, Modal} from 'react-native';
import Ben from '../mainScreen/bensucks.js'
import gameState from '../backend/GameState.js'

var ihatethis = [
   {
   "deviceID": "1393C686-5BAE-444A-B51C-0BFB93448DCE",
   "eatenPellets":'',
   "isPacman": false,
   "lat": 0,
   "lng": 0,
   "name": "Hi",
   "pellets": '',
 },
{
   "deviceID": "6461A10A-2BAF-4EAA-8ABA-4F7F8E67EB6C",
   "eatenPellets": 'Array []',
   "isPacman": false,
   "lat": 0,
   "lng": 0,
   "name": "H",
   "pellets":' Array []',
 },
]

export default class gpsScreen extends Component {
  state = {
    gpsVisible: false,
    color: '#C11A1A',
    team: 'a Ghost',
  };

  gameMode(isPacman) {
    if (isPacman == true) {
      this.setState({color:'#FCCF00'});
      this.setState({team:"PacMan"});
    }
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
        onRequestClose={() => {
          this.setModalVisible(true),
          this.setGpsVisible(true)}}
        >
      <View style={{flex:1, paddingTop:15, backgroundColor:this.state.color}}>
        <View style={{flex:1, backgroundColor:this.state.color, alignItems:'center', justifyContent:'center'}}>
          <Text style={{color:'white', fontSize:25}}>You are {this.state.team}</Text>
        </View>
        <View style={{flex:10}}>
          <Ben/>
        </View>

        <View style={{flex:1, backgroundColor:this.state.color}}>
        </View>
      </View>

      </Modal>
        <View style={main_header.buttonContainer}>
          <Button
             color='white'
             title="Start"
             onPress={() => {
               this.setGpsVisible(true);
               this.gameMode(gameState.isPacman)
             }}
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
    height:35,
    width: 150,
    paddingHorizontal:50,
    marginBottom:10

  }
})
