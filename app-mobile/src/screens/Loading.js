import React, { Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import imageData from '../../assets/imgs/data-collection.png';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Auth');
    }, 1500);
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['#1abc9c', '#2980b9']}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <StatusBar translucent light-content backgroundColor="transparent" />
        <Image source={imageData} />
      </LinearGradient>
    );
  }
}
