import React, { Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { addThemes } from '../redux/actions/userDataActions';
import imageData from '../../assets/imgs/data-collection.png';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { addThemesAction } = this.props;

    await axios
      .get('https://stackovercampus.herokuapp.com/getThemes')
      .then(response => {
        addThemesAction(response.data);
      })
      .catch(error => {
        console.log(error);
      });

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

const mapDispatchToProps = {
  addThemesAction: addThemes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);
