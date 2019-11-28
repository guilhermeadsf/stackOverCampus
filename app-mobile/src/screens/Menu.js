import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Theme from '../components/ThemeButton';
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
      <View style={styles.containerStyle}>
        <Header title='Home' />
        <View style={styles.mainView}>
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

const styles = StyleSheet.create({
  containerStyle: { flex: 1, backgroundColor: commonStyles.backgroundColor },
  mainView: { flex: 9, marginTop: 20 }
});

const mapStateToProps = state => ({
  userState: state.UserDataReducer.userState,
  themes: state.UserDataReducer.themes
});

const mapDispatchToProps = {
  userLogoutAction: userLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
