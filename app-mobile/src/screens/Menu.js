import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import Theme from '../components/theme';
import Header from '../components/Header';
import MenuOptions from '../components/MenuOptions';
import commonStyles from '../../commonStyles.js';
import { connect } from 'react-redux';
import { userLogout } from '../redux/actions/userDataActions';

class App extends React.Component {
  state = {
    title: []
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: commonStyles.backgroundColor }}>
        <Header title='Home' />
        <View style={{ flex: 9, marginTop: 20 }}>
          <MenuOptions temaStatus={0} trabalhoStatus={1} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
