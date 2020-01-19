import React, { Component } from 'react';
import {View, StyleSheet, Image, Button, Text, Modal, TextInput, TouchableHighlight} from 'react-native';

export default class MainFriends extends Component {
  state = {
    text: '',
    isVisible: false,
  };

  setIsVisible(visible) {
  this.setState({isVisible: visible});
  }

  render() {

    return (
      <View>
        <Modal
           animationType="slide"
           transparent={false}
           visible={this.state.isVisible}>
           <View style={{flex:1}}>
            <View style={friends.headerContainer}>
            </View>
            <View style={friends.container}>
            </View>
           </View>
         </Modal>

        <View style={friends.inputContainer}>
          <TextInput
             style={friends.inputText}
             placeholder="Your name"
             value={this.state.text}
             onChangeText={text => this.setState({ text })}
             onSubmitEditing = {() => {
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
  },
  borderContainer: {
    flex:1
  },
  border: {
    height:705,
    width: 9,
    margin:5,

  },
  container: {
    flex:10,
    backgroundColor:'#282626',
    alignItems:'center',
    justifyContent:'center',
  },
  headerContainer: {
    flex:1,
    backgroundColor:'#C11A1A',
    alignItems:'center',
    justifyContent:'center',
    paddingTop:10,
  },

})
