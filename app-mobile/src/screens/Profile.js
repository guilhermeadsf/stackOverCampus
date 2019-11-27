import React, { Component } from 'react';
import H from '../components/Header';
import commonStyles from '../../commonStyles.js';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView
} from 'react-native';

import { ListItem, Separator, Button } from 'native-base';
import { connect } from 'react-redux';

class screens extends Component {
  render() {
    const letra = this.props.username[0];
    return (
      <View style={{ flex: 1, backgroundColor: commonStyles.backgroundColor }}>
        <H typeHeader={1} title='Perfil' />
        <ScrollView>
          <View style={styles.cardsProfile}>
            <View style={styles.viewLogoName}>
              <Text style={styles.avatarName}>{letra}</Text>
            </View>
            <Text style={styles.namePersona}>{this.props.username}</Text>
          </View>

          <View style={styles.cardsProfile}>
            <Separator bordered style={styles.separatorHeaderStyle}>
              <Text style={styles.separatorItemStyle}>Curso</Text>
            </Separator>
            <ListItem style={styles.separatorListItemStyle}>
              <Text style={styles.textSeparatorStyle}>{this.props.course}</Text>
            </ListItem>
            <Separator bordered style={styles.separatorHeaderStyle}>
              <Text style={styles.separatorItemStyle}>E-mail</Text>
            </Separator>
            <ListItem style={styles.separatorListItemStyle}>
              <Text style={styles.textSeparatorStyle}>{this.props.email}</Text>
            </ListItem>
          </View>

          {/* <View style={styles.container}>
            <TouchableOpacity>
              <Text style={styles.text}>Esqueceu Sua Senha?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity>
              <Text style={styles.text}>Alterar Dados</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  avatarName: {
    fontFamily: 'Roboto',
    fontSize: 100,
    textAlign: 'center',
    color: '#ecf0f1'
  },

  viewLogoName: {
    backgroundColor: '#34495e',
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center'
  },

  namePersona: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: '#34495e',
    fontSize: 30,
    paddingVertical: 10
  },

  cardsProfile: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 10
  },

  namePersonaProfile: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: '#34495e',
    fontSize: 18,
    paddingVertical: 10
  },

  separatorHeaderStyle: {
    backgroundColor: '#34495e',
    borderRadius: 5
  },

  separatorItemStyle: {
    fontFamily: 'Roboto',
    color: '#ecf0f1'
  },

  separatorListItemStyle: {
    borderRadius: 10
  },

  textSeparatorStyle: {
    fontFamily: 'Roboto',
    color: '#34495e'
  },

  container: {
    alignItems: 'center',
    marginBottom: 18
  },

  text: {
    fontFamily: 'Roboto',
    color: '#34495e',
    fontSize: 18
  }
});

const mapStateToProps = state => ({
  username: state.UserDataReducer.username,
  course: state.UserDataReducer.course,
  email: state.UserDataReducer.email
});

export default connect(mapStateToProps, null)(screens);
