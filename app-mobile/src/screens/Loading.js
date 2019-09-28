import React, { Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import imageData from '../../assets/imgs/data-collection.png';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    setTimeout(() => {
      this.whyRouteGo();
    }, 2000);
  }

  whyRouteGo() {
    if (this.props.userState) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('Auth');
    }
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

const mapStateToProps = state => ({
  userState: state.UserDataReducer.userState
});

export default connect(
  mapStateToProps,
  null
)(Loading);
