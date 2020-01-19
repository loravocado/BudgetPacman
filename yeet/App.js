import React from 'react';
import { StyleSheet, Text, View, Image, Modal} from 'react-native';
import MainHeader from './actualCode/mainScreen/header.js'
import MainBody from './actualCode/mainScreen/body.js'

export default function App() {
  return (
    <View style={styles.container}>
      <MainHeader/>
      <MainBody/>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282626',
  },
});
