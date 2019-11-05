import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import Theme from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
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
        <Header title="Home" />
        <View style={{ flex: 9, marginTop: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 5
            }}
          >
            <TouchableOpacity
              style={{
                width: '30%',
                height: 40,
                backgroundColor: '#7f8c8d',
                marginRight: 5,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              disabled={true}
            >
              <Text
                style={{ color: '#FFF', fontSize: 12, fontFamily: 'Roboto' }}
              >
                Temas
              </Text>
            </TouchableOpacity>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#1abc9c', '#2980b9']}
              style={{
                width: '30%',
                borderRadius: 5
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text
                  style={{ color: '#FFF', fontSize: 12, fontFamily: 'Roboto' }}
                >
                  Trabalhos
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

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
