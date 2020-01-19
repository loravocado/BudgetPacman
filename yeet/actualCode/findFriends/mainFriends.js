import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, Text, Modal, TextInput, TouchableHighlight } from 'react-native';
import gameState from '../backend/GameState.js';
import GPS from '../gpsScreen/gpsScreen.js';
import serverSocket from '../backend/ServerConnection.js';

export default class MainFriends extends Component {
  state = {
    text: '',
    isVisible: false,
  };

  setIsVisible(visible) {
    this.setState({ isVisible: visible });
  }

  render() {

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isVisible}>
          <View style={{ flex: 1 }}>
            <View style={friends.headerContainer}>
              <Text style={friends.text}> Lobby </Text>
            </View>
            <View style={{ flex: 10, flexDirection: 'row', backgroundColor: '#282626' }}>
              <View style={friends.borderContainer}>
                <Image
                  style={friends.border}
                  source={require('../../images/border.png')}
                />
              </View>
              <View style={friends.container}>
                <View style={{ flex: 10 }}>
                  <Text>Hello</Text>
                </View>
                <GPS />
              </View>
              <View style={friends.borderContainer}>
                <Image
                  style={friends.border}
                  source={require('../../images/border.png')}
                />
              </View>
            </View>

          </View>
        </Modal>

        <View style={friends.inputContainer}>
          <TextInput
            style={friends.inputText}
            placeholder="Your name"
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
            onSubmitEditing={() => {
              gameState.name = this.state.text;
              serverSocket.register();
              this.setIsVisible(true);
            }}
          />
        </View>
      </View>
    )
  }
}

const friends = StyleSheet.create({
  inputContainer: {
    margin: 20,
    width: 200,
    height: 35,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  inputText: {
    marginHorizontal: 10,
    fontSize: 20,
    color: '#282626',
  },
  borderContainer: {
    flex: 1
  },
  border: {
    height: 705,
    width: 9,
    margin: 5,

  },
  text: {
    fontSize: 25,
    color: 'white'
  },
  container: {
    flex: 15,
    backgroundColor: '#282626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#C11A1A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },

})
