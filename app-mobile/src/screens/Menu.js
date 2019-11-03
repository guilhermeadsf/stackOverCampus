import React from 'react';
import { Text, View, FlatList, ActivityIndicator, Modal } from 'react-native';
import axios from 'axios';
import Theme from '../components/theme';
import Header from '../components/Header';
import commonStyles from '../../commonStyles.js';
import { connect } from 'react-redux';
import { userLogout } from '../redux/actions/userDataActions';

class App extends React.Component {
  state = {
    title: [],
    loading: true
  };

  async componentDidMount() {
    // await axios
    //   .get('https://stackovercampus.herokuapp.com/getThemes')
    //   .then(response => {
    //     this.setState({ title: response.data });
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    this.setState({ loading: false });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: commonStyles.backgroundColor }}>
        <Header title="Home" />
        <View style={{ flex: 9, marginTop: 20 }}>
          <FlatList
            data={this.props.themes} // Vai vim da API!
            renderItem={({ item }) => <Theme themeName={item.name} />}
            keyExtractor={item => item._id}
            numColumns={2}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userState: state.UserDataReducer.userState,
  themes: state.UserDataReducer.themes
});

const mapDispatchToProps = {
  userLogoutAction: userLogout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
