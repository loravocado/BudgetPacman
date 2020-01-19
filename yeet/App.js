import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import MainHeader from './actualCode/mainScreen/header.js'
import MainBody from './actualCode/mainScreen/body.js'
import Ignore from './actualCode/mainScreen/bensucks.js'

export default function App() {
  return (
    <View style={styles.container}>
      <MainHeader/>
      <MainBody/>
      <Ignore/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282626',


  },
});
