import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Image, Button, Text, Modal, TextInput, TouchableHighlight } from 'react-native';
import gameState from '../backend/GameState.js';
import serverSocket from '../backend/ServerConnection.js';
import GPS from '../gpsScreen/gpsScreen.js';

var SampleArray = [{
    name: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    name: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    name: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  }];

export default class MainFriends extends Component {
  state = {
    text: '',
    isVisible: false,
    friend: '',
  };

  setIsVisible(visible) {
    this.setState({ isVisible: visible });
  }

  AddItemsToArray = () => {
    SampleArray = SampleArray.concat(this.state.friend)
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
                  <View style={{ marginLeft: 40, marginRight: 40, marginTop: 5 }}>
                    <FlatList
                      data={serverSocket.users} // Dictionary with deviceID as key and gameState as value.
                      keyExtractor={item => item.value.name}
                      renderItem={({ item }) => (
                        <View style={{ margin: 15, alignItems: 'flex-start' }} >
                          <Text style={{ fontSize: 20, paddingBottom: 15, color: 'white' }}>{item}</Text>
                          <View
                            style={{

                            }}
                          />
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
    flex: 1,
    backgroundColor: '#C11A1A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },

})
