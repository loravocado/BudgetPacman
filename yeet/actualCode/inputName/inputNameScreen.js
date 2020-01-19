import React, { Component } from 'react';
import {View, StyleSheet, Image, Button, Text, Modal, TextInput, TouchableHighlight} from 'react-native';

export default class InputNameScreen extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }



  constructor(props) {
  super(props);
  this.state = {text: ''};
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          >

          <View style={inputNameScreen.container}>
            <View style={inputNameScreen.borderContainer}>
              <Image
               style={inputNameScreen.border}
               source={require('../../images/border.png')}
              />
            </View>

            <View style={inputNameScreen.ghost_image_wrapper}>
              <Text style={inputNameScreen.text}>Input Name</Text>
              <Image
               style={inputNameScreen.ghost_image}
               source={require('../../images/red_ghost.png')}
              />
              <View style={inputNameScreen.inputContainer}>
                <TextInput
                   style={inputNameScreen.inputText}
                   placeholder="Your name"
                   onChangeText={(text) => this.setState({text})}
                   value={this.state.text}

                 />
               </View>
            </View>
            <View style={inputNameScreen.borderContainer}>
              <Image
               style={inputNameScreen.border}
               source={require('../../images/border.png')}
              />
            </View>



          </View>
        </Modal>
        <View style={inputNameScreen.buttonWrapper}>
          <Button
             color='white'
             title="Start Game"
             onPress={() => {this.setModalVisible(true)}}/>

        </View>
      </View>
    );
  }
}

const inputNameScreen = StyleSheet.create({
  buttonWrapper: {

    backgroundColor: '#C11A1A',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    marginHorizontal:100,
    marginBottom:60
  },
  borderContainer: {
    flex:1
  },
  border: {
    height:705,
    width: 9,
    margin:5,

  },
  ghost_image_wrapper: {
    alignItems:'center',
    flex:20,
    justifyContent: 'center',
    marginBottom:50,
  },
  ghost_image: {
    width:240,
    height:240
  },
  container: {
    flex:1,
    flexDirection:'row',
    backgroundColor:'#282626',
    alignItems:'center',
    justifyContent:'center',
  },
  text: {
    color: 'white',
    fontSize: 35
  },
  inputContainer: {
    margin:20,
    width: 200,
    height:35,
    borderRadius:5,
    backgroundColor:'white',
    justifyContent:'center'
  },
  inputText: {
    marginHorizontal:10,
    fontSize:20,
    color:'#282626',
  }
})
