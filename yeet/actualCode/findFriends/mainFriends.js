import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Image, Button, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import gameState from '../backend/GameState.js';
import serverSocket from '../backend/ServerConnection.js';
import GPS from '../gpsScreen/gpsScreen.js';


export default class MainFriends extends Component {
  state = {
    text: '',
    isVisible: false,
    friend: '',
    data: serverSocket.users
  };

  setIsVisible(visible) {
    this.setState({ isVisible: visible });
  }

  refresh = () => {

    this.setState({ data: serverSocket.users })
    // if (this.state.data.length == 0) {
    //   console.log('first player')
    //   gameState.isPacman = true;
    // }  

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
              <TouchableOpacity style={{ position: 'absolute', right: 25, alignSelf: 'center' }} onPress={() => { this.refresh() }}>
                <Image
                  style={{ height: 30, width: 30 }}
                  source={require('../../images/refresh.png')} />
              </TouchableOpacity>
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
                  <View style={{ marginLeft: 40, marginRight: 40, marginTop: 5 }}>
                    <FlatList
                      data={this.state.data}
                      keyExtractor={item => item.name}
                      renderItem={({ item }) => (
                        <View style={{ margin: 15, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10 }} >
                          <Text style={{ fontSize: 20, color: 'black', paddingHorizontal: 12, paddingVertical: 8 }}>{item.name}</Text>

                        </View>
                      )}

                    />
                  </View>


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

    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#C11A1A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },

})
